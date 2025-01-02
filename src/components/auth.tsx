import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { UserInfo } from 'remult'
import Todo from './todo'

export default function Auth() {
  const session = useSession()

  useEffect(() => {
    if (session.status === 'unauthenticated') signIn()
  }, [session])

  if (session.status !== 'authenticated') return <></>

  const user = session.data?.user as UserInfo

  return (
    <div>
      Hello {user?.name}{' '}
      <button onClick={() => signOut()}>Sign Out</button>
      <Todo />
    </div>
  )
}
