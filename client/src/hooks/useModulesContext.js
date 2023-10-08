import { ModulesContext } from '../context/ModuleContext'
import { useContext } from 'react'

export const useModulesContext = () => {
  const context = useContext(ModulesContext)

  if (!context) {
    throw Error('useModulesContext must be used inside an ModulesContextProvider')
  }

  return context
}