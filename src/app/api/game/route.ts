import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const data = await prisma.game.findMany();


    const url = new URL(request.url)

    const id = url.searchParams.get('id')
    
    if(id) {

        const game = await prisma.game.findUnique({
            where: {id}
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