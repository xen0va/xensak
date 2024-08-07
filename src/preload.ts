// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  fetchGameList: () => ipcRenderer.invoke('load-game-list'),
  getShaderCount: (titleId:string) => ipcRenderer.invoke('get-shader-count', titleId),
  getTitleMeta: (titleId:string) => ipcRenderer.invoke('get-title-eshop-meta', titleId)
});