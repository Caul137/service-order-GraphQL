import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from 'cors'
import express from 'express'
import { prisma } from "./lib/prisma";

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
    deleteService(id: ID!): Boolean
  }

  
`


const resolvers = { 
    Query: {
        services: async () => {
          return await prisma.service.findMany()
        }
     },

     Mutation: {
         createService: async (_: any, args: any) => {
           return await prisma.service.create({
            data: {
             id: crypto.randomUUID(),
             title: args.title,
             description: args.description,
             status: "Open",
             createdAt: new Date().toISOString(),
            }
           })
         },
         deleteService: async (_: any, args: any) => {
          return await prisma.service.delete({
            where: {
              id: args.id
            }
          })
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
