import { CheckCircle, Loader2 } from "lucide-react";
import type { TransactionStatus, TransactionContent, ErrorCategory } from "@/types/transaction";
import { TransactionHashDisplay } from "./TransactionHashDisplay";
import { useTransactionModal } from "@/hooks/useTransactionModal";

interface TransactionStatusContentProps {
  status: TransactionStatus;
  content: TransactionContent;
  hash?: string;
  explorerUrl?: string;
  error?: string;
  errorCategory?: ErrorCategory;
}

export function TransactionStatusContent({
  status,
  content,
  hash,
  explorerUrl,
  error,
  errorCategory
}: TransactionStatusContentProps) {
  const { getErrorIcon, getErrorTitle } = useTransactionModal();

  switch (status) {
    case 'pending':
      return (
        <div className="flex flex-col items-center gap-4 p-6">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <h3 className="text-lg font-semibold">
            {content.pending?.title || "Enviando Transação"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {content.pending?.description || "Confirme a transação na sua carteira..."}
          </p>
        </div>
      );

    case 'confirming':
      return (
        <div className="flex flex-col items-center gap-4 p-6">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          <h3 className="text-lg font-semibold">
            {content.confirming?.title || "Confirmando Transação"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {content.confirming?.description || "Aguarde enquanto a transação está sendo confirmada na blockchain..."}
          </p>
          {hash && explorerUrl && <TransactionHashDisplay hash={hash} explorerUrl={explorerUrl} />}
        </div>
      );

    case 'success':
      return (
        <div className="flex flex-col items-center gap-4 p-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
            {content.success?.title || "Transação Confirmada!"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {content.success?.description || "Sua transação foi confirmada com sucesso na blockchain."}
          </p>
          {hash && explorerUrl && <TransactionHashDisplay hash={hash} explorerUrl={explorerUrl} />}
        </div>
      );

    case 'error':
      return (
        <div className="flex flex-col items-center gap-4 p-6">
          {getErrorIcon(errorCategory)}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {getErrorTitle(errorCategory)}
          </h3>
          <div className={`w-full rounded-lg p-4 ${
            errorCategory === 'user_rejected' 
              ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <p className={`text-sm ${
              errorCategory === 'user_rejected' 
                ? 'text-orange-700 dark:text-orange-400' 
                : 'text-red-700 dark:text-red-400'
            }`}>
              {error || 'Erro desconhecido'}
            </p>
          </div>
          {errorCategory === 'user_rejected' && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Você pode tentar novamente quando estiver pronto
            </p>
          )}
        </div>
      );

    default:
      return null;
  }
}