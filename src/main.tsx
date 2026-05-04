
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Home from './app/pages/Home/Home.tsx'
import { ApolloProvider } from '@apollo/client/react'
import { client } from './lib/apollo.ts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewOrder from './app/pages/NewOrders/NewOrder.tsx'

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/create" element={<NewOrder />} />
     </Routes>
    </BrowserRouter>
  </ApolloProvider>,
)
