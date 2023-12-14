import './style.css';
import { FC } from 'react';
import { ProgressBoard, UsersBoard } from '../../containers';
import { boardTypes } from '../../types';
import { DropDownBoardList } from '../../containers';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../hooks';

//компонет страницы с доской
const BoardLayout: FC = ({}) => {
  const boardStore = useRootStore().getPageBoardStore();

  // выбираем какую доску покаать
  const changeBoard = (e: React.ChangeEvent) => {
    const selectedElem = e.target as HTMLSelectElement;
    boardStore.setActiveBoard(selectedElem.value as boardTypes);
  };

  return (
    <div className='boardLayout'>
      <div className='boardLayout__title'>Board</div>
      <DropDownBoardList changeHandler={changeBoard} />
      <div className='boardLayout__board'>{boardStore.getActiveBoard() === 'users' ? <UsersBoard /> : <ProgressBoard />}</div>
    </div>
  );
};

export default observer(BoardLayout);
