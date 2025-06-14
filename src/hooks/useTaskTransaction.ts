import { useState } from "react";
import { useChainId, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { chainsToTaskManager, taskManagerABI } from "@/constants";
import { formatTransactionError, getErrorCategory } from "@/utils";
import { parseEther } from "viem";

type Task = {
  stake: string;
  title: string;
  description: string;
  dueDate: string;
}

type TransactionStatus = 'idle' | 'pending' | 'confirming' | 'success' | 'error';

export function useTaskTransaction() {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const chainId = useChainId();
  
  const { 
    data: hash,
    error, 
    writeContract,
    reset,
    status 
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setShowTransactionModal(true);
      },
      onError: (error) => {
        console.error('Transaction error:', error);
        setShowTransactionModal(true);
      }
    }
  });

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: confirmError 
  } = useWaitForTransactionReceipt({ 
    hash 
  });

  function createTask(task: Task) {
    const dueDateTimestamp = BigInt(new Date(task.dueDate).getTime() / 1000); // Convert to seconds
    const stakeInWei = parseEther(task.stake);
    const taskManagerAddress = chainsToTaskManager[chainId]["taskManager"];
    
    writeContract({
      abi: taskManagerABI,
      address: taskManagerAddress as `0x${string}`,
      functionName: "createTask",
      value: stakeInWei,
      args: [task.title, task.description, dueDateTimestamp],
    });
  }

  function completeTask(taskId: number | bigint) {
    const taskManagerAddress = chainsToTaskManager[chainId]["taskManager"];
    const id = typeof taskId === 'number' ? BigInt(taskId) : taskId;
    
    writeContract({
      abi: taskManagerABI,
      address: taskManagerAddress as `0x${string}`,
      functionName: "completeTask",
      args: [id],
    });
  }

  function resetTransaction() {
    reset();
    setShowTransactionModal(false);
  }

  function getTransactionStatus(): TransactionStatus {
    if (status === 'pending') return 'pending';
    if (hash && isConfirming) return 'confirming';
    if (isConfirmed) return 'success';
    if (status === 'error' || confirmError) return 'error';
    return 'idle';
  }

  const isTransactionInProgress = status === 'pending' || isConfirming;
  
  // Formatar mensagem de erro de forma mais amigável
  const currentError = error || confirmError;
  const errorMessage = currentError ? formatTransactionError(currentError) : undefined;
  const errorCategory = currentError ? getErrorCategory(currentError) : undefined;

  return {
    createTask,
    completeTask, // Nova função exportada
    resetTransaction,
    showTransactionModal,
    setShowTransactionModal,
    transactionStatus: getTransactionStatus(),
    hash,
    errorMessage,
    errorCategory,
    isTransactionInProgress,
    chainId
  };
}