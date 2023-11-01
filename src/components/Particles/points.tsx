"use client"
import Particles from "react-tsparticles";
import {useCallback} from "react";
import {loadFull} from "tsparticles";
import {useTheme} from "next-themes";

export default function PointsParticles() {
    const particlesInit = useCallback(async (engine: any) => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);
    const {theme, setTheme} = useTheme()

    const isDarkTheme = theme === 'dark';
    
    let isMobile = true;
    if (typeof window !== "undefined") {
        isMobile = window.innerWidth <= 900;
    }
    
    return (
        <div id='particle-background' className={"absolute"}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    autoPlay: true,
                    backgroundMode: {
                        enable: true,
                        zIndex: -1
                    },
                    particles: {
                        number: {
                            value: isMobile ? 50 : 120,
                        },
                        links: {
                            enable: true,
                            color: isDarkTheme ? '#fff' : '#9a9898',
                        },
                        move: {
                            enable: true,
                            speed: 2
                        },
                        color: {
                            value: "#339966"
                        }
                    },
                }}
            />
        </div>
    )
}