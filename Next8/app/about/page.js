"use client"

import { redirect } from "next/navigation"

export default function Home() {

    function goHome() {
        redirect("/")
    }

    return (
        <div>
            <h1>About Page</h1>
            <p>The goal at <code>Citron Inc</code> is to empower <b>Skilled</b> youths with <b>information</b> so they can be useful to themselves</p>
            <p>At <code>Citron Inc</code> if you possess the skills, you are ever welcome. Our gates are wide open for you. Intelligence over mediocrity, we need you.</p>
            <p>Click button below to navigate to the <b>Home Page</b></p>
            <button onClick={goHome}>Go Home</button>
            <h3>Gallerier</h3>
            <p>Below is a picture of our CEO <b>Dietake Obaro Daniel</b></p>
            <img src="profile.jpeg" alt="" />
        </div>
    )
}