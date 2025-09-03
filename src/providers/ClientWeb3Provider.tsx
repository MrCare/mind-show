'use client';

import { useEffect, useState } from 'react';
import { Web3Provider } from './Web3Provider';

export function ClientWeb3Provider({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{children}</>;
  }

  return <Web3Provider>{children}</Web3Provider>;
}
