import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StakeCard } from "@/components/comons/stakeCard";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TransactionModal, DEFAULT_CONTENTS } from "@/components/ui/transactionModal";
import { useTaskTransaction } from "@/hooks/useTaskTransaction";

type Task = {
  stake: string;
  title: string;
  description: string;
  dueDate: string;
}

export function NewTaskForm({isConnected}: {isConnected: boolean}) {
  const [newTask, setNewTask] = useState<Task>({
    stake: "",
    title: "Nova Tarefa",
    description: "Esta é uma nova tarefa",
    dueDate: "",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    createTask,
    resetTransaction,
    showTransactionModal,
    setShowTransactionModal,
    transactionStatus,
    hash,
    errorMessage,
    errorCategory,
    isTransactionInProgress,
    chainId
  } = useTaskTransaction();

  const camposObrigatoriosPreenchidos = 
    newTask.title !== "" && 
    newTask.description !== "" && 
    newTask.dueDate !== "" && 
    newTask.stake !== "";

  function handleCreateTask() {
    createTask(newTask);
    setIsFormOpen(false);
  }

  function handleReset() {
    resetTransaction();
    // Reset form only if transaction was successful
    if (transactionStatus === 'success') {
      setNewTask({
        stake: "",
        title: "Nova Tarefa",
        description: "Esta é uma nova tarefa",
        dueDate: "",
      });
    }
  }

  function handleCloseModal() {
    setShowTransactionModal(false);
    if (transactionStatus === 'success') {
      resetTransaction();
    }
  }

  return (
    <>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button
            disabled={!isConnected}
            variant={isConnected ? "default" : "outline"}
            className={!isConnected ? "opacity-50 cursor-not-allowed" : ""}
          >
            <PlusIcon />
            <span>Nova Tarefa</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto p-4">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              type="text" 
              placeholder="Título da tarefa" 
              value={newTask.title} 
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
            />
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              placeholder="Descrição da tarefa" 
              value={newTask.description} 
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
            />
            <Label htmlFor="dueDate">Data de vencimento</Label>
            <Input 
              id="dueDate" 
              type="datetime-local" 
              placeholder="Data de vencimento" 
              value={newTask.dueDate} 
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
            />
            <Label>Stake</Label>
            <Input 
              id="stake" 
              type="text" 
              placeholder="Stake" 
              value={newTask.stake} 
              readOnly={true} 
            />
            <div className="grid grid-cols-2 gap-2">
              <StakeCard value={"0,001"} onClick={(value) => setNewTask({ ...newTask, stake: value })} />
              <StakeCard value={"0,0002"} onClick={(value) => setNewTask({ ...newTask, stake: value })} />
              <StakeCard value={"0,00005"} onClick={(value) => setNewTask({ ...newTask, stake: value })} />
              <StakeCard value={"0,000001"} onClick={(value) => setNewTask({ ...newTask, stake: value })} />
            </div>
          </DialogDescription>
          <DialogFooter className="sticky bottom-0 pt-4">
            <Button 
              disabled={!camposObrigatoriosPreenchidos || isTransactionInProgress}
              className={(!camposObrigatoriosPreenchidos || isTransactionInProgress) ? "opacity-50" : ""}
              onClick={handleCreateTask}
            >
              {transactionStatus === 'pending' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <PlusIcon />
                  <span>Criar Tarefa</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={handleCloseModal}
        status={transactionStatus}
        hash={hash}
        error={errorMessage}
        errorCategory={errorCategory}
        chainId={chainId}
        onReset={handleReset}
        content={DEFAULT_CONTENTS.createTask}
      />
    </>
  )
}