let token = null

const STORAGE_KEY = "logged"

const setUser = (user)=>{
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    token = user.token
}

const getUser = ()=>{ 
    const loggedUser = window.localStorage.getItem(STORAGE_KEY)
    if(loggedUser){
    const user = JSON.parse(loggedUser)
    token = user.token
    return token
    }
   
    return null
}

const clearUser = ()=>{
    localStorage.clear()
    token = null
}

const getToken = ()=> token

const getUserName = ()=>{
    const storage = window.localStorage.getItem(STORAGE_KEY)
    if(storage){
        const user = JSON.parse(storage)
        return user.username
    }
}

export default {
    setUser,
    getUser,
    clearUser,
    getToken,
    getUserName
}