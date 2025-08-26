"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

function UserDetails() {
  const { data:session, status } = useSession()
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (session) {
    return (
      <div>
        <p>User ID: <strong>{(session.user as {id : string}).id}</strong></p> 
        <p>User Name: <strong>{session.user?.name}</strong></p> 
        <p>Signed in as: <strong>{session.user?.email}</strong></p>
        <button
        className='bg-red-500 p-2 rounded-2xl cursor-pointer'
        onClick={()=>{signOut()}}>SignOut</button>
      </div>
    )
  }

  return <div>
    <p>Not Signed In.</p>
    <button 
    className='bg-green-500 p-2 rounded-2xl cursor-pointer'
    onClick={()=>{signIn()}}>SignIn</button>
  </div>
}

export default UserDetails