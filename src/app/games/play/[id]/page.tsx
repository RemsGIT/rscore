"use client"


import {gameStore} from "@/store/storeGame";
import {Game, userGame} from "@/types/game";
import {useEffect, useState} from "react";
import SixQuiPrendPlayMode from "@/components/gamePlayMode/6quiprend";
import Skyjo from "@/components/gamePlayMode/skyjo";

const PlayGame = ({params}:{params: {id: string}}) => {
    const [userGames, setUserGames] = useState<{id: string, games: userGame[]}>();
    
    useEffect(() => {
        if(params.id) {
            gameStore.getUserGame(params.id)
                .then(response => {
                    if (response) {
                        setUserGames(response.data)
                    }
                })
        }
    }, [params.id]);
    
    return (
        <>
            {userGames && userGames.id && (
                <>
                    {userGames.games[0].game.folderName === "6quiprend" && <SixQuiPrendPlayMode data={userGames}/>}
                    {userGames.games[0].game.folderName === "skyjo" && <Skyjo  data={userGames}/>}
                </>
            )}
        </>
    )
}

export default PlayGame