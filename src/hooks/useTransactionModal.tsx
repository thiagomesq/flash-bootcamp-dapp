import type { ErrorCategory } from "@/types/transaction";
import { AlertTriangle, RefreshCw, XCircle } from "lucide-react";
import { getChainInfo } from "@/constants";

export function useTransactionModal() {
  function getExplorerUrl(hash: string, chainId: number) {
    const chainInfo = getChainInfo(chainId);
    
    if (!chainInfo.explorerUrl) {
      return '#'; // Para chains sem explorer (como Anvil local)
    }
    
    return `${chainInfo.explorerUrl}/tx/${hash}`;
  }

  function getErrorIcon(errorCategory?: ErrorCategory) {
    switch (errorCategory) {
      case 'user_rejected':
        return <AlertTriangle className="h-12 w-12 text-orange-500" />;
      case 'insufficient_funds':
        return <XCircle className="h-12 w-12 text-red-500" />;
      case 'network_error':
        return <RefreshCw className="h-12 w-12 text-yellow-500" />;
      default:
        return <XCircle className="h-12 w-12 text-red-500" />;
    }
  }

  function getErrorTitle(errorCategory?: ErrorCategory) {
    switch (errorCategory) {
      case 'user_rejected':
        return 'Transação Cancelada';
      case 'insufficient_funds':
        return 'Saldo Insuficiente';
      case 'network_error':
        return 'Erro de Rede';
      case 'contract_error':
        return 'Erro no Contrato';
      default:
        return 'Erro na Transação';
    }
  }

  function getButtonText(errorCategory?: ErrorCategory) {
    switch (errorCategory) {
      case 'user_rejected':
        return 'Tentar Novamente';
      case 'insufficient_funds':
        return 'Verificar Saldo';
      case 'network_error':
        return 'Reconectar';
      default:
        return 'Tentar Novamente';
    }
  }

  return {
    getExplorerUrl,
    getErrorIcon,
    getErrorTitle,
    getButtonText
  };
}