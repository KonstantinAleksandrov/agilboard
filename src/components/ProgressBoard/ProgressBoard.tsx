import './style.css'
import { FC } from 'react'
import { Column } from '../../containers'
import { ProgressColumnTitle } from '../../components'
import { useBoardStore } from '../../hooks'
import { observer } from 'mobx-react-lite'

const ProgressBoard: FC = ({}) => {
    const boardStore = useBoardStore()

    return (
        <div className='progressBoard'>
            {boardStore.getProgressColumns().map((column)=>{
                return (
                    <Column key={column.id} columnId={column.id}>
                        <ProgressColumnTitle title={column.title} taskNumber={column.tasks?.length || 0}/>
                    </Column>
                )
            })}
        </div>
    )
}

export default observer(ProgressBoard)