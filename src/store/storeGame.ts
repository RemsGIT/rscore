import {Game, userGame} from "@/types/game";
import {Participant} from "@/types/participant";
import {v4 as uuidv4} from 'uuid';


export const gameStore = {
    games: [
        {
            id: 1,
            name: 'Skyjo',
            image: 'skyjo.png',
            folderName: 'skyjo',
            minPlayer: 2,
            maxPlayer: undefined
        },
        {
            id: 2,
            name: '6 qui prend !',
            image: '6quiprend.png',
            folderName: '6quiprend',
            minPlayer: 2,
            maxPlayer: undefined
        }
    ] as Game[],
    createUserGame: async (game: Game, roundName: string, users: Participant[]) => {
        const data = {game, roundName, participants: users, nbRound: 0, id: ''}
        
        
        const uuid = generateUUID()
        data.id = uuid
        localStorage.setItem(uuid, JSON.stringify(data))
        
        return {
            id: uuid,
            data: data
        }
    },
    getUserGame: async (id: string) => {
        const game = localStorage.getItem(`${id}`)
        
        if(game) {
            const userGame: userGame = JSON.parse(game)

            return {success: true, game: userGame}
        }

        return {success: false}
    },
    updateGame: async (data: userGame) => {
        console.log(data)
        if(localStorage.getItem(data.id)) {
            localStorage.setItem(data.id, JSON.stringify(data))
        }
    }
}


const generateUUID = () => {
    return uuidv4();
}