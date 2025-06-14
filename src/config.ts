import { http, createConfig } from 'wagmi'
import { anvil, mainnet, polygon, polygonAmoy, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { createClient } from 'viem'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY

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
  chains: [anvil, sepolia, polygon, mainnet, polygonAmoy],
  connectors: [
    metaMask(),
  ],
  client({ chain }) {
    switch (chain.id) {
      case mainnet.id:
        return createClient({ 
          chain, 
          transport: http(rpcUrls.mainnet)
        })
      case sepolia.id:
        return createClient({ 
          chain, 
          transport: http(rpcUrls.sepolia)
        })
      case polygon.id:
        return createClient({ 
          chain, 
          transport: http(rpcUrls.polygon)
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