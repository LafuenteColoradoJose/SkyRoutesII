// ⁡⁢⁢⁣𝗣𝗔𝗥𝗔 𝗥𝗘𝗖𝗜𝗕𝗜𝗥 𝗟𝗢𝗦 𝗘𝗠𝗔𝗜𝗟𝗦⁡ de los clientes y enviarlos a skyroutes.info@gmail.com⁡


import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {
        nombre,
        email,
        bio,
    } = body;

    /// Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'skyroutes.info@gmail.com',
            pass: 'vzdn aytu oouk hijq',
        },
    });

    // Configurar el contenido del correo
    const mailOptions = {
        from: email,
        to: 'skyroutes.info@gmail.com',
        subject: 'Datos del formulario',
        text: `Nombre: ${nombre}\nEmail: ${email}\nBio: ${bio}`,
    };

    // Enviar el correo
    let response = "";

    try {
        await transporter.sendMail(mailOptions);
        response = "ok";
    } catch (error) {
        response = error;
    }

    return {
        res: response,
    };
});