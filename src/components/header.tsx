"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {useTheme} from "next-themes";
import {MoonStar, Sun} from "lucide-react";
import {Image} from "@nextui-org/react";
import {useEffect, useState} from "react";
import Link from "next/link";

const Header = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const {theme, setTheme} = useTheme()


    useEffect(() => {
        setIsMounted(true)
    }, []);
    
    return (
        <Navbar isBordered={true} className="transition-all duration-500 bg-gray-200 dark:bg-gray-800">
            <NavbarBrand>
                <Link href={'/games'}>
                    <Image src={"/assets/images/logo.png"} width={50} height={50} alt={"aaaaa"}/>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="center">
                <NavbarItem className={"text-green-700 dark:text-green-500 font-bold text-xl font-agbalumo"}>
                    <Link href={'/games'}>
                        RScores
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="" justify="end">
                
                {isMounted && theme === 'light' ? <Sun onClick={() => setTheme('dark')} /> : <MoonStar onClick={() => setTheme('light')}/>}

            </NavbarContent>
        </Navbar>
    )
}

export default Header