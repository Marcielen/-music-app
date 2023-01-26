import MusicProvider from "store/contextMusic";

import { PlayerMusic } from "components/PlayerMusic";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <MusicProvider>
      {children}
      <PlayerMusic />
    </MusicProvider>
  );
};
