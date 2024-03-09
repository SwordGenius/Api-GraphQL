import {UsuarioService} from "../../services/usuario.service";
import {KaijuService} from "../../services/kaiju.service";
import {Usuario} from "../../models/usuario.model";
import axios from "axios";

export const resolvers = {
    Query: {
        indexUsuarios: async () => {
            return UsuarioService.getUsuarios();
        },
        indexKaijus: async () => {
            return KaijuService.getKaijus();
        },
        getKaiju: async (_: void, {id}: any) => {
            return KaijuService.getKaiju(id);
        },
        getKaijuByName: async (_: void, {kaiju}: any) => {
            return KaijuService.getKaijuByName(kaiju.nombre);
        },
        getUsuario: async (_: void, {id}: any) => {
            return UsuarioService.getUsuario(id);
        },
    },
    Mutation: {
        createUsuario: async (_: void, {usuario}: any) => {
            return UsuarioService.createUsuario(usuario);
        },
        createKaiju: async (_: void, {kaiju}: any) => {
            await answerWebHoks("createKaiju", {
                ...kaiju
            })
            return KaijuService.createKaiju(kaiju);
        },
        updateUsuario: async (_: void, {usuario}: any, {id}: any) => {
            return UsuarioService.updateUsuario(id, usuario);
        },
        deleteUsuario: async (_: void, {id}: any) => {
            return UsuarioService.deleteUsuario(id);
        },
        loginUsuario: async (_: void, {usuario}: any) => {
            return UsuarioService.loginUsuario(usuario.email, usuario.password);
        },
        updateKaiju: async (_: void, {kaiju}: any, {id}: any) => {
            return KaijuService.updateKaiju(id, kaiju);
        },
        deleteKaiju: async (_: void, {id}: any) => {
            return KaijuService.deleteKaiju(id);
        },
        addUserWebHook:async(_:void, {webHook}:any,contextValue:any)=>{

            if(contextValue._id){
                try{
                    const userall=await Usuario.findById({_id:contextValue._id})


                    console.log(userall?.webHooks)
                    await Usuario.updateOne({_id:contextValue._id},
                        {$set:{webHokes:[
                                    ...userall?.webHooks as [],
                                    {webHook:webHook.webHook,url:webHook.url}

                                ]}})



                    return "webHook agregado"
                }catch(e){
                    console.log(e)
                }

            }
            throw new Error("no autorizado")

        }
    }
}

const answerWebHoks=async(webHokesname:string,data:any)=>{
    const users=await Usuario.find()
    for (let i = 0; i < users.length; i++) {
        let element=users[i]
        element.webHooks.map(async(web:any)=>{
            if((web.webHook as string).toLowerCase()==webHokesname.toLowerCase()){
                await axios.post(web.url, data)
            }
        })
    }

}
