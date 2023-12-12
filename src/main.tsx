import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './common.css'
import { RootStoreProvider } from './components';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root')!).render(
      <RootStoreProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </RootStoreProvider>
)
