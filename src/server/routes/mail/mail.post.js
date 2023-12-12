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

    // / Configurar el transporte de correo
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: useRuntimeConfig().public.USER_GMAIL,
    //         pass: useRuntimeConfig().public.PASS_GMAIL,
    //     },
    // });


    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.mailgun.org",
        auth: {
            user:  "brad@sandboxadfe43ae354b4c598a4f1053b9c7d259.mailgun.org",
            // pass: useRuntimeConfig().public.PASS_GMAIL,
        },
        secure: true,
    });

    // Configurar el contenido del correo
    const mailOptions = {
        from: email,
        to: useRuntimeConfig().public.ACCOUNT_GMAIL,
        subject: 'Datos del formulario',
        text: `Nombre: ${nombre}\nApellidos: ${apellidos}\nEmail: ${email}\nBio: ${bio}`,
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