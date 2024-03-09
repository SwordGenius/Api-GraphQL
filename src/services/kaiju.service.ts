import { KaijuType} from "../types/kaiju.type";
import { Kaiju } from "../models/kaiju.model";

export class KaijuService {
    static async getKaijus() {
        return Kaiju.find({deleted: false});
    }
    static async getKaiju(id: string) {
        return Kaiju.find({_id: id, deleted: false});
    }
    static async getKaijuByName(nombre: string) {
        return Kaiju.find({nombre: nombre, deleted: false});
    }
    static async createKaiju(kaiju: KaijuType) {
        return Kaiju.create(kaiju);
    }
    static async updateKaiju(id: string, kaiju: KaijuType) {
        return Kaiju.findByIdAndUpdate(id);
    }
    static async deleteKaiju(id: string) {
        return Kaiju.findByIdAndUpdate(id, {deleted: true});
    }
}