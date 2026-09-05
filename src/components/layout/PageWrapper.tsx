import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CosmicBackground } from './CosmicBackground';

export const PageWrapper = ({
  children,
  fullWidth = false,
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <CosmicBackground />
      <Navbar />
      <main
        className={`flex-grow w-full relative z-10 ${
          fullWidth ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12'
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
