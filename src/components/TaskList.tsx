"use client"

import { formatEther } from "viem/utils";
import { TaskCard } from "./comons/taskCard"
import { timestampToDate } from "@/utils";
import { useTaskTransaction } from "@/hooks/useTaskTransaction";
import { TransactionModal, DEFAULT_CONTENTS } from "@/components/ui/transactionModal";
import { Task } from "@/types/task";

interface TaskData {
    tasksData?: Task[],
    isConnected: boolean,
    isLoading: boolean
}

export function TaskList({tasksData, isConnected, isLoading}: TaskData) {
    const {
        completeTask,
        isTransactionInProgress,
        showTransactionModal,
        setShowTransactionModal,
        transactionStatus,
        resetTransaction,
        hash,
        errorMessage,
        errorCategory,
        chainId
    } = useTaskTransaction();

    const tasks = tasksData?.sort((a, b) => {
        // Tarefas não completadas primeiro
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }
        // Depois ordena por stake (maior primeiro)
        return Number(b.stake) - Number(a.stake);
    }).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        createdAt: timestampToDate(Number(task.createdAt)),
        dueDate: timestampToDate(Number(task.dueDate)),
        status: task.isCompleted === true ? "Concluída" : Date.now() / 1000 > Number(task.dueDate) ? "Vencida" : "Pendente",
        stake: formatEther(task.stake)
    })) || [];

    const handleCompleteTask = (taskId: number | bigint) => {
        completeTask(taskId);
    };

    const handleCloseModal = () => {
        setShowTransactionModal(false);
        if (transactionStatus === 'success') {
            resetTransaction();
        }
    };

    return (
        <>
            <div className={`flex flex-col gap-4 mt-10 mb-10 border p-3 rounded-lg ${tasks.length >= 4 ? 'max-h-140 overflow-y-auto' : ''}`}>
            {
                !isConnected ? (
                    <div className="flex justify-center items-center h-full">
                        <h1 className="text-2xl font-bold">Conecte sua carteira para ver/criar as tarefas</h1>
                    </div>
                ) : isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-3 border-t-3 border-grey-200"></div>
                            <h1 className="text-2xl font-bold">Carregando tarefas...</h1>
                        </div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <h1 className="text-2xl font-bold">Nenhuma tarefa encontrada</h1>
                    </div>
                ) : (
                    tasks
                    .map((task) => (
                        <TaskCard
                            key={task.id.toString()}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            createdAt={task.createdAt}
                            dueDate={task.dueDate}
                            status={task.status}
                            stake={task.stake}
                            isTransactionInProgress={isTransactionInProgress}
                            onCompleteTask={handleCompleteTask}
                        />
                    ))
                )
            }
        </div>

            {/* Modal de transação personalizado para completar tarefa */}
            <TransactionModal
                isOpen={showTransactionModal}
                onClose={handleCloseModal}
                status={transactionStatus}
                hash={hash}
                error={errorMessage}
                errorCategory={errorCategory}
                chainId={chainId}
                onReset={resetTransaction}
                content={DEFAULT_CONTENTS.completeTask}
            />
        </>
    )
}