import cron from "node-cron";
import { MonoCaseModel } from "../../data/models/monocase.model";
import { EmailService } from "../services/email.service";
import { generateMonoCaseEmailTemplate } from "../templates/email.template";

export const emailJob = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async () => {
        try {
            const monocases = await MonoCaseModel.find({ isSent: false });
            if (!monocases.length) {
                console.log("No hay casos de Viruela de Mono pendientes por enviar.");
                return;
            }
            console.log(`Procesando ${monocases.length} casos de Viruela de Mono.`);
            await Promise.all(
                monocases.map(async (monocase) => {
                    console.log(monocase);
                    try {
                        const htmlBody = generateMonoCaseEmailTemplate(
                            monocase.lugar,
                            monocase.lat,
                            monocase.lng,
                            monocase.name,
                            monocase.genre,
                            monocase.age,
                            monocase.creationDate
                        );
                        await emailService.sendEmail({
                            to: "uri29644@gmail.com",
                            subject: `Nuevo caso de Viruela de Mono`,
                            htmlBody: htmlBody,
                        });
                        console.log(
                            `Email enviado para el caso con Id: ${monocase._id}`
                        );
                        let updateMonocase = {
                            lugar: monocase.lugar,
                            lat: monocase.lat,
                            lng: monocase.lng,
                            isSent: true,
                            name: monocase.name,
                            genre: monocase.genre,
                            age: monocase.age,
                            creationDate: monocase.creationDate
                        };
                        await MonoCaseModel.findByIdAndUpdate(monocase._id, updateMonocase);
                        console.log(`Estado actualizado para el Id: ${monocase._id}`);
                    } catch (error) {
                        console.error("Error al procesar el caso");
                    }
                })
            );
        } catch (error) {
            console.error("Error durante el envio de correos");
        }
    });
};