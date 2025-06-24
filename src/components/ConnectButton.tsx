"use client"
import { Button } from './ui/button'
import { ChevronDown, WalletIcon } from 'lucide-react'
import { 
  Connector,
  useConnect,
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useBalance,
  useSwitchChain,
  useChains,
  useChainId
} from 'wagmi'
import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger,  } from './ui/dialog'
import { useHydrated } from '@/hooks/useHydrated'
import { EthereumIcon } from "@/components/icons/EthereumIcon";
import { PolygonIcon } from "@/components/icons/PolygonIcon";
import { DevIcon } from "@/components/icons/DevIcon"; // Mudança aqui
import { DefaultAvatar } from "@/components/icons/DefaultAvatar";
import Image from 'next/image'

function WalletOptions() {
  const { connectors, connect } = useConnect()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 transition-all duration-200 hover:scale-105">
          <WalletIcon className="h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
        <DialogTitle className="text-center text-lg font-semibold">
          Selecione uma carteira
        </DialogTitle>
        <DialogDescription className="text-center text-sm text-muted-foreground mb-4">
          Conecte-se com uma das carteiras disponíveis
        </DialogDescription>
        <div className="grid gap-3">
          {
            connectors.map((connector) => (
              <WalletOption
                key={connector.uid}
                connector={connector}
                onClick={() => connect({ connector })}
              />
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <Button 
      disabled={!ready} 
      onClick={onClick}
      variant="outline"
      className="w-full justify-start gap-3 h-12 hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <div className="flex items-center justify-start w-full gap-3">
        {connector.icon && (
          <Image
            alt={`${connector.name} icon`}
            src={connector.icon}
            className="h-6 w-6 rounded-sm"
          />
        )}
        <span className="font-medium">{connector.name}</span>
      </div>
      {!ready && (
        <div className="ml-auto">
          <span className="text-xs text-muted-foreground">Não disponível</span>
        </div>
      )}
    </Button>
  )
}

// Componente que contém os hooks problemáticos
function Account() {
  const hydrated = useHydrated()
  
  // Hooks do Wagmi só são chamados após hidratação
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending } = useSwitchChain();
  const chainId = useChainId();
  const chains  = useChains();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { data: balance } = useBalance({ address });

  if (!hydrated) {
    return (
      <div className="flex flex-col p-4 border-2 rounded-lg gap-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  const formattedAddress = formatAddress(address);

  function formatAddress(address?: string) {
    if (!address) return null;
    return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
  }

  const supportedChains = chains.map(chain => ({
    id: chain.id,
    name: chain.name+ (chain.id === 80002 ? " (Contrato não implementado)" : ""),
    icon: getChainIcon(chain.id)
  }));

  function getChainIcon(chainId: number) {
    const size = 28;
    switch (chainId) {
      case 1: // Ethereum Mainnet
        return <EthereumIcon size={size} className="flex-shrink-0" />;
      case 11155111: // Sepolia
        return <EthereumIcon size={size} color="#FFA500" className="flex-shrink-0" />;
      case 137: // Polygon Mainnet
        return <PolygonIcon size={size} className="flex-shrink-0" />;
      case 80002: // Polygon Amoy
        return <PolygonIcon size={size} color="#A855F7" className="flex-shrink-0" />;
      case 31337: // Anvil
        return <DevIcon size={size} className="flex-shrink-0" />;
      default:
        return <div className="w-6 h-6 bg-gray-400 rounded-full flex-shrink-0" />;
    }
  }

  const currentChain = supportedChains.find(chain => chain.id === chainId);

  return (
    <div className="flex flex-col p-4 border-2 rounded-lg gap-4">
      {/* Dropdown de Seleção de Blockchain */}
      <div className="flex flex-col gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between gap-2 transition-all duration-200"
              disabled={isPending}
            >
              <div className="flex items-center gap-2">
                {currentChain?.icon}
                <span>{currentChain?.name || "Selecione uma blockchain"}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
            <DialogTitle className="text-center text-lg font-semibold">
              Selecionar Blockchain
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground mb-4">
              Escolha a rede blockchain para conectar
            </DialogDescription>
            <div className="grid gap-3">
              {supportedChains.map((chain) => (
                <Button
                  key={chain.id}
                  variant={chainId === chain.id ? "default" : "outline"}
                  onClick={() => switchChain({ chainId: chain.id })}
                  className={`w-full justify-start gap-3 h-12 transition-colors ${chainId !== chain.id ? 'hover:bg-accent hover:text-accent-foreground' : ''}`}
                  disabled={isPending}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {chain.icon}
                      <span className="font-medium">{chain.name}</span>
                    </div>
                    {chainId === chain.id && (
                      <span className="text-xs text-green-600 font-semibold">✓ Conectado</span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        {isPending && (
          <span className="text-xs text-muted-foreground">Trocando de rede...</span>
        )}
      </div>

      {/* Informações da Carteira Conectada */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {ensAvatar ? (
            <Image
              alt="ENS Avatar" 
              src={ensAvatar} 
              className="w-10 h-10 rounded-full border-2" 
            />
          ) : (
            <DefaultAvatar 
              size={40} 
              address={address} 
              className="rounded-full border-2 border-gray-200" 
            />
          )}
          <div className="flex flex-col">
            <span className="font-medium">{ensName || formattedAddress}</span>
            <span className="text-sm text-muted-foreground">
              {balance?.formatted.slice(0, 8)} {balance?.symbol}
            </span>
          </div>
        </div>
        <Button variant="destructive" onClick={() => disconnect()}>
          Desconectar
        </Button>
      </div>
    </div>
  )
}

export function ConnectButton() {
  const { isConnected } = useAccount()
  return isConnected ? <Account /> : <WalletOptions />
}