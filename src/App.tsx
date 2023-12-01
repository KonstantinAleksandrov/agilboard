import { BoardLayout } from './containers'
import { observer } from 'mobx-react-lite'

function App() {

  return (
    <>
     <BoardLayout/>
    </>
  )
}

export default observer(App)
