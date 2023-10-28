import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const data = await prisma.game.findMany();


    const url = new URL(request.url)

    const slug = url.searchParams.get('slug')
    
    if(slug) {
        const game = await prisma.game.findFirst({
            where: {
                //@ts-ignore
                slug: slug
            }
        })
        
        return NextResponse.json({
            success: true,
            game
        })
    }
    else {
        return NextResponse.json({
            success: true,
            games: data
        })
    }

}