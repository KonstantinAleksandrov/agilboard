import { BoardContext } from "../../contexts"
import { PropsWithChildren, FC } from "react"
import { BoardStore } from "../../stores"
import { columns, tasks, users } from "../../data"

const BoardStoreProvider: FC<PropsWithChildren> = ({children}) => {
    const boardStore = new BoardStore(columns,tasks,users)

    return (
        <BoardContext.Provider value={boardStore}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardStoreProvider