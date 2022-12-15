import { SwiperSlide as Slide } from "swiper/react";

import { Carousel } from "components/Carousel";
import Image from "next/image";

import GenresMusicPopImage from "Assets/pop.png";
import GenresMusicIndieImage from "Assets/indie.png";
import GenresMusicHipHopImage from "Assets/hipHop.png";
import GenresMusicBluesImage from "Assets/blues.png";

export const GenresMusic = () => {
  return (
    <Carousel initialSlide={3} spaceBetween={50} slidesPerView={3}>
      <Slide>
        <Image src={GenresMusicPopImage} alt="Genres Music Pop" />
      </Slide>
      <Slide>
        <Image src={GenresMusicIndieImage} alt="Genres Music indie" />
      </Slide>
      <Slide>
        <Image src={GenresMusicHipHopImage} alt="Genres Music Hip-Hop" />
      </Slide>
      <Slide>
        <Image src={GenresMusicBluesImage} alt="Genres Music Blues" />
      </Slide>
    </Carousel>
  );
};
