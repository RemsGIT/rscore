"use client"


import {Input} from "@nextui-org/react";
import CountSlider from "@/components/countSlider/countSlider";
import {Button} from "@nextui-org/react";
import {useState} from "react";

const GameCreateForm = ({name}: {name: string}) => {
    
    const [nbUser, setNbUser] = useState<number>(2)
    
    // Get details of the game
    const handleNbParticipantChange = (nb: number) => {
        if(nb != nbUser) {
            setNbUser(nb)
        }
    }
    
    const handleSubmit = () => {
    }
    
    return (
        <div className={"pt-8 w-[90%] md:w-[60%] mx-auto"}>

            { /*  TITLE -> game name  */ }
            <div className={"pb-8 min-h-[100px] text-primary font-agbalumo"}>
                <h1 className={"text-6xl text-center"}>{name}</h1>
            </div>

            { /*  part name  */ }
            <div>
                <Input type={"text"} variant={"bordered"} placeholder={"Nom de la partie"} classNames={{
                    input: 'text-center'
                }}/>
            </div>

            { /* COUNTER  */ }
            <div className={"mt-28"}>
                <CountSlider handleChangeNumber={handleNbParticipantChange} />
            </div>

            { /*  Button submit  */ }
            <div className={"mt-14 text-center"}>
                <Button color={"primary"} className={"w-[140px] rounded-full"} onClick={handleSubmit}>Démarrer</Button>
            </div>


        </div>
    )
}


export default GameCreateForm