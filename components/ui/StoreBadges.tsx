"use client";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.05 12.54c-.02-2.06 1.68-3.05 1.76-3.1-0.96-1.4-2.46-1.6-2.99-1.62-1.27-.13-2.48.75-3.13.75-.64 0-1.64-.73-2.7-.71-1.39.02-2.67.81-3.39 2.05-1.44 2.5-.37 6.2 1.04 8.23.69.99 1.51 2.1 2.58 2.06 1.04-.04 1.43-.67 2.69-.67 1.25 0 1.61.67 2.7.65 1.12-.02 1.83-1.01 2.51-2.01.79-1.15 1.12-2.27 1.14-2.33-.03-.01-2.18-.84-2.2-3.32zM15.1 6.32c.57-.69.95-1.65.85-2.6-.82.03-1.81.54-2.39 1.23-.52.61-.98 1.58-.86 2.51.91.07 1.84-.46 2.4-1.14z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3.6 2.3c-.3.3-.5.7-.5 1.3v16.8c0 .6.2 1 .5 1.3l.1.1L13 12.1v-.2L3.7 2.2l-.1.1z" fill="#00D3FF" />
      <path d="M16.3 15.3 13 12.1v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.1z" fill="#FFCE00" />
      <path d="M16.4 15.2 13 11.9 3.6 21.7c.4.4 1 .4 1.7.1l11.1-6.6z" fill="#FF3D00" />
      <path d="M16.4 8.7 5.3 2.2c-.7-.4-1.3-.3-1.7.1L13 11.9l3.4-3.2z" fill="#00F076" />
    </svg>
  );
}

export default function StoreBadges({
  appStore = "#",
  googlePlay = "#",
  className,
}: {
  appStore?: string;
  googlePlay?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className ?? ""}`}>
      <a
        href={appStore}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        aria-label="Download on the App Store"
        className="flex items-center gap-3 rounded-2xl bg-black px-5 py-3 text-white shadow-lg transition-transform hover:scale-105"
      >
        <AppleIcon className="size-7" />
        <span className="text-left leading-none">
          <span className="block text-[10px] uppercase tracking-wide text-white/70">Download on the</span>
          <span className="font-texas text-lg font-bold">App Store</span>
        </span>
      </a>
      <a
        href={googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        aria-label="Get it on Google Play"
        className="flex items-center gap-3 rounded-2xl bg-black px-5 py-3 text-white shadow-lg transition-transform hover:scale-105"
      >
        <PlayIcon className="size-7" />
        <span className="text-left leading-none">
          <span className="block text-[10px] uppercase tracking-wide text-white/70">Get it on</span>
          <span className="font-texas text-lg font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
