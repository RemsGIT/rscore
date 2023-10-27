"use client"

import {Card, CardFooter, Image} from "@nextui-org/react";
import {Game} from "@/types/game";
import Link from "next/link";


const GameCard = ({game}:{game: Game}) => {
    return (
        <>
            <Link href={`/games/create/${game.id}`} className={"inline-block"}>
                <Card
                    isFooterBlurred={false}
                    radius="lg"
                    className="border-none w-full md:max-w-[200px] bg-slate-300 dark:bg-slate-600"
                >
                    <Image
                        alt={`Illustration du jeu ${game.image}`}
                        className="object-cover w-full"
                        height={300}
                        src={`/assets/images/games/${game.image}`}
                        width={300}
                    />
                    <CardFooter className="bg-slate-500 dark:bg-slate-800 justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-0.5 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-md text-green-300 dark:text-green-500 font-agbalumo">{game.name.toUpperCase()}</p>
                    </CardFooter>
                </Card>
            </Link>
        </>


    )
}

export default GameCard