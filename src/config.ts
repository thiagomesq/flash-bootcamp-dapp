import { http, createConfig } from 'wagmi'
import { anvil, polygonAmoy, sepolia } from 'wagmi/chains'
import { metaMask, walletConnect } from 'wagmi/connectors'
import { createWalletClient } from 'viem'

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
          return createWalletClient({ 
            chain, 
            transport: http(rpcUrls.sepolia)
          });
        case polygonAmoy.id:
          return createWalletClient({ 
            chain, 
            transport: http(rpcUrls.polygonAmoy)
          });
        default:
          return createWalletClient({ 
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