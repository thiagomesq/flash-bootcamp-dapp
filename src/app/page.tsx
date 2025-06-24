"use client";
import { Header, Dashboard, NewTaskForm, TaskList, EventsLog } from "@/components";
import { useAccount } from "wagmi";
import { useTasks } from "@/hooks";

export default function Home() {
  const { isConnected } = useAccount();
  const { tasksData, isLoading, taskManagerAddress } = useTasks();

  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto pt-10 px-6 md:px-8 lg:px-10 xl:px-0 overflow-hidden">
      <Header />
      <Dashboard 
        tasksData={tasksData} 
        isConnected={isConnected} 
        isLoading={isLoading} 
        taskManagerAddress={taskManagerAddress} 
      />
      
      {/* Log de eventos em tempo real */}
      <div className="mt-10">
        {isConnected && <EventsLog />}
      </div>
      
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <NewTaskForm isConnected={isConnected} />
      </div>
      <TaskList 
        tasksData={tasksData} 
        isConnected={isConnected} 
        isLoading={isLoading} 
      />
    </div>
  );
}
