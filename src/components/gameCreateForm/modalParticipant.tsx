"use client"

import {Avatar, Input, Modal, ModalContent, ModalFooter, ModalHeader, ScrollShadow} from "@nextui-org/react";
import {Button, ModalBody} from "@nextui-org/react";
import {Participant} from "@/types/participant";
import {useState} from "react";
import {PlayCircle, PlaySquare} from "lucide-react";

const ModalParticipant = ({open, handleClose, participants, handleUpdateParticipants, handleSubmitGame}:{open: boolean, handleClose: () => void, participants: Participant[], handleUpdateParticipants: (p:Participant[]) => void, handleSubmitGame: () => void } ) => {
    
    const [participantToRename, setParticipantToRename] = useState<Participant>();
    const [isOpenModalName, setIsOpenModalName] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>("");
    
    const handleChangeNameParticipant = (newName: string) => {
        if (participantToRename && newName.trim() !== "") {
            const updatedParticipants = participants.map(p => {
                if (p === participantToRename) {
                    return { ...p, name: newName }; // Mettre à jour le nom du participant
                }
                return p;
            });

            // Mettre à jour la liste des participants avec le nom mis à jour
            handleUpdateParticipants(updatedParticipants);
        }
        setNewName("")
        setIsOpenModalName(false);
    }
    
    return (
        <>
            <Modal backdrop={"blur"} isOpen={open} size={"5xl"} placement={"top-center"} hideCloseButton={true} scrollBehavior={"inside"}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Liste des joueurs</ModalHeader>
                    <ModalBody>
                        <div className={"flex gap-5 flex-wrap justify-center"}>
                            {participants.map((p, index) => (
                                <div key={index} className={"bg-[#3F3F46] text-white p-2 w-[90px] h-[90px] flex justify-center items-center rounded-[25px] cursor-pointer"} onClick={() => {
                                    setParticipantToRename(p)
                                    setIsOpenModalName(true)
                                }}>
                                    <ScrollShadow hideScrollBar={true}>
                                        <span className={"whitespace-nowrap"}>
                                         {p.name}
                                        </span>
                                    </ScrollShadow>
                                </div>
                            ))}
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={handleClose}>
                            Annuler
                        </Button>
                        <Button color="primary" variant={"light"} onPress={() => {
                            handleSubmitGame()
                            handleClose()
                        }}>
                            <PlaySquare />Lancer la partie 
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            {/* MODAL NAME PARTICIPANT */}
            <Modal backdrop={"blur"} isOpen={isOpenModalName} onClose={() => setIsOpenModalName(false)} placement={"top-center"} scrollBehavior={"inside"}>
                <ModalContent>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        if(newName.trim() !== "") {
                            handleChangeNameParticipant(newName)
                            setIsOpenModalName(false)
                        }
                    }}>
                    <ModalBody>
                        <div className={"mt-10"}>
                            <Input type="text" label={participantToRename?.name || "Nom du joueur"} autoFocus={true} placeholder={"Entrer un nouveau nom"} size={"lg"} onChange={(e) => setNewName(e.target.value)} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type={"submit"} color="primary">
                            Sauvegarder
                        </Button>
                    </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>

    )
}

export default ModalParticipant