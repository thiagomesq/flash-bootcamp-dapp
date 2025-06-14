import { useAccount, useReadContract } from "wagmi";
import { StatusCard } from "./comons/statusCard";
import { taskManagerABI } from "@/constants";
import { formatEther } from "viem/utils";

interface TaskData {
    tasksData?: any[],
    isConnected: boolean,
    isLoading: boolean,
    taskManagerAddress: string
}

export function Dashboard({tasksData, isConnected, isLoading, taskManagerAddress}: TaskData) {
  const { address } = useAccount();
      const { data: totalTasks, isLoading: isLoadingTotalTasks } = useReadContract({
        address: taskManagerAddress as `0x${string}`,
        abi: taskManagerABI,
        functionName: "getTasksCount",
        account: isConnected === true ? address : undefined,
        query: {
          enabled: isConnected, // Adiciona esta linha para maior clareza
        }
      }) as { data: number; isLoading: boolean };
      const completedTasks = tasksData?.filter(task => task.isCompleted).length || 0;
      const pendingTasks = tasksData?.filter(task => !task.isCompleted).length || 0;
      const ethStaked = formatEther(
        tasksData?.reduce((total, task) => total + Number(!task.isCompleted === true ? task.stake || 0 : 0),
        0
      ) || 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      <StatusCard 
      title="Total de tarefas"
      value={totalTasks || 0} 
      isLoading={isLoadingTotalTasks}
      />
      <StatusCard 
      title="Tarefas Concluídas"
      value={completedTasks} 
      isLoading={isLoading}
      />
      <StatusCard 
      title="Tarefas Pendentes"
      value={pendingTasks} 
      isLoading={isLoading}
      />
      <StatusCard 
      title="ETH em Stake"
      value={ethStaked} 
      isLoading={isLoading}
      />
    </div>
  );
}
