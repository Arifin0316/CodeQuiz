import { useFormStatus } from "react-dom";

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
    type="submit"
    disabled={pending}
    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
  >
    {pending ? "Mendaftar..." : "Daftar"}
  </button>
  )
}

export const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
    type="submit"
    disabled={pending}
    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
  >
    {pending ? "login..." : "login"}
  </button>
  )
}

