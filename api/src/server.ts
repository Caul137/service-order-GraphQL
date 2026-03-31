import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


async function start() {const typeDefs = `#graphql
     type Query {
        hello: String
    
     }
    `;

const resolvers = {
    Query: {
        hello: () => "Hello world!",
      
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const {url } = await startStandaloneServer(server, {
    listen: {port: 4000}
})

 console.log(`🚀 Server rodando em ${url}`);


}

start()
