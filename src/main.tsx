import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './common.css'
import { BoadrStoreProvider } from './components';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root')!).render(
      <BoadrStoreProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </BoadrStoreProvider>
)
