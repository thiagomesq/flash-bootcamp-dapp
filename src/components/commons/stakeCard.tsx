import { Card, CardContent, CardFooter } from "@/components/ui";
import { useCurrency } from "@/hooks";

interface StakeCardProps {
    value: string;
    onClick: (value: string) => void;
}

export function StakeCard({ value, onClick }: StakeCardProps) {
    const { currencySymbol, minimumStake, lowStake, mediumStake, highStake } = useCurrency();
    
    // Mapear o valor recebido para a classe CSS correta
    const getStakeLevel = (stakeValue: string) => {
        if (stakeValue === highStake) return 'high';
        if (stakeValue === mediumStake) return 'medium';
        if (stakeValue === lowStake) return 'low';
        if (stakeValue === minimumStake) return 'minimum';
        return 'minimum'; // fallback
    };

    const colors: Record<string, string> = {
        minimum: "bg-white outline-gray-300 outline-3 text-gray-700 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
        low: "bg-yellow-100 outline-yellow-600 outline-3 text-yellow-600 hover:bg-yellow-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
        medium: "bg-blue-100 outline-blue-800 outline-3 text-blue-800 hover:bg-blue-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
        high: "bg-red-100 outline-red-700 outline-3 text-red-700 hover:bg-red-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
    };

    const stakeLevel = getStakeLevel(value);

    return (
        <Card className={colors[stakeLevel]} onClick={() => onClick(value)}>
            <CardContent className="flex flex-col items-center gap-2 pt-4">
                <span className="text-black text-sm">Stake</span>
                <span className="font-bold text-lg">{value} {currencySymbol}</span>
            </CardContent>
            <CardFooter className="flex justify-center pb-4">
                {
                    stakeLevel === 'high' ? <span className="font-bold text-sm">Alta</span> :
                    stakeLevel === 'medium' ? <span className="font-bold text-sm">Média</span> :
                    stakeLevel === 'low' ? <span className="font-bold text-sm">Baixa</span> :
                    stakeLevel === 'minimum' ? <span className="font-bold text-sm">Muito Baixa</span> :
                    null
                }
            </CardFooter>
        </Card>
    );
}