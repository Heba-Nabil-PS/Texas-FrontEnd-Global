import { cn } from "@/lib/utils";

interface LoadingProps {
  /** Diameter of the spinner in pixels. Defaults to 80. */
  size?: number;
  /** Border thickness in pixels. Defaults to a value scaled from `size`. */
  thickness?: number;
  /** Accessible label announced to screen readers. */
  label?: string;
  /** Extra classes for the wrapper. */
  className?: string;
}

export const LoadingAnimate = (props: LoadingProps) => {
  const { size = 80, thickness, label = "Loading…", className } = props;

  const borderWidth = thickness ?? Math.max(2, Math.round(size / 20));

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-white/70 backdrop-blur-sm">
      <span
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={cn("inline-flex items-center justify-center", className)}
      >
        <span
          aria-hidden="true"
          style={{ width: size, height: size, borderWidth }}
          className="block animate-spin rounded-full border-solid border-gray-200 border-t-primary"
        />
        <span className="sr-only">{label}</span>
      </span>
    </div>
  );
};
