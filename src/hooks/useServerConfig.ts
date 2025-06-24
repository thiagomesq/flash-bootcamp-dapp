'use client';

import { useState, useEffect } from 'react';

interface ServerConfig {
  rpcUrls: {
    mainnet: string;
    sepolia: string;
    polygon: string;
    polygonAmoy: string;
  };
  walletConnectProjectId: string;
  hasInfuraKey: boolean;
}

export function useServerConfig() {
  const [config, setConfig] = useState<ServerConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Falha ao carregar configuração');
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    }

    loadConfig();
  }, []);

  return { config, isLoading, error };
}