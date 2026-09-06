import { createContext } from 'react';

export interface PreloaderContextType {
  isPreloaderActive: boolean;
  hasFinished: boolean;
  replayPreloader: () => void;
  dismissPreloader: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
}

export const PreloaderContext = createContext<PreloaderContextType | null>(null);
