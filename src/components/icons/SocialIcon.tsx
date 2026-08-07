export type SocialNetwork = "whatsapp" | "instagram" | "facebook";

export function SocialIcon({ network, className = "h-5 w-5" }: { network: SocialNetwork; className?: string }) {
  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.45" cy="6.65" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (network === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M13.7 21v-7.7h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.6-1.5h1.6V4.2c-.3 0-1.2-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.1H7.7v3h2.7V21h3.3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z" />
      <path d="M8.3 7.7c.2-.4.5-.4.8-.4h.4c.2 0 .4 0 .5.4l.8 1.9c.1.3.1.5-.1.7l-.7.8c-.2.2-.1.4 0 .6.8 1.4 1.9 2.5 3.3 3.2.3.2.5.1.7-.1l.9-1.1c.2-.3.5-.3.8-.2l1.9.9c.3.1.5.3.5.6 0 .3-.2 1.5-1 2.1-.7.6-1.6.9-2.7.6-1.1-.3-2.8-1-4.6-2.6-1.5-1.4-2.5-3-2.8-4.2-.3-1.1 0-2.4.4-3.2Z" />
    </svg>
  );
}
