import { Sign } from "crypto"
import Login from "../components/Login"
import Navbar from "../components/Navbar"
import Signup from "../components/Signup"

const page = () => {
  return (
    <div>
      <Navbar />
      <Signup />

    </div>
  )
}
export default page