import { Request, Response } from "express";
import { MonoCaseModel } from "../../../data/models/monocase.model";

export class MonoCaseController {
    
    //Obtener todos los casos - Funciona
    public getMonoCases = async (req: Request, res: Response) => {
        try {
            const monocases = await MonoCaseModel.find();
            return res.json(monocases);
        } catch (error) {
            return res.json([]);
        }
    };

    //Crear un nuevo caso - Funciona
    public createMonocase = async (req: Request, res: Response) => {
        try {
            const { lugar, lat, lng, name, genre, age } = req.body;
            const newMonocase = await MonoCaseModel.create({
                lugar,
                lat,
                lng,
                name,
                genre,
                age,
            });
            res.json(newMonocase);
        } catch (error) {
            res.json({ message: "Error creando registro" });
        }
    };

    //Obtener caso por Id - Funciona
    public getMonocaseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const monocase = await MonoCaseModel.findById(id);
            return res.json(monocase);
        } catch (error) {
            return res.json({
                message: "Ocurrio un error al traer el caso de Viruela de Mono",
            });
        }
    };

    //Actualizar por Id - Funciona
    public updateMonocase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { lugar, lat, lng, name, genre, age } = req.body;

            const updatedMonocase = await MonoCaseModel.findByIdAndUpdate(
                id,
                {
                    lugar,
                    lat,
                    lng,
                    name,
                    genre,
                    age,
                },
                { new: true } // Esta opción retorna el documento actualizado
            );

            if (!updatedMonocase) {
                return res.json({ message: "Caso no encontrado" });
            }

            return res.json(updatedMonocase);
        } catch {
            return res.json({ message: "Ocurrió un error al actualizar el caso." });
        }
    };
    
    //Eliminar un caso por su id - Funciona
    public deleteMonocase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await MonoCaseModel.findByIdAndDelete(id);
            return res.json({ message: "Caso de Viruela de Mono eliminado" });
        } catch (error) {
            return res.json({
                message: "Ocurrio un error al eliminar el caso de Viruela de Mono",
            });
        }
    };

    // Obtener casos registrados en la última semana - Funciona
    public getMonoCasesLastWeek = async (req: Request, res: Response) => {
        try {
            // Calcula la fecha actual y la fecha de hace una semana
            const currentDate = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(currentDate.getDate() - 7);

            // Busca los casos en la última semana
            const monocases = await MonoCaseModel.find({
                creationDate: {
                    $gte: oneWeekAgo,
                    $lte: currentDate
                }
            });

            return res.json(monocases);
        } catch (error) {
            return res.status(500).json({ message: "Error obteniendo los casos registrados en la ultima semana" });
        }
    };
}
