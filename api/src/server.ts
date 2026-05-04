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
  services: [Service]
  }

  type Mutation {
    createService(
      title: String!
      description: String!
      status: String
      ): Service 
  }
`

let services: any[] = []

const resolvers = { 
    Query: {
        services: () => services
     },

     Mutation: {
        createService: (_: any, args: any) => {
          const newService = {
            id: crypto.randomUUID(),
            title: args.title,
            description: args.description,
            status: "Open",
            createdAt: new Date().toISOString(),
          }
          services.push(newService)
          return newService
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





