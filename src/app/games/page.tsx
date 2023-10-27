import CountSlider from "@/components/countSlider/countSlider";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {ArrowBigRight, ArrowLeft, ArrowLeftCircle, MoveLeft} from "lucide-react";
import Link from "next/link";

const Games = () => {
    
    
    return (
        <>
            <div>
                <Link href={"/"} className={"flex text-sm items-center m-2"}>
                    <ArrowLeft color={"#339966"} size={30} />
                    <span className={"text-primary"}>Retourner à la liste des jeux</span>
                </Link>
            </div>
            
            <div className={"pt-16 w-[90%] md:w-[60%] mx-auto"}>

                <div className={"pb-8"}>
                    <h1 className={"text-6xl text-center"}>Skyjo</h1>
                </div>

                <div>
                    <Input type={"text"} placeholder={"Nom du jeu"} classNames={{
                        input: 'text-center'
                    }}/>
                </div>


                <div className={"mt-20"}>
                    <CountSlider />
                </div>

                <div className={"mt-14 text-center"}>
                    <Button color={"primary"} className={"w-[140px] rounded-full"}>Démarrer</Button>
                </div>


            </div>
        </>

    )
}

export default Games