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
    createUserGame: async (game: Game, users: Participant[]) => {
        const data = {id: '', games: [{game, participants: users, nbRound: 0, id: ''}]}
        
        
        const uuid = generateUUID()
        data.id = uuid
        data.games[0].id = generateUUID()
        localStorage.setItem(uuid, JSON.stringify(data))
        
        return {
            id: uuid,
            data: data
        }
    },
    getUserGame: async (id: string) => {
        const game = localStorage.getItem(`${id}`)
        
        if(game) {
            const userGame: {id: string, games: userGame[]} = JSON.parse(game)

            return {success: true, data: userGame}
        }

        return {success: false}
    },
    updateGame: async (idOfGame: string, data: userGame) => {
        const game = localStorage.getItem(idOfGame);

        if(game) {
            const gamesFormatted: {id: string, games: userGame[]} = JSON.parse(game);

            const gameModifiedIndex = gamesFormatted.games.findIndex(g => g.id === data.id)
            if(gameModifiedIndex >= 0){
                gamesFormatted.games[gameModifiedIndex] = data

                localStorage.setItem(idOfGame, JSON.stringify(gamesFormatted))
            }
        }
    }
}


const generateUUID = () => {
    return uuidv4();
}