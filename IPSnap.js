const axios = require('axios');
const readline = require('readline');

const colorMorado = (text) => `\x1b[35m${text}\x1b[0m`;
const title = `${colorMorado('  _____ _____   _____ ')}\n${colorMorado(' |_   _|  __ \\ / ____|')}\n${colorMorado('   | | | |__) | (___  _ __   __ _ _ __')}\n${colorMorado('   | | |  ___/ \\___ \\| \'_ \\ / _\` | \'_ \\')}\n${colorMorado('  _| |_| |     ____) | | | | (_| | |_) |')}\n${colorMorado(' |_____|_|    |_____/|_| |_|\\__,_| .__/')}\n${colorMorado('                                 | |')}\n${colorMorado('                                 |_|')}\n\n${colorMorado('          BY: AIDENZX')}`;

console.log(title);
const apiKey = 'p6LyQpDU6CPketW3OovMyXJqRZ1cu35x'; // Tu nueva clave API

const getInfo = async (ip) => {
    try {
        const response = await axios.get(`https://api.iplogger.org/v1/ip/${ip}?apikey=${apiKey}`);
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
