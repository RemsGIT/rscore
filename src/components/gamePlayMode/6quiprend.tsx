"use client"

import {userGame} from "@/types/game";
import PointsWithArray from "@/components/gamePlayMode/pointsWithArray";

const SixQuiPrendPlayMode = ({data}:{data: userGame}) => {
    
    return <PointsWithArray data={data} winWithMaxPoint={false} maxPoint={100} /> // Lose if reach 100 points
}

export default SixQuiPrendPlayMode