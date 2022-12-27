import React, { createContext, useState, useContext, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "services/firebase";
import firebase, {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";

export type ListMusicProps = {
  album: string;
  author: string;
  genere: string;
  imageAlbum: string;
  musicUrl: string;
  nameMusic: string;
};

interface MusicContextProps {
  selectedMusic: ListMusicProps;
  setSelectedMusic: React.Dispatch<React.SetStateAction<ListMusicProps>>;
  listMusic: ListMusicProps[];
  setListMusic: React.Dispatch<React.SetStateAction<ListMusicProps[]>>;
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
  console.log(listMusic);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const q = query(collection(db, "music"));
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        // @ts-ignore
        const data: ListMusicProps = doc.data();
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
        listMusic,
        selectedMusic,
        setSelectedMusic,
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
