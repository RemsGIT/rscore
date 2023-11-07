"use client"


import {Input} from "@nextui-org/react";
import CountSlider from "@/components/countSlider/countSlider";
import {Button} from "@nextui-org/react";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Game} from "@/types/game";
import {gameStore} from "@/store/storeGame";
import {Participant} from "@/types/participant";
import ModalParticipant from "@/components/gameCreateForm/modalParticipant";
import {useRouter} from "next/navigation";

const GameCreateForm = ({game_id}: {game_id: number}) => {
    const router = useRouter();
    
    const [isModalParticipantOpen, setIsModalParticipantOpen] = useState<boolean>(false)
    
    const [game, setGame] = useState<Game>();

    const [nbUser, setNbUser] = useState<number>(2)
    
    const [participants, setParticipants] = useState<Participant[]>([])
    
    const [isGameSubmitting, setIsGameSubmitting] = useState<boolean>(false)

    // Get details of the game
    const handleNbParticipantChange = (nb: number) => {
        if(nb != nbUser) {
            setNbUser(nb)
        }
    }
    
    useEffect(() => {
        setGame(gameStore.games.find(game => game.id === game_id))
    }, [game_id]);
    
    const handleSubmitRound = () => {
        setParticipants([])
        for (let i = 0; i < nbUser; i++) {
            setParticipants(prevArray => [...prevArray, {
                name: `Joueur ${i+1}`,
                points: []
            }]);

        }
        setIsModalParticipantOpen(true)
    }
    
    const handleSubmitGame = () => {
        setIsGameSubmitting(true)
        if(game) {
            gameStore.createUserGame(game, participants).then(res => {
                router.push(`/games/play/${res.id}`)
            })
        }

    }
    
    return (
        <div className={"pt-8 w-[90%] md:w-[60%] mx-auto"}>
            { /*  TITLE -> game name  */ }
            <div className={"pb-8 min-h-[100px] text-primary font-agbalumo"}>
                <h1 className={"text-6xl text-center"}>{game?.name}</h1>
            </div>
            
            { /* COUNTER  */ }
            <div>
                <CountSlider handleChangeNumber={handleNbParticipantChange} />
            </div>

            { /*  Button submit  */ }
            <div className={"mt-14 text-center"}>
                <Button color={"primary"} className={"w-[140px] rounded-full"} onClick={handleSubmitRound} isLoading={isGameSubmitting}>
                    {!isGameSubmitting && "Démarrer"}
                </Button>
            </div>

            { /*  MODAL PARTICIPANTS  */ }
            <ModalParticipant open={isModalParticipantOpen}  handleClose={() =>  setIsModalParticipantOpen(false)} participants={participants} handleUpdateParticipants={(p:Participant[]) => setParticipants(p)} handleSubmitGame={handleSubmitGame}/> 


        </div>
    )
}


export default GameCreateForm