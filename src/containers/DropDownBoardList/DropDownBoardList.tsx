import './style.css';
import { FC } from 'react';
import { IDropDownBoardListProps } from './DropDownBoardListProps';
import { useRootStore } from '../../hooks';
import { observer } from 'mobx-react-lite';

const DropDownBoardList: FC<IDropDownBoardListProps> = ({ changeHandler }) => {
  const pageBoardStore = useRootStore().getPageBoardStore();

  return (
    <div className='dropDownBoardList'>
      <select className={`dropdown__select`} onChange={changeHandler}>
        {pageBoardStore.getBoardTypes().map((boardType) => {
          return (
            <option value={boardType} className='dropdown__option' key={boardType}>
              {boardType}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default observer(DropDownBoardList);
