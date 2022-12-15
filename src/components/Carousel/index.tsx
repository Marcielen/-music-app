import { useMediaQuery } from "@chakra-ui/react";
import { Swiper, SwiperProps } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Carousel = ({
  children,
  slidesPerView,
  initialSlide,
  spaceBetween,
  ...rest
}: SwiperProps) => {
  const [isSlidesCentered] = useMediaQuery("(min-width: 900px)");

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      centeredSlides={isSlidesCentered}
      grabCursor={true}
      navigation={true}
      scrollbar={{ draggable: true }}
      loop
      initialSlide={initialSlide}
      {...rest}
    >
      {children}
    </Swiper>
  );
};
