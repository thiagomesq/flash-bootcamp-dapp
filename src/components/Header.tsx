import { ModeToggle } from "./comons/modeToggle";
import { ConnectButton } from "./ConnectButton";

export function Header() {
  return (
    <>
        <div className="flex justify-end mb-5">
            <ModeToggle />
        </div>
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Web3 TODO List</h1>
                <h2 className="text-sm text-muted-foreground">Gerencie suas tarefas com segurança e confiança</h2>
            </div>
            <ConnectButton />
        </div>
    </>
)
}