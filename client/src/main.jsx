import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { UserContextProvider } from './context/user-context.jsx';
import Layout from './components/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Layout>
          <App />
        </Layout>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
