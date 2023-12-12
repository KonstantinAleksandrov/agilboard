import { useContext } from 'react'
import { RootContext } from '../contexts'


export const useRootStore = () => {
    const rootContext = useContext(RootContext)
    return rootContext
}