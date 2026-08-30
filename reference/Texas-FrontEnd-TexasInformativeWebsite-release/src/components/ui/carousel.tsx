"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
// type Axis = "x" | "y";
type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  carouselType?: string;
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      carouselType,
      ...props
    },
    ref,
  ) => {
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
    const tweenNodes = React.useRef<HTMLElement[]>([]);
    // const [forceWheelAxis, setForceWheelAxis] = React.useState<
    //   Axis | undefined
    // >("y");
    // const [target, setTarget] = React.useState<Element | undefined>();
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      // [
      //   WheelGesturesPlugin({
      //     forceWheelAxis,
      //     target,
      //   }),
      // ]
    );

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }
      setSelectedIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);
    const setTweenNodes = React.useCallback((api: CarouselApi): void => {
      tweenNodes.current = api!
        .slideNodes()
        .map((slideNode) => slideNode as HTMLElement);
    }, []);

    // const tweenScale = React.useCallback(() => {
    //   const isMobileView = () => window.innerWidth <= 1024;
    //   if (!api) return;
    //   const activeIndex = api.selectedScrollSnap() + 1;
    //   tweenNodes.current.forEach((node, index) => {
    //     const scale = index === activeIndex ? 1 : 0.8;
    //     const y = index === activeIndex ? -40 : 20;
    //     if (!isMobileView()) {
    //       node.style.transition = "transform 0.3s";
    //       node.style.transform = `translateY(${y}px) scale(${scale})`;
    //     }
    //   });
    // }, [api]);

    const onInit = React.useCallback((api: CarouselApi) => {
      const scrollSnaps = api?.scrollSnapList() ?? [];
      setScrollSnaps(scrollSnaps);
    }, []);
    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);
    const scrollTo = React.useCallback(
      (index: number) => api && api.scrollTo(index),
      [api],
    );
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onInit(api);
      onSelect(api);
      api.on("reInit", onInit);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onInit, onSelect]);
    React.useEffect(() => {
      if (!api) return;
      setApi?.(api);
      if (carouselType !== "normal") {
        setTweenNodes(api);
        // tweenScale();
        // api.on("scroll", tweenScale).on("reInit", () => {
        //   setTweenNodes(api);
        //   tweenScale();
        // });
      }
    }, [api, setApi, setTweenNodes, carouselType]);
    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          selectedIndex,
          scrollSnaps,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

type CarouselPreviousProps = {
  className?: string;
  variant?: string;
  size?: string;
  prevIcon?: React.ReactNode;
  iconClassName?: string;
  iconColor?: string;
} & React.HTMLAttributes<HTMLButtonElement> &
  React.ComponentProps<typeof Button>;
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselPreviousProps
>(
  (
    {
      className,
      variant = "default",
      size = "icon",
      iconClassName,
      iconColor = "#1E373C",
      ...props
    },
    ref,
  ) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute size-10 rounded-full border border-black bg-transparent p-1 opacity-100 hover:bg-transparent",
          // canScrollPrev ? "visible" : "invisible",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <svg
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 492.004 492.004"
          className="size-6 rotate-180 rtl:-scale-x-100"
        >
          <g>
            <path
              d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
              fill={iconColor}
              opacity="1"
            ></path>
          </g>
        </svg>

        {/* <MoveLeft className={cn("size-6  text-secondary", iconClassName)} /> */}
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";
type CarouselNextProps = {
  className?: string;
  variant?: string;
  size?: string;
  iconClassName?: string;
  iconColor?: string;
} & React.HTMLAttributes<HTMLButtonElement> &
  React.ComponentProps<typeof Button>;
const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  (
    {
      className,
      variant = "default",
      size = "icon",
      iconClassName,
      iconColor = "#1E373C",
      ...props
    },
    ref,
  ) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute size-10 rounded-full border border-black bg-transparent p-1 opacity-100 hover:bg-transparent",
          // canScrollNext ? "visible" : "invisible",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <svg
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 492.004 492.004"
          className="size-6 rtl:-scale-x-100"
        >
          <g>
            <path
              d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
              fill={iconColor}
              opacity="1"
            ></path>
          </g>
        </svg>
        {/* <MoveRight className={cn("size-6  text-secondary", iconClassName)} /> */}
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);

CarouselNext.displayName = "CarouselNext";
const CarouselDots = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { scrollTo, selectedIndex, scrollSnaps } = useCarousel();

  return (
    <div className="embla__dots min-w-[215px] max-md:!hidden">
      {scrollSnaps.map((_, index) => (
        <button
          ref={ref}
          type="button"
          key={index}
          onClick={() => scrollTo(index)}
          className={cn(
            "mx-1 h-2 w-4 rounded-full",
            index === selectedIndex
              ? "z-10 rounded-full bg-red-600"
              : "bg-white bg-opacity-20",
            className,
          )}
          {...props}
        ></button>
      ))}
    </div>
  );
});

CarouselDots.displayName = "CarouselDots";
export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};
