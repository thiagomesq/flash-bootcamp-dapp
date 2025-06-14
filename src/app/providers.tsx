"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { config } from "@/config";
import { WagmiProvider } from "wagmi";
import { useState } from "react";
import { ThemeProvider } from "@/app/theme-provider";

export function Providers(props: {
  children: ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {props.children}
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    );
}