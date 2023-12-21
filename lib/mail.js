module.exports = require('nodemailer').createTransport(require("@cagatayd/data")("system/mail.json"));

/**
 * 

transporter.sendMail({
    from: '"Noreply" <support@cagatayd.com>', // sender address
    to: "ca6tyd@gmail.com", // list of receivers
    subject: "[noreply] Merhaba", // Subject line
    text: "TEst içeriği metin ama noreply", // plain text body
    html: "<b>Kalın html metin</b>", // html body
}).then(info => {
    console.log({ info });
}).catch(console.error);
 */