import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
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