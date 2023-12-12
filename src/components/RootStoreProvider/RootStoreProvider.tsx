import { RootContext } from "../../contexts"
import { PropsWithChildren, FC } from "react"
import { RootStore, TasksStore, UsersStore, PageBoardStore, ProgressBoardStore, UsersBoardStore } from "../../stores"

const RootStoreProvider: FC<PropsWithChildren> = ({children}) => {
    const rootStore = new RootStore(
        new TasksStore(),
        new UsersStore(),
        new PageBoardStore(new ProgressBoardStore(),new UsersBoardStore())
    )

    return (
        <RootContext.Provider value={rootStore}>
            {children}
        </RootContext.Provider>
    )
}

export default RootStoreProvider