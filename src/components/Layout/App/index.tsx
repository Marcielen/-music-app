import { PlayerMusic } from "components/PlayerMusic";
import MusicProvider from "store/contextMusic";

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
