const fs = require('fs');
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

async function uploadToDrive() {
  const drive = google.drive({ version: 'v3', auth: await auth.getClient() });

  const fileMetadata = {
    name: 'grabacion-reunion.mp4', // <-- ajustá el nombre si el archivo se llama diferente
    parents: ['1GeGVtWcJFZR90tXqvEgLd1FzukBEX9L3'],
  };

  const media = {
    mimeType: 'video/mp4',
    body: fs.createReadStream('grabacion-reunion.mp4'),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  console.log(`✅ Archivo subido correctamente con ID: ${response.data.id}`);
}

uploadToDrive().catch(console.error);
