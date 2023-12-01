import './style.css'
import { FC, useState } from 'react'
import { ProgressBoard, UsersBoard } from '../../components'
import { boardTypes } from '../../types'
import { DropDownBoardList } from '..'
import { observer } from 'mobx-react-lite'

const BoardLayout: FC = ({}) => {
    const [boardType,setBoardType] = useState<boardTypes>('type')

    const changeBoard = (e: React.ChangeEvent) => {
        const selectedElem = e.target as HTMLSelectElement;
        setBoardType(selectedElem.value as boardTypes)
    }

    return (
        <div className='boardLayout'>
            <div className='boardLayout__title'>Board</div>
            <DropDownBoardList currentType={boardType} changeHandler={changeBoard}/>
            {boardType === 'users' ? <UsersBoard/> : <ProgressBoard/>}
        </div>
    )
}

export default observer(BoardLayout)