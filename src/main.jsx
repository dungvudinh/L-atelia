import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import './i18n.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { BrowserRouter } from 'react-router-dom'
import PageTransition from './components/PageTransition/index.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PageTransition>
      <Provider store={store}>
        <App />
      </Provider>

    </PageTransition>
    </BrowserRouter>
  </StrictMode>,
)
