"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getHeroFlowRoutes,
  getHeroMapCountries,
  getHeroMapTransportModes,
} from "@/content/i18n/hero-map";
import type { HeroFlowRoute, HeroMapCountry } from "@/content/hero-map";
import { useTranslation } from "@/i18n/LocaleProvider";
import { heroCountryGeometries } from "@/lib/hero-country-geometries";
import { buildRoutePath, MAP_VIEW_BOX, projectLngLat } from "@/lib/geo";
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

function useInteractiveDesktop() {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (min-width: 640px)");
    const update = () => setInteractive(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return interactive;
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
  hoveredCountryId: string | null,
): boolean {
  if (!hoveredCountryId) return false;
  if (hoveredCountryId === "CN") return route.from === "CN";
  return route.to === hoveredCountryId;
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
      className="hero-flow-tooltip pointer-events-none absolute z-20 max-w-[220px] rounded-lg border border-white/10 bg-navy/95 px-3 py-2.5 text-xs text-gray-200 shadow-xl backdrop-blur-md"
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
}: {
  card: CountryCardState;
  reducedMotion: boolean;
}) {
  const { country } = card;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="hero-country-stats-card pointer-events-none absolute z-20 rounded-xl border border-white/10 bg-navy/95 p-4 shadow-xl backdrop-blur-md"
      style={{ left: card.x, top: card.y }}
      role="tooltip"
      aria-label={`${country.name}: ${country.role}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <p className="text-sm font-bold text-white">{country.name}</p>
        <span className="rounded-full border border-accent-light/25 bg-accent-light/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-light">
          {country.role}
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
  const strokeColor = isRail ? "#4ade80" : "#dbaa47";
  const opacity = isHighlighted ? 0.95 : isDimmed ? 0.12 : 0.5;
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
        <circle r={isHighlighted ? 2.5 : 2} fill={strokeColor} opacity={isHighlighted ? 0.95 : 0.75}>
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
  interactive,
  isHovered,
  onHover,
  onLeave,
}: {
  country: HeroMapCountry;
  paths: string[];
  interactive: boolean;
  isHovered: boolean;
  onHover: (event: React.MouseEvent<SVGPathElement>, country: HeroMapCountry) => void;
  onLeave: () => void;
}) {
  if (paths.length === 0) return null;

  return (
    <g className="hero-flow-country">
      {paths.map((d, index) => (
        <path
          key={`${country.id}-${index}`}
          d={d}
          fill={isHovered ? "rgba(219, 170, 71, 0.1)" : "rgba(255, 255, 255, 0.001)"}
          stroke={isHovered ? "rgba(219, 170, 71, 0.4)" : "transparent"}
          strokeWidth={isHovered ? 1.25 : 0}
          className={cn(
            "transition-all duration-200",
            interactive && "pointer-events-auto cursor-pointer",
          )}
          onMouseEnter={(e) => onHover(e, country)}
          onMouseLeave={onLeave}
        />
      ))}
    </g>
  );
}

function CountryHub({
  country,
  isHovered,
}: {
  country: HeroMapCountry;
  isHovered: boolean;
}) {
  const [cx, cy] = useMemo(
    () => projectLngLat(country.lng, country.lat),
    [country.lng, country.lat],
  );

  return (
    <g className="hero-flow-hub pointer-events-none" aria-hidden>
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 5 : 3.5}
        fill={isHovered ? "#dbaa47" : "#c8922a"}
        opacity={isHovered ? 0.95 : 0.7}
        className="transition-all duration-200"
      />
      {isHovered ? (
        <circle
          cx={cx}
          cy={cy}
          r={10}
          fill="none"
          stroke="#c8922a"
          strokeWidth={1}
          opacity={0.5}
        />
      ) : null}
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
  const interactive = useInteractiveDesktop();
  const { prefersReducedMotion } = useMotionConfig();
  const [routeTooltip, setRouteTooltip] = useState<RouteTooltipState | null>(null);
  const [countryCard, setCountryCard] = useState<CountryCardState | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const routes = useMemo(() => getHeroFlowRoutes(messages), [messages]);

  const clearCountryHover = useCallback(() => {
    setCountryCard(null);
    setHoveredCountry(null);
  }, []);

  const getContainerRect = useCallback((event: React.MouseEvent<Element>) => {
    const container = event.currentTarget.closest(".hero-flow-map-canvas");
    return container?.getBoundingClientRect() ?? null;
  }, []);

  const showRouteTooltip = useCallback(
    (event: React.MouseEvent<SVGPathElement>, route: HeroFlowRoute) => {
      if (!interactive) return;
      const containerRect = getContainerRect(event);
      if (!containerRect) return;

      clearCountryHover();

      const modeLabel =
        route.mode === "rail" ? transportModes.rail : transportModes.air;
      setRouteTooltip({
        x: event.clientX - containerRect.left + 12,
        y: event.clientY - containerRect.top - 8,
        title: route.label,
        lines: [route.volumeLabel, `${modeLabel} · ${route.transitDays}`],
      });
    },
    [interactive, getContainerRect, clearCountryHover, transportModes],
  );

  const showCountryCard = useCallback(
    (event: React.MouseEvent<SVGPathElement>, country: HeroMapCountry) => {
      if (!interactive) return;
      const containerRect = getContainerRect(event);
      if (!containerRect) return;

      setRouteTooltip(null);
      setHoveredCountry(country.id);

      const rawX = event.clientX - containerRect.left + CARD_OFFSET_X;
      const rawY = event.clientY - containerRect.top + CARD_OFFSET_Y;
      const { x, y } = clampCardPosition(
        rawX,
        rawY,
        containerRect.width,
        containerRect.height,
      );

      setCountryCard({ x, y, country });
    },
    [interactive, getContainerRect],
  );

  const countryHighlightActive = hoveredCountry !== null && countryCard !== null;

  return (
    <div
      className={cn(
        "hero-flow-overlay pointer-events-none absolute inset-0 flex items-center justify-center",
        interactive && "sm:pointer-events-auto",
        className,
      )}
      aria-hidden={!interactive}
    >
      <div className="hero-flow-map-canvas relative aspect-[1911/778] w-full max-h-full">
        <svg
          viewBox={MAP_VIEW_BOX}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <g className="hero-flow-routes">
            {routes.map((route) => {
              const highlighted = countryHighlightActive
                && isRouteHighlighted(route, hoveredCountry);
              const dimmed = countryHighlightActive && !highlighted;

              return (
                <RoutePaths
                  key={route.id}
                  route={route}
                  pathId={`${uid}-${route.id}`}
                  interactive={interactive}
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
            {heroCountryGeometries.map(({ country, paths }) => (
              <CountryOutlineHitArea
                key={country.id}
                country={country}
                paths={paths}
                interactive={interactive}
                isHovered={hoveredCountry === country.id}
                onHover={showCountryCard}
                onLeave={clearCountryHover}
              />
            ))}
          </g>

          <g className="hero-flow-hubs">
            {heroMapCountries.map((country) => (
              <CountryHub
                key={country.id}
                country={country}
                isHovered={hoveredCountry === country.id}
              />
            ))}
          </g>
        </svg>

        <AnimatePresence mode="wait">
          {interactive && routeTooltip ? (
            <HeroRouteTooltip
              key="route-tooltip"
              tooltip={routeTooltip}
              reducedMotion={prefersReducedMotion}
            />
          ) : null}
          {interactive && countryCard ? (
            <HeroCountryStatsCard
              key={`country-${countryCard.country.id}`}
              card={countryCard}
              reducedMotion={prefersReducedMotion}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
