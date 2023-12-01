import './style.css'
import { FC } from 'react'
import { IProgressColumnTitleProps } from './ProgressColumnTitleProps'
import { observer } from 'mobx-react-lite'

const ProgressColumnTitle: FC<IProgressColumnTitleProps> = ({title,taskNumber}) => {
    return (
        <div className='progressColumnTitle'>
            <div className='progressColumnTitle__title'>{title}</div>
            <div className='progressColumnTitle__taskNumber'>{taskNumber}</div>
        </div>
    )
}

export default observer(ProgressColumnTitle)