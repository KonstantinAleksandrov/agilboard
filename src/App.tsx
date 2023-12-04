import { BoardLayout } from './containers'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useBoardStore } from './hooks'

function App() {
  const boardStore = useBoardStore()

    useEffect(()=>{
      boardStore.init()
  },[])

  return (
    <>
     <BoardLayout/>
    </>
  )
}

export default observer(App)
