import './style.css'
import { FC , useEffect} from 'react'
import { ProcessColumn } from '../../containers'
import { ProgressColumnTitle } from '../../components'
import { useBoardStore } from '../../hooks'
import { observer } from 'mobx-react-lite'

const ProgressBoard: FC = ({}) => {
    useEffect(()=>{
        boardStore.init()
    },[])

    const boardStore = useBoardStore()

    return (
        <div className='progressBoard'>
            {boardStore.getProgressColumns().map((column)=>{
                return (
                    <ProcessColumn key={column.id} columnId={column.id}>
                        <ProgressColumnTitle title={column.title} taskNumber={column.tasks.length || 0}/>
                    </ProcessColumn>
                )
            })}
        </div>
    )
}

export default observer(ProgressBoard)