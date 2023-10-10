import { GroupsContext } from '../context/GroupsContext'
import { useContext } from 'react'

export const useGroupsContext = () => {
  const context = useContext(GroupsContext)

  if (!context) {
    throw Error('useGroupsContext must be used inside an GroupsContextProvider')
  }

  return context
}