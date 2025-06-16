import { WaitForTransactionReceiptErrorType, WriteContractErrorType } from "wagmi/actions";

export function formatTransactionError(error: WriteContractErrorType | WaitForTransactionReceiptErrorType | null): string {
  const errorMessage = error?.message || error?.toString() || '';
  
  // Usuário rejeitou a transação
  if (errorMessage.includes('User rejected') || 
      errorMessage.includes('User denied') ||
      errorMessage.includes('rejected the request')) {
    return 'Transação cancelada pelo usuário';
  }
  
  // Saldo insuficiente
  if (errorMessage.includes('insufficient funds') ||
      errorMessage.includes('insufficient balance')) {
    return 'Saldo insuficiente para completar a transação';
  }
  
  // Gas insuficiente
  if (errorMessage.includes('gas') && 
      (errorMessage.includes('insufficient') || errorMessage.includes('too low'))) {
    return 'Gas insuficiente para processar a transação';
  }
  
  // Rede incorreta
  if (errorMessage.includes('network') || errorMessage.includes('chain')) {
    return 'Rede incorreta. Verifique se está conectado à rede correta';
  }
  
  // Contrato não encontrado
  if (errorMessage.includes('contract') && errorMessage.includes('not found')) {
    return 'Contrato não encontrado na rede atual';
  }
  
  // Timeout de transação
  if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
    return 'Tempo limite da transação excedido. Tente novamente';
  }
  
  // RPC Error
  if (errorMessage.includes('RPC') || errorMessage.includes('provider')) {
    return 'Erro de conexão com a rede. Tente novamente';
  }
  
  // Erro genérico mais amigável
  return 'Erro inesperado. Tente novamente ou contate o suporte';
}

export function getErrorCategory(error: WriteContractErrorType | WaitForTransactionReceiptErrorType | null): 'user_rejected' | 'insufficient_funds' | 'network_error' | 'contract_error' | 'unknown' {
  const errorMessage = error?.message || error?.toString() || '';
  
  if (errorMessage.includes('User rejected') || 
      errorMessage.includes('User denied') ||
      errorMessage.includes('rejected the request')) {
    return 'user_rejected';
  }
  
  if (errorMessage.includes('insufficient funds') ||
      errorMessage.includes('insufficient balance')) {
    return 'insufficient_funds';
  }
  
  if (errorMessage.includes('network') || 
      errorMessage.includes('RPC') || 
      errorMessage.includes('chain')) {
    return 'network_error';
  }
  
  if (errorMessage.includes('contract') || 
      errorMessage.includes('revert')) {
    return 'contract_error';
  }
  
  return 'unknown';
}