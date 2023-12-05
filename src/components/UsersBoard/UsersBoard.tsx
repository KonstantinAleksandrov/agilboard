import './style.css'
import { FC , useEffect} from 'react'
import { UserColumn } from '../../containers'
import { observer } from 'mobx-react-lite'
import { useBoardStore } from '../../hooks'
import { UserColumnTitle } from '../UserColumnTitle'

const UsersBoard: FC = ({}) => {
    useEffect(()=>{
        boardStore.init()
    },[])

    const boardStore = useBoardStore()
    return (
        <div className='usersBoard'>
           {boardStore.getUsersColumns().map((column)=>{
                return (
                    <UserColumn userId={column.id} key={column.id}>
                        <UserColumnTitle 
                            taskNumber={column.tasks.length || 0} 
                            avatar={column.avatar} 
                            fullName={column.name}
                        />
                    </UserColumn>
                )
           })}
        </div>
    )
}

export default observer(UsersBoard)