import 'dotenv/config';

//devices
const devices = [
    { deveui: '00137A1000005149', description: 'PIA-VH2 Acceso Oeste' },
    { deveui: '00137A100000313B', description: 'PIA-VH2 Acceso Este' },
    { deveui: '00137A100000514C', description: 'PIA-Las Piedras Acceso Oeste' },
    { deveui: '00137A1000003141', description: 'PIA-Escorial Acceso Oeste' },
    { deveui: '00137A1000005142', description: 'PIA-Escorial Acceso Este' },
    { deveui: '00137A1000003138', description: 'PIA-Escorial Acceso Sur' },
    { deveui: '0000000000000001', description: 'Dispositivo Virtual de Test' },
];

//mailsettings
let mailSetting = {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: (process.env.MAIL_SECURE === 'true'),
    ignoreTLS: (process.env.MAIL_IGNORETLS === 'true'),
};

if (process.env.MAIL_SECURE === 'true') {
    mailSetting =
    {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: (process.env.MAIL_SECURE === 'true'),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    };
}

export {
    devices,
    mailSetting,
};