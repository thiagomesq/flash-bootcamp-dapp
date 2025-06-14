export type TransactionStatus = 'idle' | 'pending' | 'confirming' | 'success' | 'error';
export type ErrorCategory = 'user_rejected' | 'insufficient_funds' | 'network_error' | 'contract_error' | 'unknown';

export interface TransactionContent {
  pending?: {
    title?: string;
    description?: string;
  };
  confirming?: {
    title?: string;
    description?: string;
  };
  success?: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
}

export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: TransactionStatus;
  hash?: string;
  error?: string;
  errorCategory?: ErrorCategory;
  chainId: number;
  onReset: () => void;
  content?: TransactionContent;
}