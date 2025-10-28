import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { MainWorldApi } from './types'

// Custom APIs for renderer
const api: MainWorldApi = {
  getMaterials: () => ipcRenderer.invoke('get-materials'),
  getReportPdf: () => ipcRenderer.invoke('get-report-pdf'),
  insertMaterial: (material) => ipcRenderer.invoke('insert-material', material),
  getInventory: () => ipcRenderer.invoke('get-inventory'),
  getBuyers: () => ipcRenderer.invoke('get-buyers'),
  addSell: (sell) => ipcRenderer.invoke('add-sell', sell),
  getSells: () => ipcRenderer.invoke('get-sells'),
  markSellAsDelivered: (idVenta: number) => ipcRenderer.invoke('mark-sell-as-delivered', idVenta),
  createLogisticSend: (data: { id_venta: number; fecha_salida?: string }) =>
    ipcRenderer.invoke('create-logistic-send', data),

  updateDeliverDate: (id_envio: number, fecha_entrega: string) =>
    ipcRenderer.invoke('update-deliver-date', id_envio, fecha_entrega)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
