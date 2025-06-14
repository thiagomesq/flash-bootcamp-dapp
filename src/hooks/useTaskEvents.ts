import { useState, useCallback } from "react";
import { useWatchContractEvent, useChainId } from "wagmi";
import { chainsToTaskManager, taskManagerABI } from "@/constants";

interface TaskCreatedEvent {
  id: string;
  stake: string;
  title: string;
  description: string;
  createdAt: number;
  dueDate: number;
  owner: string;
  transactionHash: string;
  blockNumber: number;
}

interface TaskCompletedEvent {
  id: string;
  createdAt: number;
  completedAt: number;
  transactionHash: string;
  blockNumber: number;
}

export function useTaskEvents() {
  const chainId = useChainId();
  const taskManagerAddress = chainsToTaskManager[chainId]?.taskManager;
  
  const [taskCreatedEvents, setTaskCreatedEvents] = useState<TaskCreatedEvent[]>([]);
  const [taskCompletedEvents, setTaskCompletedEvents] = useState<TaskCompletedEvent[]>([]);

  // Callbacks para outros hooks se inscreverem
  const [onTaskCreatedCallbacks, setOnTaskCreatedCallbacks] = useState<(() => void)[]>([]);
  const [onTaskCompletedCallbacks, setOnTaskCompletedCallbacks] = useState<(() => void)[]>([]);

  // Funções para outros hooks se registrarem
  const onTaskCreated = useCallback((callback: () => void) => {
    setOnTaskCreatedCallbacks(prev => [...prev, callback]);
    
    // Retorna função de cleanup
    return () => {
      setOnTaskCreatedCallbacks(prev => prev.filter(cb => cb !== callback));
    };
  }, []);

  const onTaskCompleted = useCallback((callback: () => void) => {
    setOnTaskCompletedCallbacks(prev => [...prev, callback]);
    
    return () => {
      setOnTaskCompletedCallbacks(prev => prev.filter(cb => cb !== callback));
    };
  }, []);

  // Watch para TaskCreated
  useWatchContractEvent({
    address: taskManagerAddress as `0x${string}`,
    abi: taskManagerABI,
    eventName: 'TaskCreated',
    onLogs(logs) {
      logs.forEach((log) => {
        const {
          id,
          stake,
          title,
          description,
          createdAt,
          dueDate,
          owner
        } = log.args as any;

        const eventData: TaskCreatedEvent = {
          id: id?.toString() || '',
          stake: stake?.toString() || '0',
          title: title || '',
          description: description || '',
          createdAt: Number(createdAt),
          dueDate: Number(dueDate),
          owner: owner || '',
          transactionHash: log.transactionHash,
          blockNumber: Number(log.blockNumber),
        };

        console.log('Nova tarefa criada:', eventData);
        setTaskCreatedEvents(prev => [eventData, ...prev.slice(0, 9)]); // Mantém só os 10 mais recentes

        // Executa todos os callbacks registrados
        onTaskCreatedCallbacks.forEach(callback => callback());
      });
    },
    enabled: !!taskManagerAddress,
  });

  // Watch para TaskCompleted
  useWatchContractEvent({
    address: taskManagerAddress as `0x${string}`,
    abi: taskManagerABI,
    eventName: 'TaskCompleted',
    onLogs(logs) {
      logs.forEach((log) => {
        const { id, createdAt, completedAt } = log.args as any;

        const eventData: TaskCompletedEvent = {
          id: id?.toString() || '',
          createdAt: Number(createdAt),
          completedAt: Number(completedAt),
          transactionHash: log.transactionHash,
          blockNumber: Number(log.blockNumber),
        };

        console.log('Tarefa completada:', eventData);
        setTaskCompletedEvents(prev => [eventData, ...prev.slice(0, 9)]);

        // Executa todos os callbacks registrados
        onTaskCompletedCallbacks.forEach(callback => callback());
      });
    },
    enabled: !!taskManagerAddress,
  });

  return {
    taskCreatedEvents,
    taskCompletedEvents,
    onTaskCreated,
    onTaskCompleted,
    clearEvents: () => {
      setTaskCreatedEvents([]);
      setTaskCompletedEvents([]);
    }
  };
}