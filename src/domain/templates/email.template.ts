import { envs } from "../../config/envs.plugin";

export function generateMonoCaseEmailTemplate(
    lugar: string,
    lat: number,
    lng: number,
    name: string,
    genre: string,
    age: number,
    creationDate: Date
): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng);

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Alerta de Casos de Viruela del Mono en México</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    color: #000000;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border: 2px solid #000000;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                }
                .header {
                    background-color: #000000;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                    border-bottom: 2px solid #ffffff;
                }
                .header h1 {
                    margin: 0;
                    font-size: 26px;
                    letter-spacing: 1px;
                }
                .content {
                    padding: 30px;
                    border-bottom: 2px solid #000000;
                }
                .content p {
                    margin: 12px 0;
                    line-height: 1.6;
                }
                .content p strong {
                    color: #000000;
                }
                .map-img {
                    width: 100%;
                    height: auto;
                    margin-top: 20px;
                    border-radius: 8px;
                    border: 2px solid #000000;
                }
                .footer {
                    background-color: #000000;
                    color: #ffffff;
                    padding: 15px;
                    text-align: center;
                    font-size: 12px;
                }
                .footer p {
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Detalles del Caso de Viruela de Mono</h1>
                </div>
                <div class="content">
                    <p><strong>Nombre del Paciente:</strong> ${name}</p>
                    <p><strong>Género:</strong> ${genre}</p>
                    <p><strong>Edad:</strong> ${age}</p>
                    <p><strong>Fecha de Creación:</strong> ${new Date(creationDate).toLocaleString('es-ES')}</p>
                    <p><strong>Lugar:</strong> ${lugar}</p>
                    <p><strong>Latitud:</strong> ${lat}</p>
                    <p><strong>Longitud:</strong> ${lng}</p>
                    <img src="${mapboxUrl}" alt="Mapa del incidente" class="map-img"/>
                </div>
                <div class="footer">
                    <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number): string => {
    const accessToken = envs.MAPBOX_ACCESS_TOKEN; // Reemplaza con tu token de acceso de Mapbox
    const zoom = 13; // Nivel de zoom
    const width = 800; // Ancho de la imagen
    const height = 500; // Altura de la imagen

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};