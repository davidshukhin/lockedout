'use client';

import { useEffect } from 'react';

export default function ExtensionSuccessPage() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1500);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white text-lg">
      You're signed in! You can close this tab.
    </div>
  );
}