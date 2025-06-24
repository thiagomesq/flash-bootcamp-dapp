interface ContractsConfig {
  [chainId: number]: {
    taskManager: string;
    no_check: string | null;
  }
}

export const chainsToTaskManager: ContractsConfig = {
    // Anvil (local development)
    31337: {
        taskManager: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        no_check: null
    },
    // Sepolia (Ethereum testnet)
    11155111: {
        taskManager: "0x90f8fb64a61364e5288e504c8b24f59279a9b8d1",
        no_check: null
    },
    // Polygon Amoy (testnet)
    80002: {
        taskManager: "0x0000000000000000000000000000000000000000", // Substitua pelo endereço real
        no_check: null
    }
}

// Função auxiliar para verificar se uma chain é suportada
export function isSupportedChain(chainId: number): boolean {
    return chainId in chainsToTaskManager;
}

// Função para obter informações da chain
export function getChainInfo(chainId: number) {
    const chainNames: Record<number, string> = {
        31337: "Anvil Local",
        11155111: "Sepolia",
        1: "Ethereum Mainnet",
        137: "Polygon",
        80002: "Polygon Amoy"
    };

    const explorerUrls: Record<number, string> = {
        31337: "", // Sem explorer para local
        11155111: "https://sepolia.etherscan.io",
        1: "https://etherscan.io",
        137: "https://polygonscan.com",
        80002: "https://amoy.polygonscan.com"
    };

    return {
        name: chainNames[chainId] || "Unknown Chain",
        explorerUrl: explorerUrls[chainId] || "",
        isTestnet: [31337, 11155111, 80002].includes(chainId)
    };
}

// TaskManager contract ABI - modularized and cleaned up
export const taskManagerABI = [
    // Functions
    {
        type: "function",
        name: "createTask",
        inputs: [
            { name: "_title", type: "string", internalType: "string" },
            { name: "_description", type: "string", internalType: "string" },
            { name: "_dueDate", type: "uint256", internalType: "uint256" }
        ],
        outputs: [],
        stateMutability: "payable"
    },
    {
        type: "function",
        name: "completeTask",
        inputs: [
            { name: "_id", type: "uint256", internalType: "uint256" }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "getTask",
        inputs: [
            { name: "_id", type: "uint256", internalType: "uint256" }
        ],
        outputs: [
            {
                name: "",
                type: "tuple",
                internalType: "struct TaskManager.Task",
                components: [
                    { name: "id", type: "uint256", internalType: "uint256" },
                    { name: "stake", type: "uint256", internalType: "uint256" },
                    { name: "title", type: "string", internalType: "string" },
                    { name: "description", type: "string", internalType: "string" },
                    { name: "createdAt", type: "uint256", internalType: "uint256" },
                    { name: "completedAt", type: "uint256", internalType: "uint256" },
                    { name: "dueDate", type: "uint256", internalType: "uint256" },
                    { name: "isCompleted", type: "bool", internalType: "bool" },
                    { name: "owner", type: "address", internalType: "address" }
                ]
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "getTasks",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "tuple[]",
                internalType: "struct TaskManager.Task[]",
                components: [
                    { name: "id", type: "uint256", internalType: "uint256" },
                    { name: "stake", type: "uint256", internalType: "uint256" },
                    { name: "title", type: "string", internalType: "string" },
                    { name: "description", type: "string", internalType: "string" },
                    { name: "createdAt", type: "uint256", internalType: "uint256" },
                    { name: "completedAt", type: "uint256", internalType: "uint256" },
                    { name: "dueDate", type: "uint256", internalType: "uint256" },
                    { name: "isCompleted", type: "bool", internalType: "bool" },
                    { name: "owner", type: "address", internalType: "address" }
                ]
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "getTasksCount",
        inputs: [],
        outputs: [
            { name: "", type: "uint256", internalType: "uint256" }
        ],
        stateMutability: "view"
    },
    // Events
    {
        type: "event",
        name: "TaskCreated",
        inputs: [
            { name: "id", type: "uint256", indexed: true, internalType: "uint256" },
            { name: "stake", type: "uint256", indexed: true, internalType: "uint256" },
            { name: "title", type: "string", indexed: false, internalType: "string" },
            { name: "description", type: "string", indexed: false, internalType: "string" },
            { name: "createdAt", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "completedAt", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "dueDate", type: "uint256", indexed: true, internalType: "uint256" },
            { name: "isCompleted", type: "bool", indexed: false, internalType: "bool" },
            { name: "owner", type: "address", indexed: false, internalType: "address" }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "TaskCompleted",
        inputs: [
            { name: "id", type: "uint256", indexed: true, internalType: "uint256" },
            { name: "createdAt", type: "uint256", indexed: true, internalType: "uint256" },
            { name: "completedAt", type: "uint256", indexed: true, internalType: "uint256" }
        ],
        anonymous: false
    },
    // Errors
    {
        type: "error",
        name: "TaskManager__InsufficientStake",
        inputs: [
            { name: "providedStake", type: "uint256", internalType: "uint256" },
            { name: "minimumStake", type: "uint256", internalType: "uint256" }
        ]
    },
    {
        type: "error",
        name: "TaskManager__TaskAlreadyCompleted",
        inputs: [
            { name: "id", type: "uint256", internalType: "uint256" }
        ]
    },
    {
        type: "error",
        name: "TaskManager__TaskIsOverdue",
        inputs: [
            { name: "id", type: "uint256", internalType: "uint256" }
        ]
    },
    {
        type: "error",
        name: "TaskManager__TaskNotFound",
        inputs: [
            { name: "id", type: "uint256", internalType: "uint256" }
        ]
    },
    {
        type: "error",
        name: "TaskManager__TransferFailed",
        inputs: [
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" }
        ]
    },
    {
        type: "error",
        name: "TaskManager__Unauthorized",
        inputs: [
            { name: "caller", type: "address", internalType: "address" },
            { name: "owner", type: "address", internalType: "address" }
        ]
    }
] as const;
