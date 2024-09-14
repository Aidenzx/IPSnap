const axios = require('axios');
const readline = require('readline');

const colorMorado = (text) => `\x1b[35m${text}\x1b[0m`;
const title = `${colorMorado('  _____ _____   _____ ')}\n${colorMorado(' |_   _|  __ \\ / ____|')}\n${colorMorado('   | | | |__) | (___  _ __   __ _ _ __')}\n${colorMorado('   | | |  ___/ \\___ \\| \'_ \\ / _\` | \'_ \\')}\n${colorMorado('  _| |_| |     ____) | | | | (_| | |_) |')}\n${colorMorado(' |_____|_|    |_____/|_| |_|\\__,_| .__/')}\n${colorMorado('                                 | |')}\n${colorMorado('                                 |_|')}\n\n${colorMorado('          BY: AIDENZX')}`;

console.log(title);
const token = '38d0f850d8b865';


const getInfo = async (ip) => {
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/json?token=${token}`);
        console.log('\nInformación de la IP:');
        const data = response.data;
        console.log(`IP: ${data.ip}`);
        console.log(`Hostname: ${data.hostname}`);
        console.log(`Ciudad: ${data.city}`);
        console.log(`Región: ${data.region}`);
        console.log(`País: ${data.country}`);
        const [latitud, longitud] = data.loc.split(',');
        console.log(`Latitud: ${latitud}`);
        console.log(`Longitud: ${longitud}`);
        console.log(`Código Postal: ${data.postal}`);
        console.log(`Zona Horaria: ${data.timezone}`);
        console.log(`ASN: ${data.asn.asn} (${data.asn.name})`);
        console.log(`Organización: ${data.company.name}`);

        if (data.abuse) {
            console.log(`\nInformación de abuso:`);
            console.log(`Dirección: ${data.abuse.address}`);
            console.log(`Correo: ${data.abuse.email}`);
            console.log(`Teléfono: ${data.abuse.phone}`);
        }

        
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
            
            getInfo(ipToLookup).then(() => {
                
            });
        }
    });
};


preguntarIP();
