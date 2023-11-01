'use client'

import styles from "./home.module.css";
import {ArrowRight, MoveRight, PlayCircle, PlayIcon} from "lucide-react";
import Link from "next/link";
import PointsParticles from "@/components/Particles/points";


export default function Home() {
    return (
        <>
            <PointsParticles />
            <section className="relatve h-full flex justify-center items-center">
                <div className="mx-auto mb-12 w-full max-w-3xl text-center md:mb-16 lg:mb-20">
                    <h1 className="mb-4 text-[60px] leading-[1.2em] font-semibold text-black dark:text-white ">Comptez les points de vos jeux sur <span className={`bg-cover bg-center px-4 text-white ${styles.bgText}`}>RScores</span>.</h1>
                    <div className="flex justify-center">
                        <Link href="/games" className="mr-5 flex rounded-xl bg-black px-6  py-4 text-center font-semibold text-white [box-shadow:rgb(51,153,102)_6px_6px] mt-5">{"Créer ma partie"} <MoveRight className={"ml-2"} /></Link>
                    </div>
                </div>
            </section>
        </>
       
    )
}
