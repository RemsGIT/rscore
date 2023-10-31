import {Participant} from "@/types/participant";
import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import Confetti from 'react-confetti'
import {Crown} from "lucide-react";
import {useRouter} from "next/navigation";
import {Game} from "@/types/game";

const WinnerAndLoserScreen = ({winner,loser, show, game}: {winner: Participant | null, loser: Participant | null, show: boolean, game: Game}) => {
    const router = useRouter();
    const [winnerPoints, setWinnerPoints] = useState<number>()
    const [loserPoints, setLoserPoints] = useState<number>()
    

    useEffect(() => {
        console.log(winner, loser)
        if(winner && loser) {
            setWinnerPoints(winner?.points?.reduce((acc, val) => acc + val.point, 0))
            setLoserPoints(loser?.points?.reduce((acc, val) => acc + val.point, 0))
        }
    }, [winner, loser]);
    
    return (
        <>

            <Modal
                size={"full"}
                isOpen={show}
                placement={"center"}
                hideCloseButton={true}
            >
                <ModalContent>
                    <>
                        <Confetti recycle={false} numberOfPieces={300}/>
                        <ModalBody className={"m-2 flex justify-center items-center"}>
                            <div className="winner flex items-center flex-col">
                                <Crown size={100} color={"yellow"} />
                                
                                <span className={"text-primary italic text-6xl text-center"}>{winner?.name}</span>
                                <p className={"mt-1 text-lg text-gray-700 dark:text-white"}>remporte la partie avec {winnerPoints} points</p>
                            </div>
                            
                            <div className="loser mt-10">
                                <span className={"text-danger-500 text-xl "}>{loser?.name} perd la partie avec {loserPoints} points</span>
                            </div>

                            <div className={"mt-16"}>
                                <Button color="default" onPress={() => router.push(`/games/create/${game.folderName}`)}>
                                    Refaire une partie
                                </Button>
                            </div>

                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    )
}

export default WinnerAndLoserScreen