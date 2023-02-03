import GenresMusicPopImage from "assets/pop.png";
import GenresMusicIndieImage from "assets/indie.png";
import GenresMusicHipHopImage from "assets/hipHop.png";
import GenresMusicRockImage from "assets/rock.png";
import GenresMusicPunkImage from "assets/punk.png";
import { EnumGenere } from "constants/enumGenere";

export const fileGenere = [
  {
    src: GenresMusicPopImage,
    id: EnumGenere.pop,
    alt: "Genres Music Pop",
    typeGenere: "Pop Right Now",
    route: `/genere/${EnumGenere.pop}`,
  },
  {
    src: GenresMusicRockImage,
    id: EnumGenere.rock,
    alt: "Genres Music Rock",
    typeGenere: "Rock Right Now",
    route: `/genere/${EnumGenere.rock}`,
  },
  {
    src: GenresMusicIndieImage,
    id: EnumGenere.indie,
    alt: "Genres Music Indie",
    typeGenere: "Indie Right Now",
    route: `/genere/${EnumGenere.indie}`,
  },
  {
    src: GenresMusicPunkImage,
    id: EnumGenere.punk,
    alt: "Genres Music Punk",
    typeGenere: "Punk Right Now",
    route: `/genere/${EnumGenere.punk}`,
  },
  {
    src: GenresMusicHipHopImage,
    id: EnumGenere.hipHop,
    alt: "Genres Music Hip Hop",
    typeGenere: "Hip Hop Right Now",
    route: `/genere/${EnumGenere.hipHop}`,
  },
];
