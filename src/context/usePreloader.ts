import { useContext } from 'react';
import { PreloaderContext } from './preloaderContextInstance';

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
};
