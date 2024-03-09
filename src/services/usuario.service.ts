import {UsuarioType} from "../types/usuario.type";
import {Usuario} from "../models/usuario.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {GraphQLError} from "graphql";
import 'dotenv/config';


export class UsuarioService {
    static async getUsuarios() {
        return Usuario.find({deleted: false});
    }
    static async getUsuario(id: string) {
        return Usuario.find({_id: id, deleted: false});
    }
    static async createUsuario(usuario: UsuarioType) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
        return Usuario.create(usuario);
    }
    static async updateUsuario(id: string, usuario: UsuarioType) {
        return Usuario.findByIdAndUpdate(id);
    }
    static async deleteUsuario(id: string) {
        return Usuario.findByIdAndUpdate(id, {deleted: true});
    }

    static async loginUsuario(email: string, password: string){
        let isPassword = false;
        const result = await Usuario.findOne({email: email, deleted: false});
        if (result) {
            isPassword = bcrypt.compareSync(password, result.password);
        } else {
            throw new GraphQLError('password or email incorrect', {
                extensions: {
                    code: 'not found',
                },
            });
        }
        if (isPassword) {
            const anotherResult=result
            const token = jwt.sign({anotherResult}, process.env.SECRET!);
            return {token}
        }
    }

}