import { LightGalleryProps, ListingImageProps } from "@/app/_types/Index";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgShare from "lightgallery/plugins/share";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SliderWithLightGallery = ({
  images,
}: {
  images: ListingImageProps[];
}) => {
  const lightGallery = useRef<LightGalleryProps | null>(null);

  const onSliderClick = (index: number) => {
    lightGallery.current?.el?.children[index]?.click();
  };

  const onInit = ({ instance }: any) => {
    if (instance && !lightGallery?.current) {
      lightGallery.current = instance;
    }
  };

  const settings = {
    licenseKey: "9E5E41A5-8BAA-4533-B9D6-F1CB5BD75C93",
    speed: 500,
    plugins: [lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgShare],
  };

  return (
    <div className="container">
      <Swiper
        className="swiper-container"
        slidesPerView={2}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} onClick={() => onSliderClick(index)}>
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + image.path}
              alt={`listing-image-${image.id}`}
              width={300}
              height={300}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Lightgallery is behind the scene */}
      <div style={{ display: "none" }}>
        <LightGallery {...settings} onInit={onInit}>
          {images.map((image, index) => (
            <a key={index} href={process.env.NEXT_PUBLIC_API_URL + image.path}>
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + image.path}
                alt={`listing-image-${image.id}`}
                width={300}
                height={300}
              />
            </a>
          ))}
        </LightGallery>
      </div>
    </div>
  );
};

export default SliderWithLightGallery;
