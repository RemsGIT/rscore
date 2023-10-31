"use client"
import GameCard from "@/components/gameCard/gameCard";
import {Game} from "@/types/game";
import {gameStore} from "@/store/storeGame";

const Games = () => {
    return (
        <section className={"pt-8 w-[90%] md:w-[60%] mx-auto grid grid-cols-2 md:flex gap-4"}>
            {gameStore.games.map((game: Game, index: number) => <GameCard game={game} key={index} />)}
        </section>
    )
}

export default Games