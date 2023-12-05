import './style.css'
import { FC } from 'react'
import { IUserColumnTitleProps } from './UserColumnTitleProps'
import anonimAvatar from '../../images/anonimAvatar.svg'

const UserColumnTitle: FC<IUserColumnTitleProps> = ({avatar, fullName, taskNumber}) => {
    return (
        <div className='userColumnTitle'>
            <div className='userColumnTitle__user'>
                <div className='userColumnTitle__user-avatar'>
                    <img src={avatar? avatar : anonimAvatar} alt="avatar" />
                </div>
                <div className='userColumnTitle__user-fullName'>{fullName}</div>
            </div>
            <div className='userColumnTitle__taskNumber'>{taskNumber}</div>
        </div>
    )
}

export default UserColumnTitle