import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { db } from "services/firebase";
import { auth } from "modules/auth";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useRouter } from "next/router";

export type ListMusicProps = {
  album: string;
  author: string;
  genere: string;
  imageAlbum: string;
  musicUrl: string;
  nameMusic: string;
  isActive: boolean;
  id: string;
  musicDefault: boolean;
};

interface MusicContextProps {
  selectedMusic: ListMusicProps;
  setSelectedMusic: React.Dispatch<React.SetStateAction<ListMusicProps>>;
  listMusic: ListMusicProps[];
  setListMusic: React.Dispatch<React.SetStateAction<ListMusicProps[]>>;
  setListAllMusic: React.Dispatch<React.SetStateAction<ListMusicProps[]>>;
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
  isLoading: boolean;
  handleDataMusic: () => Promise<void>;
  handleMusicActive(url: string): void;
  listAllMusic: ListMusicProps[];
}

const MusicContext = createContext<MusicContextProps>({} as MusicContextProps);

let latestDoc: QueryDocumentSnapshot<DocumentData> | null = null;

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
  const [listAllMusic, setListAllMusic] = useState<ListMusicProps[]>([]);
  const [isLoopMusic, setIsLoopMusic] = useState(false);
  const [isMusicActive, setIsMusicActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progressMusic, setProgressMusic] = useState(0);
  const [durationMusic, setDurationMusic] = useState(0);

  const { pathname } = useRouter();

  const routeAllCollection = pathname.includes(EnumConstRouter.ALL_COLLECTIONS);

  const isAllCollection = routeAllCollection;

  const handleIsMusicActive = useCallback(() => {
    setIsMusicActive(!isMusicActive);
  }, [isMusicActive]);

  const handleIsMusicLoop = useCallback(() => {
    setIsLoopMusic(!isLoopMusic);
  }, [isLoopMusic]);

  const id = auth.getToken();
  const handleNextMusic = useCallback(() => {
    const data = isAllCollection ? listAllMusic : listMusic;
    const indexMusicSelected = data.findIndex(
      (valueMusic) => valueMusic.musicUrl === selectedMusic.musicUrl
    );

    if (indexMusicSelected + 1 === data.length) {
      setSelectedMusic(data[0]);
    } else {
      setSelectedMusic(data[indexMusicSelected + 1]);
    }
    setIsMusicActive(true);
  }, [isAllCollection, listAllMusic, listMusic, selectedMusic]);

  const handlePreviousMusic = useCallback(() => {
    const data = isAllCollection ? listAllMusic : listMusic;
    const indexMusicSelected = data.findIndex(
      (valueMusic) => valueMusic.musicUrl === selectedMusic.musicUrl
    );

    if (indexMusicSelected + 1 === 1) {
      setSelectedMusic(data[data.length - 1]);
    } else {
      setSelectedMusic(data[indexMusicSelected - 1]);
    }
    setIsMusicActive(true);
  }, [isAllCollection, listAllMusic, listMusic, selectedMusic.musicUrl]);

  const handleDataMusic = useCallback(async () => {
    setIsLoading(true);
    const dataMusic = query(
      collection(db, "music"),
      orderBy("nameMusic"),
      startAfter(latestDoc || 0),
      limit(10)
    );

    const testando = await getDocs(dataMusic);

    onSnapshot(dataMusic, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data() as ListMusicProps;

        setListMusic((valueListMusic) => {
          const musicIsAlreadyAdded = valueListMusic.some(
            (validateValue) => validateValue.musicUrl === data.musicUrl
          );

          if (musicIsAlreadyAdded) {
            return valueListMusic.filter((listUser) => listUser.id === id);
          }

          const values = [...valueListMusic, data];
          return values.filter((listUser) => listUser.id === id);
        });
        setListAllMusic((valueListMusic) => {
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

    latestDoc = testando.docs[testando.docs.length - 1];
    setIsLoading(false);
  }, [id]);

  function handleMusicActive(url: string) {
    if (isAllCollection) {
      setListAllMusic((previousValue) => {
        return previousValue.map((music) => ({
          ...music,
          isActive: music.musicUrl === url ? !music.isActive : false,
        }));
      });
    } else {
      setListMusic((previousValue) => {
        return previousValue.map((music) => ({
          ...music,
          isActive: music.musicUrl === url ? !music.isActive : false,
        }));
      });
    }
  }

  useEffect(() => {
    handleDataMusic();
  }, [handleDataMusic]);

  return (
    <MusicContext.Provider
      value={{
        setListMusic,
        setIsLoopMusic,
        handleDataMusic,
        setListAllMusic,
        listAllMusic,
        handleMusicActive,
        setIsMusicActive,
        durationMusic,
        setDurationMusic,
        progressMusic,
        setProgressMusic,
        isMusicActive,
        listMusic,
        handleIsMusicActive,
        isLoading,
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
