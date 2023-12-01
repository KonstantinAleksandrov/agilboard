import './style.css'
import { FC, useEffect } from 'react'
import { Column } from '../../containers'
import { ProgressColumnTitle } from '../../components'
import { useBoardStore } from '../../hooks'
import { observer } from 'mobx-react-lite'

const ProgressBoard: FC = ({}) => {
    const boardStore = useBoardStore()
    useEffect(()=>{
        boardStore.setTaskCounter()
    },[])

    return (
        <div className='progressBoard'>
            {boardStore.getProgressColumns().map((column)=>{
                return (
                    <Column key={column.id} columnId={column.id}>
                        <ProgressColumnTitle title={column.title} taskNumber={column.taskCounter}/>
                    </Column>
                )
            })}
        </div>
    )
}

export default observer(ProgressBoard)