"use client"


import {gameStore} from "@/store/storeGame";
import {Game, userGame} from "@/types/game";
import {useEffect, useState} from "react";
import SixQuiPrendPlayMode from "@/components/gamePlayMode/6quiprend";
import Skyjo from "@/components/gamePlayMode/skyjo";

const PlayGame = ({params}:{params: {id: string}}) => {
    const [userGame, setUserGame] = useState<userGame>();
    
    useEffect(() => {
        if(params.id) {
            gameStore.getUserGame(params.id)
                .then(response => {
                    if (response) {
                        setUserGame(response.game)
                    }
                })
        }
    }, [params.id]);
    
    return (
        <>
            {userGame && userGame.game.id && (
                <>
                    {userGame.game.folderName === "6quiprend" && <SixQuiPrendPlayMode data={userGame}/>}
                    {userGame.game.folderName === "skyjo" && <Skyjo data={userGame}/>}
                </>
            )}
        </>
    )
}

export default PlayGame