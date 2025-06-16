import { useAccount, useBalance } from "wagmi";

export function useCurrency() {
    const { address } = useAccount();
    const { data: balance, isLoading: isLoadingBalance } = useBalance({
        address,
    });
    
    return {
        balance,
        isLoadingBalance,
        currencySymbol: balance?.symbol || 'ETH', // Default to ETH if symbol is not available
    };
}