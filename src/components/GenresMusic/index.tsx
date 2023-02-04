import { Grid } from "@chakra-ui/react";
import { SwiperSlide as Slide } from "swiper/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { fileGenere } from "services/Data/filesGenere";

import { Carousel } from "components/Carousel";

export const GenresMusic = () => {
  const router = useRouter();
  return (
    <Grid
      templateColumns="repeat(auto-fill, 300px)"
      rowGap="30px"
      columnGap="30px"
      color="white"
    >
      {fileGenere.map((genere) => (
        <Image
          key={genere.id}
          style={{
            objectFit: "cover",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => router.push(genere.route)}
          src={genere.src}
          alt={genere.alt}
        />
      ))}
    </Grid>
  );
};
