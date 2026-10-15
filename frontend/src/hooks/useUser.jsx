import { createContext, useContext, useEffect, useState } from "react";


const UserContext=createContext(null);

export const UserProvider=({children})=>{

const [user,setUser]=useState(null)

const logOut=()=>{
  localStorage.removeItem("user");
  localStorage.removeItem("expirationTime")
}

useEffect=(()=>{
  const storedUser=parse(localStorage.getItem("user"));
  const expirationTime=parse(localStorage.getItem("expirationTime"));

  if(storedUser&&expirationTime){

     const currrentTime= new Date().getTime();
     
     if(currrentTime<expirationTime){
      setUser(storedUser);
     }
     else{
      logOut();
     }
  }
},[])

const login=(userData,expiresIn)=>{
  const expiratationTime= new Date().getTime()+expiresIn*1000;

  localStorage.setItem("expirationTime",expiratationTime.toString());
  localStorage.setItem("user",JSON.stringify(userData));
  setUser(userData);
}

return (
  <UserContext.Provider value={{user,setUser,login}}>
    {children}
  </UserContext.Provider>
);
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};

export default UserContext;