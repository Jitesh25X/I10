import React, { useState, useCallback, useEffect } from 'react';
import { PreloaderContext } from './preloaderContextInstance';
import { preloaderAudio } from '../utils/preloaderAudio';

export const PreloaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always active on initial load / refresh so every visitor sees the cinematic experience
  const [isPreloaderActive, setIsPreloaderActive] = useState<boolean>(true);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [isWebsiteEmerging, setIsWebsiteEmerging] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState(false); // Silent by default, user can toggle on

  // Clear any legacy sessionStorage/localStorage flags from previous sessions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('aarambh_preloader_seen');
        localStorage.removeItem('aarambh_preloader_seen');
      } catch {}
    }
  }, []);

  const dismissPreloader = useCallback(() => {
    setIsPreloaderActive(false);
    setIsWebsiteEmerging(true);
    setHasFinished(true);
  }, []);

  const replayPreloader = useCallback(() => {
    setIsWebsiteEmerging(false);
    setIsPreloaderActive(true);
    setHasFinished(false);
  }, []);

  const setWebsiteEmerging = useCallback((emerging: boolean) => {
    setIsWebsiteEmerging(emerging);
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      preloaderAudio.setMuted(!next);
      return next;
    });
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        isPreloaderActive,
        hasFinished,
        isWebsiteEmerging,
        setWebsiteEmerging,
        replayPreloader,
        dismissPreloader,
        audioEnabled,
        toggleAudio,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};

export { usePreloader } from './usePreloader';
export type { PreloaderContextType } from './preloaderContextInstance';
