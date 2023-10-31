"use client"
import {useEffect, useState} from "react";
import {Game} from "@/types/game";
import {gameStore} from "@/store/storeGame";
import GameCreateForm from "@/components/gameCreateForm/gameCreateForm";

const CreateGame = ({params}:{params: {slug: string}}) => {
    
    const [game, setGame] = useState<Game>();
    
    useEffect(() => {
        if(params.slug) {
            const gameInStore = gameStore.games.find(game => game.folderName === params.slug)
            
            if(gameInStore) {
                setGame(gameInStore)
            }
            else {
                // Throw 404
            }
        }
    }, [params.slug]);
    
    
    return (
        <>
            {game && <GameCreateForm game_id={game?.id}/>}
        </>
    )
}

export default CreateGame