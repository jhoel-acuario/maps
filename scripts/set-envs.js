const { writeFileSync, mkdirSync} = require('fs')

require ('dotenv').config();

const targetPath = './src/environment/environment.ts';
const envFileContent = `
   export const environment = {
    mapbox_key:"${process.env['MAPBOX_KEY']}",
   } 
    `;
mkdirSync('./src/environment', {recursive:true})

writeFileSync(targetPath, envFileContent)