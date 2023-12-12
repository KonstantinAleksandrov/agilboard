import './style.css'
import { FC } from 'react'
import { ProgressBoard, UsersBoard } from '../../components'
import { boardTypes } from '../../types'
import { DropDownBoardList } from '..'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../../hooks'

const BoardLayout: FC = ({}) => {
    const boardStore = useRootStore().getPageBoardStore()
    const changeBoard = (e: React.ChangeEvent) => {
        const selectedElem = e.target as HTMLSelectElement;
        boardStore.setActiveBoard(selectedElem.value as boardTypes)
    }

    return (
        <div className='boardLayout'>
            <div className='boardLayout__title'>Board</div>
            <DropDownBoardList changeHandler={changeBoard}/>
           {/*  {boardStore.getActiveBoard() === 'users' ? <UsersBoard/> :  */}<ProgressBoard/>{/* } */}
        </div>
    )
}

export default observer(BoardLayout)