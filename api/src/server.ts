import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from 'cors'
import express from 'express'

const portGQL = 4000


const typeDefs = `#graphql
  type Query {
    hello: String
    teste: String
  }
`
const resolvers = { 
    Query: {
        hello: () => 'Hello world!',
        teste: () => 'Teste'
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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(portGQL, () => {
    console.log(`Server is running on http://localhost:${portGQL}`);
    console.log(`GraphQL server is running on http://localhost:${portGQL}/graphql`);
    })
}

startServer()





