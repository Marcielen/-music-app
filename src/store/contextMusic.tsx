import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";

import { firebaseConfig } from "services/firebase";

export type ListMusicProps = {
  album: string;
  author: string;
  genere: string;
  imageAlbum: string;
  musicUrl: string;
  nameMusic: string;
  isActive: boolean;
};

interface MusicContextProps {
  selectedMusic: ListMusicProps;
  setSelectedMusic: React.Dispatch<React.SetStateAction<ListMusicProps>>;
  listMusic: ListMusicProps[];
  setListMusic: React.Dispatch<React.SetStateAction<ListMusicProps[]>>;
  setIsLoopMusic: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMusicActive: React.Dispatch<React.SetStateAction<boolean>>;
  setProgressMusic: React.Dispatch<React.SetStateAction<number>>;
  setDurationMusic: React.Dispatch<React.SetStateAction<number>>;
  isLoopMusic: boolean;
  progressMusic: number;
  durationMusic: number;
  isMusicActive: boolean;
  handleIsMusicLoop: () => void;
  handleIsMusicActive: () => void;
  handleNextMusic: () => void;
  handlePreviousMusic: () => void;
}

const MusicContext = createContext<MusicContextProps>({} as MusicContextProps);

interface MusicProviderProps {
  children: React.ReactNode;
}

export default function MusicProvider({
  children,
}: MusicProviderProps): JSX.Element {
  const [selectedMusic, setSelectedMusic] = useState<ListMusicProps>(
    {} as ListMusicProps
  );
  const [listMusic, setListMusic] = useState<ListMusicProps[]>([]);
  const [isLoopMusic, setIsLoopMusic] = useState(false);
  const [isMusicActive, setIsMusicActive] = useState(false);
  const [progressMusic, setProgressMusic] = useState(0);
  const [durationMusic, setDurationMusic] = useState(0);

  const handleIsMusicActive = useCallback(() => {
    setIsMusicActive(!isMusicActive);
  }, [isMusicActive]);

  const handleIsMusicLoop = useCallback(() => {
    setIsLoopMusic(!isLoopMusic);
  }, [isLoopMusic]);

  const handleNextMusic = useCallback(() => {
    const indexMusicSelected = listMusic.findIndex(
      (valueMusic) => valueMusic.musicUrl === selectedMusic.musicUrl
    );

    if (indexMusicSelected + 1 === listMusic.length) {
      setSelectedMusic(listMusic[0]);
    } else {
      setSelectedMusic(listMusic[indexMusicSelected + 1]);
    }
    setIsMusicActive(true);
  }, [listMusic, selectedMusic]);

  const handlePreviousMusic = useCallback(() => {
    const indexMusicSelected = listMusic.findIndex(
      (valueMusic) => valueMusic.musicUrl === selectedMusic.musicUrl
    );

    if (indexMusicSelected + 1 === 1) {
      setSelectedMusic(listMusic[listMusic.length - 1]);
    } else {
      setSelectedMusic(listMusic[indexMusicSelected - 1]);
    }
    setIsMusicActive(true);
  }, [listMusic, selectedMusic]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const q = query(collection(db, "music"));
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data() as ListMusicProps;
        setListMusic((valueListMusic) => {
          const musicIsAlreadyAdded = valueListMusic.some(
            (validateValue) => validateValue.musicUrl === data.musicUrl
          );

          if (musicIsAlreadyAdded) {
            return valueListMusic;
          }
          return [...valueListMusic, data];
        });
      });
    });
  }, []);

  return (
    <MusicContext.Provider
      value={{
        setListMusic,
        setIsLoopMusic,
        setIsMusicActive,
        durationMusic,
        setDurationMusic,
        progressMusic,
        setProgressMusic,
        isMusicActive,
        listMusic,
        handleIsMusicActive,
        selectedMusic,
        setSelectedMusic,
        isLoopMusic,
        handleIsMusicLoop,
        handleNextMusic,
        handlePreviousMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext(): MusicContextProps {
  const context = useContext(MusicContext);

  if (!context)
    throw new Error("useMusicContext must be used within a MusicProvider.");

  return context;
}
