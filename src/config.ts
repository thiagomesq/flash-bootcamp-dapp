import { http, createConfig } from 'wagmi'
import { anvil, polygonAmoy, sepolia } from 'wagmi/chains'
import { metaMask, walletConnect } from 'wagmi/connectors'
import { createClient } from 'viem'

// URLs de fallback públicas (sem chaves de API)
const fallbackRpcUrls = {
  mainnet: 'https://eth.llamarpc.com',
  sepolia: 'https://rpc.sepolia.org',
  polygon: 'https://polygon-rpc.com',
  polygonAmoy: 'https://rpc-amoy.polygon.technology',
};

// Configuração inicial com fallbacks
export function createWagmiConfig(
  rpcUrls: typeof fallbackRpcUrls = fallbackRpcUrls,
  walletConnectProjectId?: string
) {
  return createConfig({
    chains: [anvil, sepolia, polygonAmoy],
    connectors: [
      metaMask(),
      ...(walletConnectProjectId ? [
        walletConnect({
          projectId: walletConnectProjectId,
        })
      ] : []),
    ],
    client({ chain }) {
      switch (chain.id) {
        case sepolia.id:
          return createClient({ 
            chain, 
            transport: http(rpcUrls.sepolia)
          });
        case polygonAmoy.id:
          return createClient({ 
            chain, 
            transport: http(rpcUrls.polygonAmoy)
          });
        default:
          return createClient({ 
            chain, 
            transport: http()
          });
      }
    },
    ssr: false
  });
}

// Configuração padrão para desenvolvimento
export const config = createWagmiConfig();