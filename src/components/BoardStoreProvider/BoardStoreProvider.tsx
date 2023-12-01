import { BoardContext } from "../../contexts"
import { PropsWithChildren, FC } from "react"
import { BoardStore } from "../../stores"
import { columns, tasks } from "../../data"

const BoardStoreProvider: FC<PropsWithChildren> = ({children}) => {
    const boardStore = new BoardStore(columns,tasks)

    return (
        <BoardContext.Provider value={boardStore}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardStoreProvider