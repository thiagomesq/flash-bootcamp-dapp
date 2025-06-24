"use client";
import { formatEther } from "viem";
import { useTaskEvents, useCurrency } from "@/hooks";

export function EventsLog() {
  const { taskCreatedEvents, taskCompletedEvents, clearEvents } = useTaskEvents();
  const { currencySymbol } = useCurrency();

  // Combina e ordena eventos por timestamp
  const allEvents = [
    ...taskCreatedEvents.map(e => ({ ...e, type: 'created' as const })),
    ...taskCompletedEvents.map(e => ({ ...e, type: 'completed' as const }))
  ].sort((a, b) => {
    const aTime = a.type === 'created' ? a.createdAt : a.completedAt;
    const bTime = b.type === 'created' ? b.createdAt : b.completedAt;
    return bTime - aTime; // Mais recente primeiro
  });

  if (allEvents.length === 0) return null;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-6 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Eventos Recentes
        </h3>
        <button 
          onClick={clearEvents}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded text-sm transition-colors duration-200"
        >
          Limpar
        </button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {allEvents.map((event, index) => (
          <div 
            key={`${event.type}-${event.id}-${index}`} 
            className={`p-3 rounded border-l-4 transition-colors duration-200 ${
              event.type === 'created' 
                ? 'bg-green-100 dark:bg-green-900/20 border-green-500 dark:border-green-400' 
                : 'bg-blue-100 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {event.type === 'created' ? (
                  <>
                    <h4 className="font-semibold text-green-800 dark:text-green-300">
                      ✅ Tarefa Criada
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      <strong>ID:</strong> {event.id} | 
                      <strong> Stake:</strong> {formatEther(BigInt(event.stake))} {currencySymbol}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400 truncate">
                      <strong>Título:</strong> {event.title}
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                      🎉 Tarefa Completada
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      <strong>ID:</strong> {event.id}
                    </p>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-right">
                <p>Block: {event.blockNumber}</p>
                <p>
                  {new Date(
                    (event.type === 'created' ? event.createdAt : event.completedAt) * 1000
                  ).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}