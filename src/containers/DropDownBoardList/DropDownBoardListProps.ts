import { boardTypes } from "../../types"

export interface IDropDownBoardListProps{
    currentType: boardTypes,
    changeHandler: (e: React.ChangeEvent) => void
}