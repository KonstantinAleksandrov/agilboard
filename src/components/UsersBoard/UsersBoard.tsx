import './style.css'
import { FC } from 'react'
import { Column } from '../../containers'
import { observer } from 'mobx-react-lite'

const UsersBoard: FC = ({}) => {
    return (
        <div className='usersBoard'>
            <Column>user 1 </Column>
            <Column>user 2 </Column>
            <Column>user 3 </Column>
            <Column>user 4 </Column>
        </div>
    )
}

export default observer(UsersBoard)