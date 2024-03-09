import "dotenv/config";
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {typeDefs} from "./graphql/schema/schema.graphql"
import {resolvers} from "./graphql/resolver/resolver.graphql"
import "./configs/db.config"
import {getToken} from "./middlewares/auth.middleware";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const PORT = parseInt(process.env.PORT || '3300');

(async () =>{
    const {url} = await startStandaloneServer(server,{
        context: async ({req}) => {
            try{
                const token = req.headers.authorization || '';

                return await getToken(token)
            }catch(e: any){

                return {}
            }
        },
        listen:{port:PORT}
    })
    console.log("server: ",url)
})();

console.log("server started")