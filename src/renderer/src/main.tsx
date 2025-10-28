import './assets/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HashRouter, Routes, Route } from 'react-router'
import Layout from './structure/Layout'
import Earnings from './structure/Earnings/page'
import { ganancias, gestion, impacto, logistica, reportes, ventas } from './routes'
import MagamentMaterial from './structure/ManagementMaterial'
import Sells from './structure/Sells'
import AmbientImpact from './structure/AmbientImpact'
import Logistic from './structure/Logistic'
import Reports from './structure/Reports'

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

        <Route
          path={`/${ventas}`}
          element={
            <Layout>
              <Sells />
            </Layout>
          }
        />

        <Route
          path={`/${impacto}`}
          element={
            <Layout>
              <AmbientImpact />
            </Layout>
          }
        />

        <Route path={`/${reportes}`} element={<Reports />} />

        <Route
          path={`/${logistica}`}
          element={
            <Layout>
              <Logistic />
            </Layout>
          }
        />
      </Routes>
    </StrictMode>
  </HashRouter>
)
