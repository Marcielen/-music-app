import { SwiperSlide as Slide } from "swiper/react";
import Image from "next/image";

import GenresMusicPopImage from "Assets/pop.png";
import GenresMusicIndieImage from "Assets/indie.png";
import GenresMusicHipHopImage from "Assets/hipHop.png";
import GenresMusicRockImage from "Assets/rock.png";
import GenresMusicPunkImage from "Assets/punk.png";

import { Carousel } from "components/Carousel";

export const GenresMusic = () => {
  return (
    <Carousel initialSlide={3} spaceBetween={50} slidesPerView={3}>
      <Slide>
        <Image
          style={{
            height: "230px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          src={GenresMusicRockImage}
          alt="Genres Music Rock"
        />
      </Slide>
      <Slide>
        <Image
          style={{
            height: "230px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          src={GenresMusicPopImage}
          alt="Genres Music Pop"
        />
      </Slide>
      <Slide>
        <Image
          style={{
            height: "230px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          src={GenresMusicIndieImage}
          alt="Genres Music indie"
        />
      </Slide>
      <Slide>
        <Image
          style={{
            height: "230px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          src={GenresMusicHipHopImage}
          alt="Genres Music Hip-Hop"
        />
      </Slide>
      <Slide>
        <Image
          style={{
            height: "230px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          src={GenresMusicPunkImage}
          alt="Genres Music Punk"
        />
      </Slide>
    </Carousel>
  );
};
