import React, { createContext, useState, useContext } from "react";

interface CreateCreateMusicContextProps {
  setisLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const CreateMusicContext = createContext<CreateCreateMusicContextProps>(
  {} as CreateCreateMusicContextProps
);

interface CreateMusicProviderProps {
  children: React.ReactNode;
}

export default function CreateMusicProvider({
  children,
}: CreateMusicProviderProps): JSX.Element {
  const [isLoading, setisLoading] = useState(false);

  return (
    <CreateMusicContext.Provider
      value={{
        setisLoading,
        isLoading,
      }}
    >
      {children}
    </CreateMusicContext.Provider>
  );
}

export function CreateuseCreateMusicContext(): CreateCreateMusicContextProps {
  const context = useContext(CreateMusicContext);

  if (!context)
    throw new Error(
      "CreateuseCreateMusicContext must be used within a CreateMusicProvider."
    );

  return context;
}
