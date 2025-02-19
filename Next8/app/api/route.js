export async function GET() {
    return new Response("Hello")
}


export async function POST(request) {
    const data = await request.json()
    console.log(data)

    return Response.json({ msg: "message recieved" })
}