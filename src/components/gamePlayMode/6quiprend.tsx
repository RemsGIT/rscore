"use client"

import {userGame} from "@/types/game";
import PointsWithArray from "@/components/gamePlayMode/pointsWithArray";

const SixQuiPrendPlayMode = ({data}:{data: {id: string, games: userGame[]}}) => {

    return (
        <>
            {data.games.map(game => (
                <PointsWithArray key={game.id} idOfGame={data.id}  data={game} winWithMaxPoint={false} maxPoint={100} />
            ))}
        </>
    )
}

export default SixQuiPrendPlayMode