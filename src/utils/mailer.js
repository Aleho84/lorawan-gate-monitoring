import nodemailer from 'nodemailer';
import { mailSetting } from '../config/settings.js';

export default async function ({ from, to, subject, html }) {
    try {
        console.log('*** MAIL SETTINGS ***')
        console.log('settings: ',mailSetting);
        console.log('destinatarios:', to);
        const transporter = nodemailer.createTransport(mailSetting);
        await transporter.sendMail({ from, to, subject, html });

        return { message: 'Correo electrónico enviado correctamente', error: null };
    } catch (error) {
        return { message: 'Error al enviar el correo electrónico:', error: error.message };
    }
};
