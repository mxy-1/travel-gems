import { getLocationById } from "@/lib/data"
import { connectToDatabase } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {

    const { id } = params

    try {
        connectToDatabase()
        const location = await getLocationById(id)
        return NextResponse.json(location)
    } catch (err) {
        throw new Error("Failed to fetch location by ID")
    }
}