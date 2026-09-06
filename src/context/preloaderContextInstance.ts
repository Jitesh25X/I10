import { createContext } from 'react';

export interface PreloaderContextType {
  isPreloaderActive: boolean;
  hasFinished: boolean;
  isWebsiteEmerging: boolean;
  setWebsiteEmerging: (emerging: boolean) => void;
  replayPreloader: () => void;
  dismissPreloader: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
}

export const PreloaderContext = createContext<PreloaderContextType | null>(null);
