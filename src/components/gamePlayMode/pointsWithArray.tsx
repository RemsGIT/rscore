import React, {useEffect, useState} from "react";
import {Participant, Point} from "@/types/participant";
import {gameStore} from "@/store/storeGame";
import {
    Button,
    Input,
    Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    ScrollShadow,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import DigitScoreInArray from "@/components/playMode/digitScoreInArray";
import WinnerAndLoserScreen from "@/components/gamePlayMode/utils/WinnerAndLoserScreen";
import {userGame} from "@/types/game";

const PointsWithArray = ({idOfGame, data, winWithMaxPoint, maxPoint}: {idOfGame: string, data: userGame, winWithMaxPoint: boolean, maxPoint: number}) => {
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

        const hasParticipantWithPoints = (): boolean => {
            return data.participants.some((participant: Participant) => {
                return Array.isArray(participant.points) && participant.points.length > 0;
            });
        };

        if(hasParticipantWithPoints()) {
            setIsGameStartState(false)
        }
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
        
        return t;
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

            const totals = refreshTotals()

            if(isEveryParticipantHasPoint(roundNumberToEditPoints)) {
                if(data.nbRound !== undefined) {
                    if(data.nbRound == roundNumberToEditPoints) {
                        checkIfAPlayerHasLost(totals)
                        data.nbRound += 1
                    }
                }
            }
            
            // Save points
            gameStore.updateGame(idOfGame, data)
        }
    }

    const isEveryParticipantHasPoint = (roundNumber: number) => {
        return data.participants.every((participant: Participant) => {
            return participant.points?.some((point: Point) => point.round === roundNumber);
        });
    };

    const checkIfAPlayerHasLost = (totals: number[]) => {
        // Player with more than 100 points
        const participantsWithMaxPointPlus = data.participants.filter(
            (participant: Participant, index: number) => totals[index] >= maxPoint
        );

        if(participantsWithMaxPointPlus.length > 0) {
            const playerHasLost: Participant =  participantsWithMaxPointPlus.reduce((maxParticipant, participant) =>
                // @ts-ignore
                maxParticipant.points.reduce((acc, point) => acc + point.point, 0) > participant.points.reduce((acc, point) => acc + point.point, 0)
                    ? maxParticipant
                    : participant
            );

            if(playerHasLost) {
                setPlayerHasLost(playerHasLost)

                return true;
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
                                                ? (winWithMaxPoint ? 'text-primary font-extrabold text-lg' : 'text-danger-400 font-extrabold text-lg')
                                                : index === minPointsIndex && !isGameStartState
                                                    ? (winWithMaxPoint ? 'text-danger-400 font-extrabold text-lg' : 'text-primary font-extrabold text-lg')
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
                                                        ? (winWithMaxPoint ? 'text-primary font-extrabold text-lg' : 'text-danger-400 font-extrabold text-lg')
                                                        : index === minPointsIndex && !isGameStartState
                                                            ? (winWithMaxPoint ? 'text-danger-400 font-extrabold text-lg' : 'text-primary font-extrabold text-lg')
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
                                <Input type={"number"} inputMode={"numeric"}  onChange={(event) => setPointsToAdd(parseInt(event.target.value)) }/>
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

            <WinnerAndLoserScreen winner={minPointsIndex ? data.participants[minPointsIndex] : null} loser={playerHasLost} show={playerHasLost !== null} game={data.game} idOfGame={idOfGame}/>
        </>
    )
}

export default PointsWithArray