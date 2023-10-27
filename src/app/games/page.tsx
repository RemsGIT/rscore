"use client"
import GameCard from "@/components/gameCard/gameCard";
import {useEffect, useState} from "react";
import {Game} from "@/types/game";

const Games = () => {
    const [games, setGames] = useState<Game[]>();

    useEffect(() => {
        fetch("/api/game")
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    setGames(response.games)
                }
            })
    }, []);
    
    return (
        <section className={"pt-8 w-[90%] md:w-[60%] mx-auto grid grid-cols-2 md:flex gap-4"}>
            {games && games.map((game: Game, index: number) => <GameCard game={game} key={index} />)}
        </section>
    )
}

export default Games