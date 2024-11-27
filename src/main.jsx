import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {Home} from './Home/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
