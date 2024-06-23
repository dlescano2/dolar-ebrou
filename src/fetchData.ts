import { google } from 'googleapis';
import path from 'path';

interface DataRow {
  0: string;
  1: string;
  2: string;
}

async function getSheetData(): Promise<DataRow[]> {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'config/data-brou-63ddc84ba286.json'), // Ajusta la ruta según la ubicación de tu archivo JSON
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = '19ljwKi60876wA7mugb5MxA6DZ1IT7BzIKjNyleAyOoU'; // Reemplaza con tu ID de Google Sheets
  const range = 'Hoja 1!A2:C365'; // Ajusta el rango según tu hoja

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  // Asegurarse de que los datos coinciden con el tipo DataRow[]
  return (res.data.values || []) as DataRow[];
} catch (error) {
  console.error('Error fetching data:', error);
  return [];
}
}

export default getSheetData;