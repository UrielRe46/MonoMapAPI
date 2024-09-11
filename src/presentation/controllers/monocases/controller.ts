import { Request, Response } from "express";
import { MonoCaseModel } from "../../../data/models/monocase.model";

export class MonoCaseController {
    //Obtener todos los casos - funciona
    public getMonoCases = async (req: Request, res: Response) => {
        try {
            const monocases = await MonoCaseModel.find();
            return res.json(monocases);
        } catch (error) {
            return res.json([]);
        }
    };

    //Crear un nuevo caso - funciona
    public createMonocase = async (req: Request, res: Response) => {
        try {
            const { title, lat, lng, name, genre, age } = req.body;
            const newMonocase = await MonoCaseModel.create({
                title,
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

    //Obtener caso por Id - funciona
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

    //Actualizar por Id - funciona
    public updateMonocase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { title, lat, lng, name, genre, age } = req.body;

            const updatedMonocase = await MonoCaseModel.findByIdAndUpdate(
                id,
                {
                    title,
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
    
    //Eliminar un caso por su id
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
}
