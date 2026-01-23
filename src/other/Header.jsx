import React, { useEffect, useState } from 'react'

const Header = () => {
  const [username, setUsername] = useState('Admin')
  const [role, setRole] = useState('Admin')

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser)
        setUsername(parsedUser.data.firstName)
        setRole(parsedUser.role === 'admin' ? 'Admin' : 'Employee')
      } catch (error) {
        console.error('Invalid loggedInUser data', error)
      }
    }
  }, [])

  const logOutUser = () => {
    localStorage.removeItem('loggedInUser')
    window.location.reload()
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 bg-white/10">
          <span className="text-2xl font-bold text-white">
            {username?.charAt(0)}
          </span>
        </div>

        <div>
          <h1 className="text-xs uppercase text-white/70">
            Welcome Back
          </h1>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">
              {username} 👋
            </h2>

            <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs font-semibold text-white">
              {role}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={logOutUser}
        className="rounded-lg bg-red-600 px-5 py-2 text-sm text-white hover:bg-red-700"
      >
        Log Out
      </button>
    </div>
  )
}

export default Header
