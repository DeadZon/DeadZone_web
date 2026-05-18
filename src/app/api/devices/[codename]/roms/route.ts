import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const roms = await prisma.rom.findMany({
            where: {
                deviceId: params.id,
            },
            orderBy: {
                version: "desc",
            },
        });

        return NextResponse.json(roms);
    } catch (error) {
        console.error("Device ROMs fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch ROMs" }, { status: 500 });
    }
}
