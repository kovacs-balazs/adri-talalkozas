import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        // Debug: ellenőrizd az env variable-t
        console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
        console.log("MONGODB_URI length:", process.env.MONGODB_URI?.length);
        console.log("MONGODB_URI starts with:", process.env.MONGODB_URI?.substring(0, 30));
        
        const body = await req.json();
        const { day, time } = body;

        const client = await clientPromise;
        const db = client.db("secretchatapp");

        await db.collection("meetings").insertOne({
            day,
            time,
            createdAt: new Date(),
        });

        return Response.json({ success: true });
    } catch (err) {
        console.error("API ERROR:", err);
        return Response.json(
            { success: false, error: String(err) },
            { status: 500 }
        );
    }
}