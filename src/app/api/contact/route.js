import connectDB from "@/lib/dbconnect";
import contact from "@/models/contactModel";
import { NextResponse } from "next/server";


export async function POST(request) {
    try{
        await connectDB();
        const {name, email, message} = await request.json();
        new contact({name, email, message}).save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    }
    catch(error){
        console.error("Error connecting to the database : ", error)
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectDB();
        const contacts = await contact.find({});
        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}