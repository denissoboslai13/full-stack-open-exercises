import { createContext, useReducer } from "react"

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `Created '${action.payload}'`
    case 'VOTE':
      return `Anecdote '${action.payload}' voted`
    case 'CLEAR':
      return null
    case 'ERROR':
      return 'Anecdote too short, must be atleast 5 characters long'
    default:
      return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
    const [notif, notifDispatch] = useReducer(notifReducer, null)
    
    return (
        <NotifContext.Provider value={{ notif, notifDispatch }}>
            {props.children}
        </NotifContext.Provider>
    )
}

export default NotifContext