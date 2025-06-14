import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface StakeCardProps {
    value: string;
    onClick: (value: string) => void;
}

export function StakeCard({ value, onClick }: StakeCardProps) {
    const colors: Record<string, string> = {
        "0,000001": "bg-white outline-gray-300 outline-3 text-gray-700 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
        "0,00005": "bg-yellow-100 outline-yellow-600 outline-3 text-yellow-600 hover:bg-yellow-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
        "0,0002": "bg-blue-100 outline-blue-800 outline-3 text-blue-800 hover:bg-blue-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
        "0,001": "bg-red-100 outline-red-700 outline-3 text-red-700 hover:bg-red-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
    }
    return (
        <Card className={colors[value]} onClick={() => onClick(value)}>
            <CardContent className="flex flex-col items-center gap-2">
                <span className="text-black">Stake</span>
                <span className="font-bold">{value} ETH</span>
            </CardContent>
            <CardFooter className="flex justify-center">
                {
                    value === "0,001" ? <span className="font-bold">Alta</span> :
                    value === "0,0002" ? <span className="font-bold">Média</span> :
                    value === "0,00005" ? <span className="font-bold">Baixa</span> :
                    value === "0,000001" ? <span className="font-bold">Muito Baixa</span> :
                    null
                }
            </CardFooter>
        </Card>
    );
}