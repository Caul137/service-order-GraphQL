
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './app/pages/Home/App.tsx'
import { ApolloProvider } from '@apollo/client/react'
import { client } from './lib/apollo.ts'

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
