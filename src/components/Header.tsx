import { ModeToggle } from "./commons";
import { ConnectButton } from "./ConnectButton";

export function Header() {
  return (
    <>
      <div className="flex justify-end mb-5">
        <ModeToggle />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-[0] w-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Web3 TODO List</h1>
          <h2 className="text-sm text-muted-foreground">Gerencie suas tarefas com segurança e confiança</h2>
        </div>
        <ConnectButton />
      </div>
    </>
  )
}