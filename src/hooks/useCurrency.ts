import { useAccount, useBalance, useChainId, useReadContract } from "wagmi";
import { chainsToTaskManager, taskManagerABI } from "@/constants";
import { formatUnits } from "viem";

export function useCurrency() {
    const { address, isConnected } = useAccount();
    const { data: balance, isLoading: isLoadingBalance } = useBalance({
        address,
    });
    const chainId = useChainId();
    const taskManagerAddress = chainsToTaskManager[chainId]?.taskManager;

    const { 
    data: minimumStake, 
    isSuccess,
    error: minimumStakeError
  } = useReadContract({
    address: taskManagerAddress as `0x${string}`,
    abi: taskManagerABI,
    functionName: "getMinimumStake",
    account: isConnected === true ? address : undefined,
    query: {
      enabled: isConnected && !!taskManagerAddress,
    }
  });

  const formattedMinimumStake = isSuccess ? formatUnits(minimumStake, balance?.decimals || 18) : '0.000001';
  const lowestStake = formattedMinimumStake.replace('.', ',')
  const lowStake = (parseFloat(formattedMinimumStake) * 50).toFixed(5).replace('.', ',');
  const mediumStake = (parseFloat(formattedMinimumStake) * 200).toFixed(4).replace('.', ',');
  const highStake = (parseFloat(formattedMinimumStake) * 1000).toFixed(3).replace('.', ',');

    return {
        balance,
        minimumStake: lowestStake,
        lowStake,
        mediumStake,
        highStake,
        isLoadingBalance,
        minimumStakeError,
        currencySymbol: balance?.symbol || 'ETH', // Default to ETH if symbol is not available
    };
}