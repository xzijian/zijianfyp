import { createContext, useReducer } from 'react'

export const ModulesContext = createContext()

export const modulesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODULE': 
      return {
        modules: action.payload
      }
    case 'CREATE_MODULE':
      return {
        modules: [ ...state.modules,action.payload]
      }
    case 'DELETE_MODULE':
      return {
        modules: state.modules.filter((w) => w._id !== action.payload._id)
      }
    case 'SET_POSTS':
      return {
        posts: action.payload[0],
        students: action.payload[1].students,
      }
    case 'ADD_POST':
      return {
        posts: [action.payload, ...state.posts]
      }
    case 'DELETE_POST':
      return {
        posts: action.payload
      }
    case 'ADD_COMMENT':
      return {
        posts: action.payload
      }
    default:
      return state
  }
}

export const ModulesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modulesReducer, {
    modules: null,
    posts: null,
    students: null,
    comments: null
  })

  return (
    <ModulesContext.Provider value={{...state, dispatch}}>
      { children }
    </ModulesContext.Provider>
  )
}