import {Participant} from "@/types/participant";

export interface Game {
    id: number,
    name: string,
    image: string,
    folderName: string,
    minPlayer: number,
    maxPlayer: number | undefined,
}


export interface userGame {
    id: string,
    game: Game,
    participants: Participant[],
    nbRound?: number
}