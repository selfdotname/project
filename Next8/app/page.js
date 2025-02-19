
"use client"

import Link from "next/link"
import Button from "@/components/Button"

export default function Home() {

  async function sendRequest() {
    try {
      const res = await fetch("/api",
        {
          method: "POST",
          body: JSON.stringify({ email: "johndoe@gmail.com", amount: 25000 })
        })
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
      <h1>Home Page</h1>
      <p>click button to send a equest to the server</p>
      {/* html button */}
      <button onClick={sendRequest}>send request</button>
      {/* Component button */}
      <Button sendRequest={sendRequest}>Howdy</Button>
    </div>
  );
}
