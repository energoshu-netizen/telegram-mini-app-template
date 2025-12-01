import React from 'react'
import Layout from '../../components/layout/Layout'
import SimpleChart from '../../components/charts/SimpleChart'

export default function AnalyticsPage() {
  return (
    <Layout>
      <h2>Аналитика</h2>
      <SimpleChart points={[20, 10, 40, 30, 50, 35, 45]} />
    </Layout>
  )
}
