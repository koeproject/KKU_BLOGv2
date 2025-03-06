"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result && result.error) {
        console.error(result.error)
      } else {
        router.push('/profile')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="bg-[#1f2021] p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-24 flex flex-col items-center justify-center ">
      
      <form onSubmit={handleSubmit} className="gap-3 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold  text-center">Login</h2>

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

          
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white" >
              Login
            </button>{' '}
          
        </form>

        

          
      </div>
  )
}
export default Login


