"use client"
import React, {useEffect, useState} from "react";
import {
    TableHeader,
    TableBody,
    TableCell,
    TableColumn,
    TableRow,
    Table,
    ScrollShadow,
    Modal,
    ModalContent, ModalBody, Input, ModalFooter, Button, ModalHeader
} from "@nextui-org/react";
import {userGame} from "@/types/game";
import {Participant, Point} from "@/types/participant";
import DigitScoreInArray from "@/components/playMode/digitScoreInArray";

const SixQuiPrendPlayMode = ({data}:{data: userGame}) => {
    
    const [openModalEditPoint, setOpenModalEditPoint] = useState<boolean>(false)
    
    const [roundNumberToEditPoints, setRoundNumberToEditPoints] = useState<number>(0);
    const [participantIndexToEditPoints, setParticipantIndexToEditPoints ] = useState<number>();
    const [pointsToAdd, setPointsToAdd] = useState<number>();
    
    
    const [totals, setTotals] = useState();
    const [maxPointsIndex, setMaxPointsIndex] = useState();
    const [minPointsIndex, setMinPointsIndex] = useState();
    const [isGameStartState, setIsGameStartState] = useState<boolean>(true);
    
    const [playerHasLost, setPlayerHasLost] = useState<Participant | null>(null);
    
    // Calcul des totaux pour chaque participant
    useEffect(() => {
        refreshTotals()
    }, []);
    
    const refreshTotals = () => {
        const t: any = data.participants.map((participant) =>
            participant?.points?.reduce((acc, val) => acc + val.point, 0)
        );
        setTotals(t)

        if(t) {
            setMaxPointsIndex(t.indexOf(Math.max(...t)))
            setMinPointsIndex(t.indexOf(Math.min(...t)))
        }
    }
    
    const handleAddPoint = () => {
        setIsGameStartState(false)
        if(participantIndexToEditPoints !== undefined ) {
            
            // Check if point already exists
            let pointFound = data.participants[participantIndexToEditPoints]?.points?.find(p => p.round === roundNumberToEditPoints);
            
            if(pointFound !== undefined) {
                pointFound.point = pointsToAdd as number
            }
            else {
                data.participants[participantIndexToEditPoints]?.points?.push({round: roundNumberToEditPoints as number, point: pointsToAdd as number})
            }
            refreshTotals()
            
            // Add new round if complete
            if(isEveryParticipantHasPoint(roundNumberToEditPoints)) {
                if(!checkIfAPlayerHasLost()) {
                    if(data.nbRound) {
                        if(data.nbRound == roundNumberToEditPoints) {
                            data.nbRound += 1
                        }
                    }
                    else {
                        data.nbRound = 1
                    }
                }
                else {
                    console.log('PERDU')
                }
            }
        }
    }

    const isEveryParticipantHasPoint = (roundNumber: number) => {
        return data.participants.every((participant: Participant) => {
            return participant.points?.some((point: Point) => point.round === roundNumber);
        });
    };
    
    const checkIfAPlayerHasLost = () => {
        if(totals) {
            // Player with more than 100 points
            const participantsWith100Plus = data.participants.filter(
                (participant: Participant, index: number) => totals[index] >= 100
            );


            if(participantsWith100Plus.length > 0) {
                const playerHasLost: Participant =  participantsWith100Plus.reduce((maxParticipant, participant) =>
                    // @ts-ignore
                    maxParticipant.points.reduce((acc, point) => acc + point.point, 0) > participant.points.reduce((acc, point) => acc + point.point, 0)
                        ? maxParticipant
                        : participant
                );

                if(playerHasLost) {
                    setPlayerHasLost(playerHasLost)

                    return true;
                }
            }

            return false;
        }
    }
    
    return (
        <>
            <div className={"m-0 md:m-10"}>
                <ScrollShadow hideScrollBar={true}>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn width={10} maxWidth={10} className={"border-r-1 text-center text-lg text-primary italic"}>#</TableColumn>
                                {data && data.participants.map((p: Participant, index: number): any => (
                                    <TableColumn key={index} className={"text-center"}>
                                    <span
                                        className={
                                            index === maxPointsIndex && !isGameStartState
                                                ? 'text-danger-400 font-extrabold  text-lg'
                                                : index === minPointsIndex && !isGameStartState
                                                    ? 'text-primary font-extrabold text-lg'
                                                    : ''
                                        }
                                    >
                                            {p.name}
                                    </span>
                                    </TableColumn>
                                )) as any}
                        </TableHeader>
                        <TableBody>
                            {[...Array((data?.nbRound as number)+1)].map((_, roundIndex) => (
                                <TableRow key={roundIndex}>
                                    <TableCell width={10} className={"border-r-1 text-center font-extrabold text-primary italic"}>{`${roundIndex + 1}`}</TableCell>
                                    {data && data.participants.map((participant: Participant, index: number) => (
                                            <TableCell key={index} className={"text-center "}>
                                                <div className={"flex justify-center"}>
                                                    <div onClick={() => {
                                                        setParticipantIndexToEditPoints(index)
                                                        setRoundNumberToEditPoints(roundIndex)
                                                        setOpenModalEditPoint(true)
                                                    }}>
                                                        <DigitScoreInArray score={participant.points ? participant.points.find(p => p.round === roundIndex)?.point : undefined}/>
                                                    </div>
                                                </div>
                                                
                                            </TableCell>
                                        )) as any}
                                </TableRow>
                            )) as any} 
                            {/*@ts-ignore*/}
                            <TableRow className={"border-t-1"}>
                                <TableCell className={"font-extrabold"}>TOTAL</TableCell>
                                {data && data.participants.map((participant: Participant, index: number) => (
                                        <TableCell key={index} className={"text-center"}>
                                            <span
                                                className={
                                                    index === maxPointsIndex && !isGameStartState
                                                        ? 'text-danger-400 font-extrabold  text-lg'
                                                        : index === minPointsIndex && !isGameStartState
                                                            ? 'text-primary font-extrabold text-lg'
                                                            : ''
                                                }
                                            >
                                                {totals ? totals[index] ?? 0 : 0}
                                            </span>
                                        </TableCell>
                                    )) as any}
                            </TableRow>
                        </TableBody>
                    </Table>
                </ScrollShadow>
            </div>

            {/* MODAL EDIT POINT */}
            <Modal backdrop={"blur"} isOpen={openModalEditPoint} onClose={() => setOpenModalEditPoint(false)} placement={"top-center"} scrollBehavior={"inside"}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <span className={"text-2xl"}>{data.participants[participantIndexToEditPoints  ?? 0].name}</span>
                        <span className={"italic font-extrabold text-primary"}>Tour {roundNumberToEditPoints+1}</span>

                    </ModalHeader>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        handleAddPoint()
                        setOpenModalEditPoint(false)
                    }}>
                        <ModalBody>
                            <div className={"mt-3"}>
                                <Input type={"number"} inputMode={"numeric"} onChange={(event) => setPointsToAdd(parseInt(event.target.value)) }/>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type={"submit"} variant={"light"} color="primary">
                                Ajouter
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            
        </>

    )
}

export default SixQuiPrendPlayMode