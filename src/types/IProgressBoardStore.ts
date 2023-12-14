import { IColumn } from './IColumn';
import { IBoardStore } from './IBoardStore';

export interface IProgressBoardStore extends IBoardStore {
  getColumns: () => IColumn[];
  getColumnById: (id: number) => IColumn | undefined;
}
