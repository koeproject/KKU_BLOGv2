"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Signup = () => {
    const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(password !== confirmpassword){
      alert('password not match')
    } else {
    try {
        await axios.post('/api/auth/signup', { email, password, username })
        router.push('/login')
      } catch (error) {
      console.log('error', error)
    }
  }
}

  return (
    <div className="bg-[#1f2021] p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-24 flex flex-col items-center justify-center ">
      
      <form onSubmit={handleSubmit} className="gap-3 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold  text-center">Sign Up</h2>
        <input
        id="username"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
          placeholder="Username"
          className="bg-[#252627] text-white w-full  px-4 py-2 rounded-lg focus:outline-none"
        />
        <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
          placeholder="Email"
          className="bg-[#252627] text-white w-full  px-4 py-2 rounded-lg focus:outline-none"
        />
         <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password"
          className="bg-[#252627] text-white w-full  px-4 py-2 rounded-lg focus:outline-none"
        />
        <input
          id="confirmpassword"
          type="password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
          placeholder="confirm password"
          className="bg-[#252627] text-white w-full  px-4 py-2 rounded-lg focus:outline-none"
        />

          
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white" >
              Sign Up
            </button>{' '}
          
        </form>

        

          
      </div>
  )
}
export default Signup


