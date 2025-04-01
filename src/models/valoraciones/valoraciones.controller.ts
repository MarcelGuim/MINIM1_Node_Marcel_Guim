import { Request, Response } from 'express';
import { IValoraciones } from './valoraciones.model';
import { ValoracionService } from './valoraciones.services';

const valoracionService = new ValoracionService();

export async function createValoracion(req: Request, res: Response): Promise<Response> {
    try {
        console.log("Creating valoracion");
        const valoracion: IValoraciones = req.body;
        const answer = await valoracionService.createValoracion(valoracion);
        if (answer === false) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found"
            });
        }
        else if (answer === true) {
            console.log("Calendar not found");
            return res.status(405).json({
                message: "Calendar not found"
            });
        }
        else{
            console.log("Valoracion saved");
            return res.status(201).json({
                message: "Valoracion saved",
                valoraciones: answer
            });
        }
    } catch (error) {
        console.log("Server Error");
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

type PaginatedUsersQueryParams = {
    page: number,
    limit: number | undefined,
    userId: string,
  }

export async function getAllValoracionesPaginated(req: Request<{}, {}, {}, PaginatedUsersQueryParams, String>, res: Response): Promise<Response> {
    try {
        console.log("Getting all valoraciones paginated");
        const page = req.query.page;
        const limit = req.query.limit ?? 5;
        const user: string = req.query.userId;
        console.log("User id at the controller: " + user);
        const answer = await valoracionService.getAllValoracionesPaginated(page, limit, user);

        if (answer === false) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found"
            });
        }
        else{
            console.log("Valoraciones obtained");
            return res.status(201).json({
                message: "Valoraciones obtained",
                valoraciones: answer
            });
        }
    } catch (error) {
        console.log("Server Error");
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export async function deleteValoracion(req: Request, res: Response): Promise<Response> {
    try {
        console.log("Erasing a valoracion");
        const valoracionId: string = req.params.valoracionId;
        const answer = await valoracionService.deleteValoracion(valoracionId);
        if (answer !== null){
            console.log("Valoracion erased");
            return res.status(201).json({
                message: "Valoracion erased",
                valoraciones: answer
            });
        }
        else{
            console.log("Valoracion not found");
            return res.status(404).json({
                message: "Valoracion not found"
            }); 
        }
    } catch (error) {
        console.log("Server Error");
        return res.status(500).json({
            message: "Server Error"
        });
    }
}


export async function getValoracion(req: Request, res: Response): Promise<Response> {
    try {
        console.log(" Getting validacion");
        const valoracionId = req.params.valoracionId;
        const answer = await valoracionService.getValoracion(valoracionId);
        if (answer !== null){
            console.log("Validacion found");
            return res.status(201).json({
                message: "Validacion found",
                valoraciones: answer
            });
        }
        else{
            console.log("Validation not found, wrong Id");
            return res.status(202).json({
                message: "Validation not found, wrong Id"
            }); 
        }
    } catch (error) {
        console.log("Server Error");
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export async function updateValoracion(req: Request, res: Response): Promise<Response> {
    try {
        console.log(" Updatting validacion");
        const valoracionId:string = req.params.valoracionId;
        const valoracion: IValoraciones = req.body;
        const answer = await valoracionService.updateValoracion(valoracion.valoracion, valoracionId);
        if (answer !== null){
            console.log("Validacion found");
            return res.status(201).json({
                message: "Validacion found",
                valoraciones: answer
            });
        }
        else{
            console.log("Validation not found, wrong Id");
            return res.status(402).json({
                message: "Validation not found, wrong Id"
            }); 
        }
    
    } catch (error) {
        console.log("Server Error");
        return res.status(500).json({
            message: "Server Error"
        });
    }
}