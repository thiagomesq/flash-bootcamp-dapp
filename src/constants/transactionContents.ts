import type { TransactionContent } from "@/types/transaction";

export const DEFAULT_CONTENTS = {
  createTask: {
    pending: {
      title: "Enviando Transação",
      description: "Confirme a transação na sua carteira..."
    },
    confirming: {
      title: "Confirmando Transação",
      description: "Aguarde enquanto a transação está sendo confirmada na blockchain..."
    },
    success: {
      title: "Tarefa Criada!",
      description: "Sua tarefa foi criada com sucesso na blockchain.",
      buttonText: "Criar Nova Tarefa"
    }
  },
  completeTask: {
    pending: {
      title: "Completando Tarefa",
      description: "Confirme a conclusão da tarefa na sua carteira..."
    },
    confirming: {
      title: "Confirmando Conclusão",
      description: "Aguarde enquanto a conclusão está sendo confirmada na blockchain..."
    },
    success: {
      title: "Tarefa Completada!",
      description: "Sua tarefa foi completada com sucesso. A recompensa foi enviada para sua carteira.",
      buttonText: "Fechar"
    }
  },
  generic: {
    pending: {
      title: "Enviando Transação",
      description: "Confirme a transação na sua carteira..."
    },
    confirming: {
      title: "Confirmando Transação",
      description: "Aguarde enquanto a transação está sendo confirmada na blockchain..."
    },
    success: {
      title: "Transação Confirmada!",
      description: "Sua transação foi confirmada com sucesso na blockchain.",
      buttonText: "Fechar"
    }
  }
} as const satisfies Record<string, TransactionContent>;