import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import Providers from 'components/Providers';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Game Collect',
  description: 'A game collection app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'} className="dark">
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                borderRadius: '15px',
                background: '#111c44',
                color: '#fff',
                border: '2px solid #1b254b',
              },
            }}
          />
          <AppWrappers>{children}</AppWrappers>
        </Providers>
      </body>
    </html>
  );
}
