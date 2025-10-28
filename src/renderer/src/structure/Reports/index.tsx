import React, { Fragment } from 'react'
import Layout from '../Layout'
import { savePDF } from '@renderer/helpers/files'

export default function Reports(): React.JSX.Element {
  return (
    <Layout>
      <Fragment>
        <button onClick={()=>savePDF()}>Save report</button>
        <p>Reports</p>
      </Fragment>
    </Layout>
  )
}
