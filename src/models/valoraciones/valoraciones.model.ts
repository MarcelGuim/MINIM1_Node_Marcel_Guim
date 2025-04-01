import mongoose from "mongoose";


export interface IValoraciones {
    user: mongoose.Types.ObjectId;
    calendar: mongoose.Types.ObjectId;
    valoracion: number;
    used: boolean;
    _id?: mongoose.Types.ObjectId
}

const ValoracionSchema = new mongoose.Schema<IValoraciones>({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    calendar:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Calendars'
    },
    valoracion:{ 
        type: Number,
        required: true,
    },
    used:{
        type: Boolean,
        required: true,
    }
});


const Valoracion = mongoose.model<IValoraciones>('Valoracion', ValoracionSchema);
export default Valoracion;