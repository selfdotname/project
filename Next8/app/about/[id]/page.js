export default async function Home({ params }) {
    const { id } = await params

    return (
        <div>
            <h1>About {id}</h1>
        </div>
    )
}