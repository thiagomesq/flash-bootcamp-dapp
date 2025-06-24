"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, type Config } from "wagmi";
import { ThemeProvider } from "./theme-provider";
import { createWagmiConfig, config as defaultConfig } from "@/config";
import { useServerConfig } from "@/hooks/useServerConfig";
import { ReactNode, useMemo, useState } from "react";

const queryClient = new QueryClient();

function WagmiProviderWithConfig({ children }: { children: ReactNode }) {
  const { config: serverConfig, isLoading } = useServerConfig();

  const wagmiConfig = useMemo(() => {
    if (!serverConfig) {
      // Usar configuração padrão enquanto carrega
      return defaultConfig;
    }

    // Criar configuração com dados do servidor
    return createWagmiConfig(
      serverConfig.rpcUrls,
      serverConfig.walletConnectProjectId
    );
  }, [serverConfig]);

  if (isLoading) {
    // Loading state enquanto carrega a configuração
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Carregando configuração...</p>
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
    </WagmiProvider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProviderWithConfig>{children}</WagmiProviderWithConfig>
      </QueryClientProvider>
    </ThemeProvider>
  );
}