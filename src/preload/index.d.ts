import { ElectronAPI } from '@electron-toolkit/preload'
import { MainWorldApi } from '../preload/types'
declare global {
  interface Window {
    electron: ElectronAPI
    api: MainWorldApi;
  }
}
