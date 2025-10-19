import Layout from './structure/Layout'

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  // ipcHandle()

  return <Layout>{<p>Home</p>}</Layout>
}

export default App
