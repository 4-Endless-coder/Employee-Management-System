import React, { useState, useEffect } from 'react'

const Header = (props) => {

  const [username, setUsername] = useState('')

  useEffect(() => {

    if (props.data) {
      setUsername(props.data.firstName)
    } else {

      const adminData = localStorage.getItem('admin')
      if (adminData) {
        const admin = JSON.parse(adminData)

        if (admin && admin.length > 0) {
          setUsername(admin[0].firstName)
        }
      }
    }
  }, [props.data])

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    window.location.reload()
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white/10 shadow-lg">
          <span className="text-2xl font-bold text-white">
            {username ? username.charAt(0) : 'A'}
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="mb-1 text-xs font-medium tracking-wider text-white/70 uppercase">
            Welcome Back
          </h1>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl leading-none font-bold text-white">
              {username}
            </h2>

            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
              {props.data ? 'Employee' : 'Admin'}
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={logOutUser} 
        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-red-700 active:scale-95"
      >
        Log Out
      </button>
    </div>
  )
}

export default Header