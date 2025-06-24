import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { Badge } from "@/components/ui";
import { BadgeCheckIcon, Loader2 } from "lucide-react";
import { useCurrency } from "@/hooks";

interface TaskCardProps {
    id: number | bigint;
    title: string;
    description: string;
    createdAt: string;
    dueDate: string;
    status: string;
    stake: string;
    isTransactionInProgress?: boolean;
    onCompleteTask: (taskId: number | bigint) => void;
}

export function TaskCard({ 
    id,
    title, 
    description, 
    createdAt, 
    dueDate, 
    status, 
    stake, 
    isTransactionInProgress = false,
    onCompleteTask 
}: TaskCardProps) {
    const { currencySymbol } = useCurrency();
    const isCompleted = status === "Concluída";
    const isVencida = status === "Vencida";
    const canComplete = !isCompleted && !isVencida; // Pode completar se não estiver completada e não estiver vencida

    const handleCompleteTask = () => {
        if (canComplete && !isTransactionInProgress) {
            onCompleteTask(id);
        }
    };

    return (
        <Card className={`transition-all duration-200 ${isCompleted ? 'opacity-75 bg-green-50 dark:bg-green-900/10' : isVencida ? 'bg-red-50 dark:bg-red-900/10' : ''} hover:shadow-lg hover:scale-[1.01]`}>
            <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-bold">{`${title} #${id}`}</h1>
                    <Badge 
                        variant={isCompleted ? "secondary" : isVencida ? "destructive" : "default"} 
                        className={isCompleted ? "bg-green-500 text-white dark:bg-green-600" : isVencida ? "bg-red-500 text-white dark:bg-red-600" : "bg-blue-500 text-white dark:bg-blue-600"}
                    >
                        {isCompleted && <BadgeCheckIcon className="w-4 h-4 mr-1" />}
                        {status}
                    </Badge>
                </div>
                
                {/* Botão de completar tarefa - só aparece se não estiver completada ou vencida */}
                {canComplete && (
                    <button 
                        className={`w-10 h-10 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-400 dark:hover:border-green-500 transition-all duration-200 flex items-center justify-center group ${
                            isTransactionInProgress ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }`}
                        onClick={handleCompleteTask}
                        disabled={isTransactionInProgress}
                        title={isTransactionInProgress ? "Processando..." : "Completar tarefa"}
                    >
                        {isTransactionInProgress ? (
                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                        ) : (
                            <svg 
                                className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>
                )}

                {/* Ícone de tarefa completada */}
                {isCompleted && (
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 border-2 border-green-400 dark:border-green-500 rounded-lg flex items-center justify-center">
                        <svg 
                                className="w-5 h-5 text-green-600 dark:text-green-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                    </div>
                )}
                {/* Ícone de tarefa vencida */}
                {!isCompleted && isVencida && (
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-500 rounded-lg flex items-center justify-center">
                        <svg 
                            className="w-5 h-5 text-red-600 dark:text-red-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
            </CardHeader>
            
            <CardContent className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            </CardContent>
            
            <CardFooter className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Criada:</span> {createdAt}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Vencimento:</span> {dueDate}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {stake} {currencySymbol}
                    </div>
                    {isCompleted ? (
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                            ✅ Recompensa recebida
                        </p>
                    ) : (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            Stake depositado
                        </p>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}