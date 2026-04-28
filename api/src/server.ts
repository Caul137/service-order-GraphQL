import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from 'cors'
import express from 'express'

const portGQL = 4000


const typeDefs = `#graphql
  type Service {
    id: ID
    title: String
    description: String
    status: String
    createdAt: String
  }

  type Query {
  service: [Service]
  }
`
const resolvers = { 
    Query: {
        service: () => {
            return [
              {id: 1, title: "Service 1", description: "Description of Service 1", status: "active", createdAt: "2024-06-01"},
            ]
        }
     }
}

async function startServer() {

const app = express()
app.use(cors())

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start() 


app.use('/graphql', express.json(), expressMiddleware(server))

app.listen(portGQL, () => {
    console.log(`GraphQL server is running on http://localhost:${portGQL}/graphql`);
    })
}

startServer()





