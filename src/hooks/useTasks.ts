import { useAccount, useChainId, useReadContract } from "wagmi";
import { chainsToTaskManager, taskManagerABI } from "@/constants";
import { useTaskEvents } from "@/hooks";
import { useEffect } from "react";
import { Task } from "@/types";

export function useTasks() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const taskManagerAddress = chainsToTaskManager[chainId]?.taskManager;

  // Hook de eventos centralizado
  const { onTaskCreated, onTaskCompleted } = useTaskEvents();

  const { 
    data: tasksData, 
    isLoading, 
    refetch: refetchTasks,
    error 
  } = useReadContract({
    address: taskManagerAddress as `0x${string}`,
    abi: taskManagerABI,
    functionName: "getTasks",
    account: isConnected === true ? address : undefined,
    query: {
      enabled: isConnected && !!taskManagerAddress,
      refetchInterval: 60000, // Reduzido para 60s já que temos eventos
    }
  });

  // Registra callbacks nos eventos
  useEffect(() => {
    const unsubscribeCreated = onTaskCreated(() => {
      console.log('Refetching tasks due to TaskCreated event');
      refetchTasks();
    });

    const unsubscribeCompleted = onTaskCompleted(() => {
      console.log('Refetching tasks due to TaskCompleted event');
      refetchTasks();
    });

    // Cleanup
    return () => {
      unsubscribeCreated();
      unsubscribeCompleted();
    };
  }, [onTaskCreated, onTaskCompleted, refetchTasks]);

  return {
    tasksData: tasksData as Task[] | undefined,
    isLoading,
    refetchTasks,
    error,
    taskManagerAddress
  };
}