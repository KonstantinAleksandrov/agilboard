import { useContext } from 'react'
import { BoardContext } from '../contexts'


export const useBoardStore = () => {
    const boardContext = useContext(BoardContext)
    return boardContext
}