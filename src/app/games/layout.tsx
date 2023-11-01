import {ReactNode} from "react";
import Header from "@/components/header";

const GameLayout = ({children}: { children: ReactNode }) => {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}

export default GameLayout;