import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get Direction
export const getDirection = (
  ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
  obj: HTMLElement
) => {
  const { width: w, height: h, left, top } = obj.getBoundingClientRect();
  const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
  const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  return d;
};

// Handle Mouse Enter Event
export const handleMouseEnter = ({
  event,
  ref,
  setDirection,
}: {
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  ref: any;
  setDirection: (item: string) => void | undefined;
}) => {
  if (!ref.current) return;

  const directionElement = getDirection(event, ref.current);
  switch (directionElement) {
    case 0:
      setDirection("top");
      break;
    case 1:
      setDirection("right");
      break;
    case 2:
      setDirection("bottom");
      break;
    case 3:
      setDirection("left");
      break;
    default:
      setDirection("left");
      break;
  }

  return directionElement;
};
