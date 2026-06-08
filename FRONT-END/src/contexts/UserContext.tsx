import { createContext, useState, type ReactNode } from "react";
import type { userContextType } from "../types/User";

export const UserContext = createContext<userContextType>({
    user: null,
    setUser: () => {}
})

export const UserProvider = ({children} : {children : ReactNode}) =>{
    const [user, setUser] = useState()

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )      
}