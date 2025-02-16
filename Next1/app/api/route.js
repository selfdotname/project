export async function GET() {
    return Response.json({
        msg: "GET request"
    })
}

export async function POST(request) {
    const data = await request.json()
    return Response.json({
        data
    })
}