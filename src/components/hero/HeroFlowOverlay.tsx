"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getHeroFlowRoutes,
  getHeroMapBadgeLabel,
  getHeroMapCountries,
  getHeroMapInstructions,
  getHeroMapTransportModes,
} from "@/content/i18n/hero-map";
import {
  getMapLocationTypeColors,
  type HeroFlowRoute,
  type HeroMapCountry,
} from "@/content/hero-map";
import { useTranslation } from "@/i18n/LocaleProvider";
import { heroCountryGeometries } from "@/lib/hero-country-geometries";
import {
  buildRoutePath,
  MAP_ASPECT_RATIO,
  MAP_VIEW_BOX,
  projectLngLat,
} from "@/lib/geo";
import { useMotionConfig } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FLOW_STROKE_WIDTH = 1.25;
const FLOW_HIT_WIDTH = 12;
const CARD_WIDTH = 280;
const CARD_HEIGHT_ESTIMATE = 240;
const CARD_OFFSET_X = 16;
const CARD_OFFSET_Y = -12;

type RouteTooltipState = {
  x: number;
  y: number;
  title: string;
  lines: string[];
};

type CountryCardState = {
  x: number;
  y: number;
  country: HeroMapCountry;
};

function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return canHover;
}

function clampCardPosition(
  x: number,
  y: number,
  containerWidth: number,
  containerHeight: number,
): { x: number; y: number } {
  const padding = 8;
  const clampedX = Math.min(
    Math.max(padding, x),
    containerWidth - CARD_WIDTH - padding,
  );
  const clampedY = Math.min(
    Math.max(padding, y),
    containerHeight - CARD_HEIGHT_ESTIMATE - padding,
  );
  return { x: clampedX, y: clampedY };
}

function isRouteHighlighted(
  route: HeroFlowRoute,
  activeCountryId: string | null,
): boolean {
  if (!activeCountryId) return false;
  if (activeCountryId === "CN") return route.from === "CN";
  return route.to === activeCountryId;
}

function HeroRouteTooltip({
  tooltip,
  reducedMotion,
}: {
  tooltip: RouteTooltipState;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="hero-flow-tooltip pointer-events-none absolute z-20 max-w-[220px] rounded-lg border border-border bg-popover/95 px-3 py-2.5 text-xs text-popover-foreground shadow-xl backdrop-blur-md"
      style={{ left: tooltip.x, top: tooltip.y }}
      role="tooltip"
      aria-label={`${tooltip.title}: ${tooltip.lines.join(", ")}`}
    >
      <p className="font-semibold text-accent-light">{tooltip.title}</p>
      <ul className="mt-1.5 space-y-1 text-gray-300/90">
        {tooltip.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </motion.div>
  );
}

function HeroCountryStatsCard({
  card,
  reducedMotion,
  badgeLabel,
}: {
  card: CountryCardState;
  reducedMotion: boolean;
  badgeLabel: string;
}) {
  const { country } = card;
  const colors = getMapLocationTypeColors(country.type);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="hero-country-stats-card pointer-events-none absolute z-20 rounded-xl border border-border bg-popover/95 p-4 text-popover-foreground shadow-xl backdrop-blur-md"
      style={{ left: card.x, top: card.y }}
      role="tooltip"
      aria-label={`${country.name}: ${country.role}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <p className="text-sm font-bold text-white">{country.name}</p>
        <span
          className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{
            color: colors.badge,
            borderColor: `${colors.badge}40`,
            backgroundColor: `${colors.badge}18`,
          }}
        >
          {badgeLabel}
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-white/60">
        {country.description}
      </p>

      <div className="my-3 h-px bg-white/10" aria-hidden />

      <dl className="space-y-2">
        {country.metrics.map((metric) => (
          <div key={metric.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-[11px] text-white/50">{metric.label}</dt>
            <dd className="text-xs font-semibold text-white/90">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 h-px bg-white/10" aria-hidden />

      <p className="mt-2.5 text-[10px] leading-relaxed text-white/45">
        {country.hubs.join(" · ")}
      </p>
    </motion.div>
  );
}

function RoutePaths({
  route,
  pathId,
  interactive,
  reducedMotion,
  isHighlighted,
  isDimmed,
  onRouteHover,
  onRouteLeave,
}: {
  route: HeroFlowRoute;
  pathId: string;
  interactive: boolean;
  reducedMotion: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  onRouteHover: (
    event: React.MouseEvent<SVGPathElement>,
    route: HeroFlowRoute,
  ) => void;
  onRouteLeave: () => void;
}) {
  const d = buildRoutePath(route.waypoints);
  const isRail = route.mode === "rail";
  const duration = isRail ? 10 : 6;
  const strokeColor = isRail ? "var(--map-client)" : "var(--map-operations)";
  const opacity = isHighlighted ? 0.95 : isDimmed ? 0.1 : 0.45;
  const strokeWidth = isHighlighted ? 2 : FLOW_STROKE_WIDTH;

  return (
    <g className="hero-flow-route">
      <path
        id={pathId}
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 6"
        opacity={opacity}
        className={cn(
          "hero-flow-band transition-opacity duration-200",
          isRail && "hero-flow-band-rail",
          isHighlighted && "hero-flow-route-active",
        )}
      />
      {interactive ? (
        <path
          d={d}
          fill="none"
          stroke="transparent"
          strokeWidth={FLOW_HIT_WIDTH}
          className="pointer-events-auto cursor-pointer"
          onMouseEnter={(e) => onRouteHover(e, route)}
          onMouseLeave={onRouteLeave}
        />
      ) : null}
      {!reducedMotion ? (
        <circle r={isHighlighted ? 2.5 : 2} fill={strokeColor} opacity={isHighlighted ? 0.95 : 0.7}>
          <animateMotion
            dur={`${duration}s`}
            repeatCount="indefinite"
            path={d}
            rotate="auto"
          />
        </circle>
      ) : null}
    </g>
  );
}

function CountryOutlineHitArea({
  country,
  paths,
  isActive,
  onActivate,
  onDeactivate,
}: {
  country: HeroMapCountry;
  paths: string[];
  isActive: boolean;
  onActivate: (
    event: React.MouseEvent<SVGPathElement> | React.FocusEvent<SVGPathElement>,
    country: HeroMapCountry,
  ) => void;
  onDeactivate: () => void;
}) {
  const colors = getMapLocationTypeColors(country.type);

  if (paths.length === 0) return null;

  return (
    <g className="hero-flow-country">
      {paths.map((d, index) => (
        <path
          key={`${country.id}-${index}`}
          d={d}
          tabIndex={0}
          role="button"
          aria-label={country.name}
          fill={isActive ? colors.fillHover : colors.fill}
          stroke={isActive ? colors.strokeHover : colors.stroke}
          strokeWidth={isActive ? 1.5 : 1}
          className={cn(
            "pointer-events-auto cursor-pointer transition-all duration-200 outline-none focus-visible:stroke-[2px]",
            isActive && "hero-flow-country-active",
          )}
          style={
            {
              "--country-stroke-focus": colors.strokeHover,
            } as React.CSSProperties
          }
          onMouseEnter={(e) => onActivate(e, country)}
          onMouseLeave={onDeactivate}
          onFocus={(e) => onActivate(e, country)}
          onBlur={onDeactivate}
          onClick={(e) => onActivate(e, country)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onActivate(e as unknown as React.FocusEvent<SVGPathElement>, country);
            }
          }}
        />
      ))}
    </g>
  );
}

function CountryHub({
  country,
  isActive,
}: {
  country: HeroMapCountry;
  isActive: boolean;
}) {
  const colors = getMapLocationTypeColors(country.type);
  const [cx, cy] = useMemo(
    () => projectLngLat(country.lng, country.lat),
    [country.lng, country.lat],
  );

  return (
    <g className="hero-flow-hub pointer-events-none" aria-hidden>
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 12 : 9}
        fill="none"
        stroke={colors.marker}
        strokeWidth={1}
        opacity={isActive ? 0.55 : 0.28}
        className={cn(!isActive && "hero-map-marker-pulse")}
      />
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 5 : 3.5}
        fill={colors.marker}
        opacity={isActive ? 1 : 0.82}
        className="transition-all duration-200"
      />
    </g>
  );
}

export function HeroFlowOverlay({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const { messages } = useTranslation();
  const heroMapCountries = useMemo(
    () => getHeroMapCountries(messages),
    [messages],
  );
  const transportModes = useMemo(
    () => getHeroMapTransportModes(messages),
    [messages],
  );
  const instructions = useMemo(
    () => getHeroMapInstructions(messages),
    [messages],
  );
  const canHover = useCanHover();
  const { prefersReducedMotion } = useMotionConfig();
  const [routeTooltip, setRouteTooltip] = useState<RouteTooltipState | null>(null);
  const [countryCard, setCountryCard] = useState<CountryCardState | null>(null);
  const [activeCountryId, setActiveCountryId] = useState<string | null>(null);
  const [tappedCountryId, setTappedCountryId] = useState<string | null>(null);

  const routes = useMemo(() => getHeroFlowRoutes(messages), [messages]);
  const countryById = useMemo(
    () => new Map(heroMapCountries.map((c) => [c.id, c])),
    [heroMapCountries],
  );

  const effectiveActiveId = activeCountryId ?? tappedCountryId;

  const clearCountryState = useCallback(() => {
    setCountryCard(null);
    setActiveCountryId(null);
    if (canHover) {
      setTappedCountryId(null);
    }
  }, [canHover]);

  const getContainerRect = useCallback((event: { currentTarget: Element }) => {
    const container = event.currentTarget.closest(".hero-flow-map-canvas");
    return container?.getBoundingClientRect() ?? null;
  }, []);

  const showRouteTooltip = useCallback(
    (event: React.MouseEvent<SVGPathElement>, route: HeroFlowRoute) => {
      const containerRect = getContainerRect(event);
      if (!containerRect) return;

      clearCountryState();

      const modeLabel =
        route.mode === "rail" ? transportModes.rail : transportModes.air;
      setRouteTooltip({
        x: event.clientX - containerRect.left + 12,
        y: event.clientY - containerRect.top - 8,
        title: route.label,
        lines: [route.volumeLabel, `${modeLabel} · ${route.transitDays}`],
      });
    },
    [getContainerRect, clearCountryState, transportModes],
  );

  const showCountryCard = useCallback(
    (
      event:
        | React.MouseEvent<SVGPathElement>
        | React.FocusEvent<SVGPathElement>,
      country: HeroMapCountry,
    ) => {
      const containerRect = getContainerRect(event);
      if (!containerRect) return;

      if (!canHover) {
        if (tappedCountryId === country.id) {
          setTappedCountryId(null);
          setCountryCard(null);
          return;
        }
        setTappedCountryId(country.id);
      }

      setRouteTooltip(null);
      setActiveCountryId(country.id);

      const clientX =
        "clientX" in event ? event.clientX : containerRect.left + containerRect.width / 2;
      const clientY =
        "clientY" in event ? event.clientY : containerRect.top + containerRect.height / 2;

      const rawX = clientX - containerRect.left + CARD_OFFSET_X;
      const rawY = clientY - containerRect.top + CARD_OFFSET_Y;
      const { x, y } = clampCardPosition(
        rawX,
        rawY,
        containerRect.width,
        containerRect.height,
      );

      setCountryCard({ x, y, country });
    },
    [getContainerRect, canHover, tappedCountryId],
  );

  const countryHighlightActive = effectiveActiveId !== null && countryCard !== null;

  return (
    <div
      className={cn("hero-flow-overlay relative flex h-full w-full flex-col", className)}
      aria-label={instructions.hover || instructions.tap}
    >
      <p className="hero-map-instruction pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 text-center text-[11px] text-white/45 sm:text-xs">
        {canHover ? instructions.hover : instructions.tap}
      </p>

      <div
        className="hero-flow-map-canvas relative mx-auto mt-6 w-full max-w-6xl flex-1"
        style={{ aspectRatio: MAP_ASPECT_RATIO }}
      >
        <div className="hero-map-outline absolute inset-0" aria-hidden />

        <svg
          viewBox={MAP_VIEW_BOX}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-hidden
        >
          <g className="hero-flow-routes">
            {routes.map((route) => {
              const highlighted =
                countryHighlightActive && isRouteHighlighted(route, effectiveActiveId);
              const dimmed = countryHighlightActive && !highlighted;

              return (
                <RoutePaths
                  key={route.id}
                  route={route}
                  pathId={`${uid}-${route.id}`}
                  interactive
                  reducedMotion={prefersReducedMotion}
                  isHighlighted={highlighted}
                  isDimmed={dimmed}
                  onRouteHover={showRouteTooltip}
                  onRouteLeave={() => setRouteTooltip(null)}
                />
              );
            })}
          </g>

          <g className="hero-flow-countries">
            {heroCountryGeometries.map(({ country: geo, paths }) => {
              const country = countryById.get(geo.id);
              if (!country) return null;

              return (
                <CountryOutlineHitArea
                  key={country.id}
                  country={country}
                  paths={paths}
                  isActive={effectiveActiveId === country.id}
                  onActivate={showCountryCard}
                  onDeactivate={() => {
                    if (canHover) clearCountryState();
                  }}
                />
              );
            })}
          </g>

          <g className="hero-flow-hubs">
            {heroMapCountries.map((country) => (
              <CountryHub
                key={country.id}
                country={country}
                isActive={effectiveActiveId === country.id}
              />
            ))}
          </g>
        </svg>

        <AnimatePresence mode="wait">
          {routeTooltip ? (
            <HeroRouteTooltip
              key="route-tooltip"
              tooltip={routeTooltip}
              reducedMotion={prefersReducedMotion}
            />
          ) : null}
          {countryCard ? (
            <HeroCountryStatsCard
              key={`country-${countryCard.country.id}`}
              card={countryCard}
              reducedMotion={prefersReducedMotion}
              badgeLabel={getHeroMapBadgeLabel(messages, countryCard.country.type)}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
