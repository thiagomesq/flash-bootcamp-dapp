import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface TransactionHashDisplayProps {
  hash: string;
  explorerUrl: string;
}

export function TransactionHashDisplay({ hash, explorerUrl }: TransactionHashDisplayProps) {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hash da Transação:</p>
      <div className="flex items-center gap-2">
        <p className="text-xs font-mono break-all bg-white dark:bg-gray-900 p-2 rounded border dark:border-gray-700 flex-1">
          {hash}
        </p>
        {explorerUrl !== '#' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open(explorerUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}