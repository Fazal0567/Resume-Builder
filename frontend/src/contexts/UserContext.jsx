import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const fetchUser = async() => {
      try{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile`,{
        credentials:'include'
      })
      const data = await res.json();
      if(res.ok){
        setUser(data)
      }
    }catch(error){  
      console.log(error.message)
    }
    }
    fetchUser()
  },[])

  return <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
