"use client"
import {ChangeEvent, useEffect, useState} from "react";

import styles from "./countSlider.module.css";

const CountSlider = ({handleChangeNumber}: {handleChangeNumber: (nb: number) => void}) => {

    const [totalParticipant, setTotalParticipant] = useState<number>(2)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTotalParticipant(+e.target.value)
    }

    useEffect(() => {
        handleChangeNumber(totalParticipant)
    }, [totalParticipant]);
    
    return (
        <>
            <div className={styles.value_container}>
                <h3 className={styles.value}>{totalParticipant}</h3>
                <p className={"text-center pb-5"}>joueurs</p>
            </div>

            <input type="range" min="2" max="15" step="1" value={totalParticipant} className={styles.input} onChange={handleChange}/>
        </>
    )
}

export default CountSlider