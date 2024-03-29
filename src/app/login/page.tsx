import { login, signup } from './actions'

export default function LoginPage() {
   return (
      <form className='space-y-8'>
         <div className='flex flex-col items-start'>
            <label htmlFor='email'>Email:</label>
            <input
               id='email'
               name='email'
               type='email'
               required
               className='text-black'
            />
         </div>

         <div className='flex flex-col items-start'>
            <label htmlFor='password'>Password:</label>
            <input
               id='password'
               name='password'
               type='password'
               required
               className='text-black'
            />
         </div>

         <button className='px-2 py-1 border' formAction={login}>
            Log in
         </button>
         <button className='px-2 py-1 border ml-4' formAction={signup}>
            Sign up
         </button>
      </form>
   )
}
