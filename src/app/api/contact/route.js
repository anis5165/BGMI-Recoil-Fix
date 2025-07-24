import connectDB from "@/lib/dbconnect";
import contact from "@/models/contactModel"
import { NextResponse } from "next/server";


export async function POST(request) {
    try{
        await connectDB();
        const {name, email, message} = await request.json();
        new userAgent({name, email, message}).save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    }
    catch(error){
        console.error("Error connecting to the database : ", error)
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}