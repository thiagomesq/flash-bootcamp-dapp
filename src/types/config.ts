export interface RpcUrls {
  mainnet: string;
  sepolia: string;
  polygon: string;
  polygonAmoy: string;
}

export interface ConfigResponse {
  rpcUrls: RpcUrls;
  walletConnectProjectId: boolean;
  hasInfuraKey: boolean;
}

export interface ServerConfig {
  rpcUrls: {
    mainnet: string;
    sepolia: string;
    polygon: string;
    polygonAmoy: string;
  };
  walletConnectProjectId: string;
  hasInfuraKey: boolean;
}