import { BoardLayout } from './components'
import { observer } from 'mobx-react-lite'

function App() {
  return (
    <>
     <BoardLayout/>
    </>
  )
}

export default observer(App)
