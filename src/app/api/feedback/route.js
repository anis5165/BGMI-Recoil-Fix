import connectDB from "@/lib/dbconnect";
import feed from "@/models/feedbackModel";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        await connectDB();
        const {name, location, feedback } = await request.json();
        new feed({name, location, feedback}).save();
        return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 201 });
    }
    catch(error) {
        console.error("Error connecting to the database: ", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectDB();
        const feedbacks = await feed.find({});
        return NextResponse.json(feedbacks, { status: 200 });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }
}