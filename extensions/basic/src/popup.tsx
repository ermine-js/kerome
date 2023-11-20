import { createRoot } from 'react-dom/client'
import App from './app'

const container = document.getElementById('popup')
if (!container) throw new Error('No sandbox container found')

const root = createRoot(container)
root.render(<App />)
