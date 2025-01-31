import { auth } from "@/auth"


async function Dasboardpage() {
 const session = await auth()
  return (
    <div>
      <h1>halaman dasboard</h1>
      <p>{session?.user?.name}</p>
    </div>
  )
}

export default Dasboardpage
