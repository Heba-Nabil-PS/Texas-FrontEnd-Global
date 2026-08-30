"use client";

import Lightbox, {
  isImageFitCover,
  isImageSlide,
  RenderSlideProps,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Counter from "yet-another-react-lightbox/plugins/counter";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { NextImage } from "./next-image";
import { StaticImageData } from "next/image";

interface Slide {
  src: string;
  width?: number;
  height?: number;
}

const CustomLightBox = (props: any) => {
  const { open, handleClose, slides } = props;

  return (
    <Lightbox
      open={open}
      close={handleClose}
      slides={slides}
      render={{ slide: NextJsImage }}
      plugins={[Download]}
      styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.8)" } }}
    />
  );
};

export default CustomLightBox;

function isNextJsImage(slide: Slide): slide is StaticImageData {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

function NextJsImage({ slide, offset, rect }: RenderSlideProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  if (!slide.width || !slide.height) {
    // Fallback dimensions if not provided
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <NextImage
          fill
          alt=""
          src={slide}
          loading="eager"
          draggable={false}
          style={{
            objectFit: cover ? "cover" : "contain",
          }}
          sizes="100vw"
          // onClick={offset === 0 ? click : undefined}
        />
      </div>
    );
  }

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width!),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width!) * slide.height!),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <NextImage
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
