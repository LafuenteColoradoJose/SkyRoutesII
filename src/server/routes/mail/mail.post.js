// ⁡⁢⁢⁣𝗣𝗔𝗥𝗔 𝗥𝗘𝗖𝗜𝗕𝗜𝗥 𝗟𝗢𝗦 𝗘𝗠𝗔𝗜𝗟𝗦⁡ de los clientes y enviarlos a skyroutes.info@gmail.com⁡


import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {
        nombre,
        apellidos,
        email,
        bio,
    } = body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port:587,
        secure: false,
        auth: {
            user: useRuntimeConfig().public.USER_GMAIL,
            pass: useRuntimeConfig().public.PASS_GMAIL,
        },
    });

    const mailOptions = {
        from: email,
        to: useRuntimeConfig().public.ACCOUNT_GMAIL,
        subject: 'Datos del formulario',
        text: `Nombre: ${nombre}\nApellidos: ${apellidos}\nEmail: ${email}\nBio: ${bio}`,
    };

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