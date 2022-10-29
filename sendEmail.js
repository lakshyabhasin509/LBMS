const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

const sendEmail = async (email, subject, payload, template) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const source = fs.readFileSync(`./template/${template}`, "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        // Send email
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                return error;
            } else {
                return res.status(200).json({
                    success: true,
                });
            }
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = sendEmail;
