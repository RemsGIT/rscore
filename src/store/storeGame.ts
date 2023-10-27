import {Game} from "@/types/game";
import {Participant} from "@/types/participant";

export const gameStore = {
    createGame: async (game: Game, users: Participant[]) => {
        console.log(game, users)
    },
    getGame: async (id: string) => {
        const game = localStorage.getItem(`rscore_${id}`)

        if(game) {
            return {success: true, game}
        }

        return {success: false}
    }
}