import { http, createConfig } from 'wagmi'
import { anvil, polygonAmoy, sepolia } from 'wagmi/chains'
import { metaMask, walletConnect } from 'wagmi/connectors'
import { createClient } from 'viem'

const infuraApiKey = process.env.INFURA_API_KEY
const walletconnectProjectId = process.env.WALLETCONNECT_PROJECT_ID!

const rpcUrls = {
  mainnet: infuraApiKey 
    ? `https://mainnet.infura.io/v3/${infuraApiKey}` 
    : 'https://eth.llamarpc.com', // RPC público como fallback
      
  sepolia: infuraApiKey 
    ? `https://sepolia.infura.io/v3/${infuraApiKey}` 
    : 'https://rpc.sepolia.org', // RPC público como fallback
      
  polygon: infuraApiKey 
    ? `https://polygon-mainnet.infura.io/v3/${infuraApiKey}` 
    : 'https://polygon-rpc.com', // RPC público como fallback

  polygonAmoy: infuraApiKey 
    ? `https://polygon-amoy.infura.io/v3/${infuraApiKey}` 
    : 'https://rpc-amoy.polygon.technology', // RPC público como fallback
}

export const config = createConfig({
  chains: [anvil, sepolia, polygonAmoy],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: walletconnectProjectId,
    }),
  ],
  client({ chain }) {
    switch (chain.id) {
      case sepolia.id:
        return createClient({ 
          chain, 
          transport: http(rpcUrls.sepolia)
        })
      case polygonAmoy.id:
        return createClient({ 
          chain, 
          transport: http(rpcUrls.polygonAmoy)
        })
      default:
        return createClient({ 
          chain, 
          transport: http()
        })
    }
  },
  ssr: false
})