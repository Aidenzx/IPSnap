const axios = require('axios');
const readline = require('readline');

const title = `
  _____ _____   _____ 
 |_   _|  __ \\ / ____|
   | | | |__) | (___  _ __   __ _ _ __
   | | |  ___/ \\___ \\| '_ \\ / _\` | '_ \\
  _| |_| |     ____) | | | | (_| | |_) |
 |_____|_|    |_____/|_| |_|\\__,_| .__/
                                 | |
                                 |_|

          BY: AIDENZX
`;

console.log(title);
const apiKey = 'p6LyQpDU6CPketW3OovMyXJqRZ1cu35x';

const getInfo = async (ip) => {
    try {
        const response = await axios.post('https://api.iplogger.org/ip/info/', null, {
            headers: {
                'X-token': apiKey,
                'Content-Type': 'multipart/form-data'
            },
            params: {
                ip: ip
            }
        });
        
        const data = response.data;

        console.log('\nInformación de la IP:');
        console.log(`IP: ${data.ip}`);
        console.log(`Continente: ${data.continent}`);
        console.log(`País: ${data.country}`);
        console.log(`Ciudad: ${data.city}`);
        console.log(`Latitud: ${data.latitude}`);
        console.log(`Longitud: ${data.longitude}`);
        console.log(`Exactitud: ${data.accuracy}`);
        console.log(`Estado/Región: ${data.region}`);
        console.log(`Distrito/Condado: ${data.district}`);
        console.log(`Código Postal: ${data.postal}`);
        console.log(`Zona Horaria: ${data.timezone}`);
        console.log(`Hora Local: ${data.local_time}`);
        console.log(`ISP: ${data.isp}`);
        console.log(`Organización: ${data.organization}`);
        console.log(`Conexión: ${data.connection}`);
        console.log(`Unión Europea: ${data.eu}`);
        console.log(`Estación Meteorológica: ${data.weather_station}`);

        process.exit(0);
    } catch (error) {
        console.error('Error al obtener la información de la dirección IP:', error.message);
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isValidIP = (ip) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
};

const preguntarIP = () => {
    rl.question('Por favor, ingresa la dirección IP: ', (ipToLookup) => {
        if (!ipToLookup || !isValidIP(ipToLookup)) {
            console.log('Por favor, proporciona una dirección IP válida.');
            console.log('Ejemplo de IP válida: 203.0.113.123');
            preguntarIP();
        } else {
            getInfo(ipToLookup).then(() => {});
        }
    });
};

preguntarIP();
