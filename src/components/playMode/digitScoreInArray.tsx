import {PlusCircle} from "lucide-react";

const DigitScoreInArray = ({score}:{score: number | undefined}) => {
    return (
        <>
            {score !== undefined ? (
                <span className={"text-lg"}>{score}</span>
            ) : (
                <PlusCircle className={"text-primary cursor-pointer"} />
            )}
        </>
    )
}

export default DigitScoreInArray