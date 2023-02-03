import { Box } from "@chakra-ui/react";
import { SwiperSlide as Slide } from "swiper/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { fileGenere } from "services/Data/filesGenere";

import { Carousel } from "components/Carousel";

export const GenresMusic = () => {
  const router = useRouter();
  return (
    <Box maxW="80vw">
      <Carousel initialSlide={3} spaceBetween={50} slidesPerView={3}>
        {fileGenere.map((genere) => (
          <Slide key={genere.alt}>
            <Image
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
              onClick={() => router.push(genere.route)}
              src={genere.src}
              alt={genere.alt}
            />
          </Slide>
        ))}
      </Carousel>
    </Box>
  );
};
