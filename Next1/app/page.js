"use client"

export default function Home() {
  function sendReq() {
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({name: "Obaro"})
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <button onClick={sendReq}>Send Request</button>
    </div>
  );
}
