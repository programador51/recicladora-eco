import './assets/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HashRouter, Routes, Route } from 'react-router'
import Layout from './structure/Layout'
import Earnings from './structure/Earnings/page'
import { ganancias, gestion } from './routes'
import MagamentMaterial from './structure/ManagementMaterial'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path={`/${ganancias}`}
          element={
            <Layout>
              <Earnings />
            </Layout>
          }
        />

        <Route
          path={`/${gestion}`}
          element={
            <Layout>
              <MagamentMaterial />
            </Layout>
          }
        />
      </Routes>
    </StrictMode>
  </HashRouter>
)
