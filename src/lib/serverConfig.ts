// Configuração que roda apenas no servidor
export const serverConfig = {
  infuraApiKey: process.env.INFURA_API_KEY!,
  walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,
};

// Função para obter URLs RPC no servidor
export function getRpcUrls() {
  const infuraApiKey = serverConfig.infuraApiKey;
  
  return {
    mainnet: infuraApiKey 
      ? `https://mainnet.infura.io/v3/${infuraApiKey}` 
      : 'https://eth.llamarpc.com',
        
    sepolia: infuraApiKey 
      ? `https://sepolia.infura.io/v3/${infuraApiKey}` 
      : 'https://rpc.sepolia.org',
        
    polygon: infuraApiKey 
      ? `https://polygon-mainnet.infura.io/v3/${infuraApiKey}` 
      : 'https://polygon-rpc.com',

    polygonAmoy: infuraApiKey 
      ? `https://polygon-amoy.infura.io/v3/${infuraApiKey}` 
      : 'https://rpc-amoy.polygon.technology',
  };
}