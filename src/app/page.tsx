"use client";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { NewTaskForm } from "@/components/NewTaskForm";
import { TaskList } from "@/components/TaskList";
import { EventsLog } from "@/components/EventsLog";
import { useAccount } from "wagmi";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const { isConnected } = useAccount();
  const { tasksData, isLoading, taskManagerAddress } = useTasks();

  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto pt-10">
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
