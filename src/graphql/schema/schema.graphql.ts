export const typeDefs = `
    type Usuario {
        _id: ID
        nombre: String!
        email: String!
        password: String!
        deleted: Boolean
        created_at: String
        updated_at: String
        deleted_at: String   
    }
    type Kaiju {
        _id: ID
        nombre: String!
        altura: Float!
        peso: Float!
        deleted: Boolean
        created_at: String
        updated_at: String
        deleted_at: String
    }
    type GetToken {
        token: String
    }
    type Query {
        indexUsuarios: [Usuario]
        getUsuario(_id: ID!): Usuario
        indexKaijus: [Kaiju]
        getKaiju(_id: ID!): Kaiju
        getKaijuByName(nombre: String!): Kaiju
    }
    input UsuarioInput {
        nombre: String!
        email: String!
        password: String!
    }
    input KaijuInput {
        nombre: String!
        altura: Float!
        peso: Float!
    }
    input UsuarioUpdateInput {
        id: ID!
        nombre: String
        email: String
        password: String
    }
    input KaijuUpdateInput {
        id: ID!
        nombre: String
        altura: Float
        peso: Float
    }
    input UsuarioIDInput {
        id: ID!
    }
    input KaijuIDInput {
        id: ID!
    }
    input UsuarioLogin {
        email: String!
        password: String!
    }
    input WebHookInput {
        webHook: String!
    }
    type Mutation {
        createUsuario(usuario: UsuarioInput!): Usuario
        updateUsuario(usuario: UsuarioUpdateInput!): Usuario
        deleteUsuario(usuario: UsuarioIDInput!): Usuario
        createKaiju(kaiju: KaijuInput!): Kaiju
        updateKaiju(kaiju: KaijuUpdateInput!): Kaiju
        deleteKaiju(kaiju: KaijuIDInput!): Kaiju
        loginUsuario(usuario: UsuarioLogin): GetToken
        addUserWebHook(webHook: String!): String
    }
    `;