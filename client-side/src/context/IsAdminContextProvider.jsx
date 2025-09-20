import React from "react";
import isAdminContext from './isAdminContext'

const IsAdminContextProvider = ({children}) => {
    const LocalData = JSON.parse(localStorage.getItem("Admin Status"))
    
    const [isAdmin, setisAdmin] = React.useState(false)
    

    return(
        <isAdminContext.Provider value={{isAdmin, setisAdmin}}>
        {children}
        </isAdminContext.Provider>
    )
}

export default IsAdminContextProvider