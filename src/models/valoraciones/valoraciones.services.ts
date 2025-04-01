import { promises } from 'dns';
import Valoracion, {IValoraciones} from './valoraciones.model';
import User, {IUsuari} from '../users/user.model';
import { start } from 'repl';
import { userInfo } from 'os';
import Calendar from '../calendari/calendar.model'

export class ValoracionService {
    async createValoracion(data: IValoraciones): Promise<IValoraciones | null | boolean> {
        const user = await User.findById(data.user);
        if (user === null) {
            return false;
        }
        const calendar = await Calendar.findById(data.calendar);
        if (calendar === null) {
            return true;
        }
        const valoracion = new Valoracion(data);
        return await valoracion.save(); 
    }

    async getAllValoracionesPaginated(page = 1, limit = 5, userId:string): Promise< IValoraciones[] | null | boolean> {
        console.log("user id at the service: " + userId)
        const user = await User.findById(userId);
        if (!user) {
            return false;
        }
        const valoraciones:IValoraciones[] = await Valoracion.find({user: userId})
          .sort({ id: 1 })
          .skip(page * limit)
          .limit(limit);
        return valoraciones;
      }

    async deleteValoracion(valoracionId: string): Promise<IValoraciones | null> {
        return await Valoracion.findByIdAndDelete(valoracionId);
    }

    async updateValoracion(value:Number, valoracionId:string): Promise<IValoraciones | null > {
        return await Valoracion.findByIdAndUpdate(valoracionId, {valoracion: value}, {new:true});
    }

    async getValoracion(valoracionId:string): Promise<IValoraciones|null>{
        return await Valoracion.findById(valoracionId);
    }
    
}