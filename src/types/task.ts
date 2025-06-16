export type Task = {
    id: number | bigint;
    stake: bigint;
    title: string;
    description: string;
    createdAt: bigint;
    dueDate: bigint;
    isCompleted: boolean;
}