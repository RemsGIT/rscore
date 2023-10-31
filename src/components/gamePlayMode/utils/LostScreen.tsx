import {Participant} from "@/types/participant";

const LostScreen = ({player}: {player: Participant}) => {
    return (
        <p>PERDU : {player.name}</p>
    )
}

export default LostScreen