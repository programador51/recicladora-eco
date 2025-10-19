import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { MainWorldApi } from './types'


// Custom APIs for renderer
const api:MainWorldApi = {
  getMaterials: () => ipcRenderer.invoke('get-materials'),
  insertMaterial: (material) => ipcRenderer.invoke('insert-material', material)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

  console.log({data:process.contextIsolated})

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
