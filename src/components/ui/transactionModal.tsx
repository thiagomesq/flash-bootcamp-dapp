import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { TransactionModalProps } from "@/types/transaction";
import { DEFAULT_CONTENTS } from "@/constants/transactionContents";
import { TransactionStatusContent } from "./TransactionStatusContent";
import { useTransactionModal } from "@/hooks/useTransactionModal";

export function TransactionModal({ 
  isOpen, 
  onClose, 
  status, 
  hash, 
  error, 
  errorCategory,
  chainId, 
  onReset,
  content = DEFAULT_CONTENTS.generic
}: TransactionModalProps) {
  
  const { getExplorerUrl, getButtonText } = useTransactionModal();
  const isTransactionInProgress = status === 'pending' || status === 'confirming';
  const explorerUrl = hash ? getExplorerUrl(hash, chainId) : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Status da Transação</DialogTitle>
        
        <TransactionStatusContent
          status={status}
          content={content}
          hash={hash}
          explorerUrl={explorerUrl}
          error={error}
          errorCategory={errorCategory}
        />

        {!isTransactionInProgress && (
          <DialogFooter>
            <Button onClick={onReset} className="w-full">
              {status === 'success' 
                ? (content.success?.buttonText || 'Fechar')
                : getButtonText(errorCategory)
              }
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Re-exportar para conveniência
export { DEFAULT_CONTENTS } from "@/constants/transactionContents";
export type { TransactionContent } from "@/types/transaction";