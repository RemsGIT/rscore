"use client"

import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import GameCreateForm from "@/components/gameCreateForm/gameCreateForm";
import {useEffect, useState} from "react";
import {Game} from "@/types/game";
import {log} from "util";


const GameCreatePage = ({params}: {params: {id: string}}) => {
    const [game, setGame] = useState<Game>();
    
    // Get in database the game by his ID
    useEffect(() => {
        fetch(`/api/game?id=${params.id}`)
            .then(response => response.json())
            .then(response => {
                setGame(response.game)
            })
    }, []);
    
    
    return (
        <>
            <div>
                <Link href={"/games"} className={"flex text-sm items-center m-2"}>
                    <ArrowLeft color={"#339966"} size={30} />
                    <span className={"text-primary"}>Retourner à la liste des jeux</span>
                </Link>
            </div>


            <GameCreateForm name={game?.name as string}/>
        </>
    )
}

export default GameCreatePage