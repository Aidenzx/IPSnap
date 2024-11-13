const axios = require('axios');
const readline = require('readline');

const colorMorado = (text) => `\x1b[35m${text}\x1b[0m`;
const title = `${colorMorado('  _____ _____   _____ ')}\n${colorMorado(' |_   _|  __ \\ / ____|')}\n${colorMorado('   | | | |__) | (___  _ __   __ _ _ __')}\n${colorMorado('   | | |  ___/ \\___ \\| \'_ \\ / _\` | \'_ \\')}\n${colorMorado('  _| |_| |     ____) | | | | (_| | |_) |')}\n${colorMorado(' |_____|_|    |_____/|_| |_|\\__,_| .__/')}\n${colorMorado('                                 | |')}\n${colorMorado('                                 |_|')}\n\n${colorMorado('          BY: AIDENZX')}`;

const api_url = "http://ip-api.com/json/";
const abuse_api_url = "https://api.abuseipdb.com/api/v2/check";
const vt_api_url = "https://www.virustotal.com/api/v3/ip_addresses/";

const abuseApiKey = 'b35e8ad1fb331fb307cdc7db4d866a59f3a589f0548ca0be7fda144ee15a60530f21953568e6b627';
const vtApiKey = '6577ec907915ebf3587728186e46a1e74665aa89b88244bb485884acdf639a5a';

const messages = {
    es: {
        welcome: title,
        askIP: 'Por favor, ingresa la dirección IP: ',
        invalidIP: 'Por favor, proporciona una dirección IP válida.',
        infoIP: 'Información de la IP:',
        error: 'Error al obtener la información de la dirección IP:',
        abuseReports: 'Número de reportes de abuso:',
        abuseComments: 'Comentarios de abuso:',
        vtInfo: 'Información de VirusTotal:',
        goodbye: 'Saliendo...'
    },
    en: {
        welcome: title,
        askIP: 'Please enter the IP address: ',
        invalidIP: 'Please provide a valid IP address.',
        infoIP: 'IP Information:',
        error: 'Error retrieving IP information:',
        abuseReports: 'Abuse reports count:',
        abuseComments: 'Abuse comments:',
        vtInfo: 'VirusTotal Information:',
        chooseLanguage: 'Choose your language:\n1. Spanish\n2. English',
        goodbye: 'Exiting...'
    }
};

let lang = 'en'; 

const getAbuseInfo = async (ip) => {
    try {
        const response = await axios.get(`${abuse_api_url}?ipAddress=${ip}`, {
            headers: {
                'Key': abuseApiKey,
                'Accept': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(messages[lang].error, error.message);
        return null;
    }
};

const getVTInfo = async (ip) => {
    try {
        const response = await axios.get(`${vt_api_url}${ip}`, {
            headers: {
                'x-apikey': vtApiKey,
            },
        });
        console.log(`\n${messages[lang].vtInfo}`);
        console.log(`IP: ${response.data.data.id}`);
        console.log(`Número de reportes: ${JSON.stringify(response.data.data.last_analysis_stats)}`);
        console.log(`Último análisis: ${new Date(response.data.data.last_analysis_date * 1000).toLocaleString()}`);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};

const getInfo = async (ip) => {
    try {
        const response = await axios.get(`${api_url}${ip}`);
        const data = response.data;

        if (data.status === 'fail') {
            console.error(messages[lang].error, data.message);
            return;
        }

        console.log(`\n${messages[lang].infoIP}`);
        console.log(`IP: ${data.query}`);
        console.log(`Ciudad: ${data.city}`);
        console.log(`Región: ${data.regionName}`);
        console.log(`País: ${data.country}`);
        console.log(`Código Postal: ${data.zip}`);
        console.log(`Latitud: ${data.lat}`);
        console.log(`Longitud: ${data.lon}`);
        console.log(`Zona Horaria: ${data.timezone}`);
        console.log(`ISP: ${data.isp}`);
        console.log(`Organización: ${data.org}`);
        console.log(`ASN: ${data.as}`);

        const abuseInfo = await getAbuseInfo(ip);
        if (abuseInfo) {
            console.log(`${messages[lang].abuseReports} ${abuseInfo.abuseConfidenceScore}`);
            console.log(`${messages[lang].abuseComments} ${abuseInfo.lastReportedAt}`);
        }

        await getVTInfo(ip);
        process.exit(0);
    } catch (error) {
        console.error(messages[lang].error, error.message);
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
    rl.question(messages[lang].askIP, (ipToLookup) => {
        if (!ipToLookup || !isValidIP(ipToLookup)) {
            console.log(messages[lang].invalidIP);
            preguntarIP();
        } else {
            getInfo(ipToLookup);
        }
    });
};

const chooseLanguage = () => {
    rl.question(`${messages.en.chooseLanguage}\n`, (option) => {
        if (option === '1') {
            lang = 'es';
        } else if (option === '2') {
            lang = 'en';
        } else {
            console.log('Invalid option. Please try again.');
            chooseLanguage();
            return;
        }
        console.log(messages[lang].welcome);
        preguntarIP();
    });
};

chooseLanguage();
                    
