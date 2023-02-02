import { SwiperSlide as Slide } from "swiper/react";
import Image from "next/image";

import GenresMusicPopImage from "assets/pop.png";
import GenresMusicIndieImage from "assets/indie.png";
import GenresMusicHipHopImage from "assets/hipHop.png";
import GenresMusicRockImage from "assets/rock.png";
import GenresMusicPunkImage from "assets/punk.png";

import { Carousel } from "components/Carousel";
import { Box } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";

export const GenresMusic = () => {
  const router = useRouter();
  return (
    <Box maxW="80vw">
      <Carousel initialSlide={3} spaceBetween={50} slidesPerView={3}>
        <Slide>
          <Image
            style={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
            onClick={() => router.push("/genere/abc")}
            src={GenresMusicRockImage}
            alt="Genres Music Rock"
          />
        </Slide>
        <Slide>
          <Image
            style={{
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
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={GenresMusicPunkImage}
            alt="Genres Music Punk"
          />
        </Slide>
      </Carousel>
    </Box>
  );
};
