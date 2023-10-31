import Link from "next/link";
import {ArrowLeft} from "lucide-react";

const CreateGameLayout = ({children}: {children: React.ReactNode}) => (
    <>
        <div>
            <Link href={"/games"} className={"flex text-sm items-center m-2"}>
                <ArrowLeft color={"#339966"} size={30} />
                <span className={"text-primary"}>Retourner à la liste des jeux</span>
            </Link>
        </div>

        {children}
    </>
)

export default CreateGameLayout