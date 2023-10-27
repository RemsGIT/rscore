import GameCard from "@/components/gameCard/gameCard";

const Games = () => {
    return (
        <section className={"pt-8 w-[90%] md:w-[60%] mx-auto grid grid-cols-2 md:flex gap-4"}>
           <GameCard game={{id: 1,name: 'Skyjo', image: 'skyjo.png'}} />
           <GameCard game={{id: 2,name: '6 qui prend !', image: '6quiprend.png'}} />
        </section>
    )
}

export default Games