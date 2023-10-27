import {Input} from "@nextui-org/input";
import CountSlider from "@/components/countSlider/countSlider";
import {Button} from "@nextui-org/button";

const GameCreateForm = ({name}: {name: string}) => {
    return (
        <div className={"pt-8 w-[90%] md:w-[60%] mx-auto"}>

            <div className={"pb-8 min-h-[100px] text-primary font-agbalumo"}>
                <h1 className={"text-6xl text-center"}>{name}</h1>
            </div>

            <div>
                <Input type={"text"} variant={"bordered"} placeholder={"Nom de la partie"} classNames={{
                    input: 'text-center'
                }}/>
            </div>


            <div className={"mt-28"}>
                <CountSlider />
            </div>

            <div className={"mt-14 text-center"}>
                <Button color={"primary"} className={"w-[140px] rounded-full"}>Démarrer</Button>
            </div>


        </div>
    )
}


export default GameCreateForm