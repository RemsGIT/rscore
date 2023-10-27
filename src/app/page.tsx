'use client'
import {Button} from "@nextui-org/button";
import {useTheme} from "next-themes";
import {useEffect} from "react";


export default function Home() {
    const {theme, setTheme} = useTheme()

  return (
    <main>
        <Button color={"primary"} onClick={() => setTheme('light')}>Light</Button>
        <Button color={"secondary"} onClick={() => setTheme('dark')}>Dark</Button>
    </main>
  )
}
