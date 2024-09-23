import { SlashCommandBuilder } from 'discord.js'
import nodemailer from 'nodemailer'
import 'dotenv/config'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS
    }
})


export async function sendEmail(destEmailAdd) {
    return transporter.sendMail({
        from: process.env.EMAIL,
        to: destEmailAdd,
        subject: 'Hello',
        text: `Hello ${destEmailAdd}. This is Button the Bot!`
    })
        .then(() => 'Sent successfully!')
        .catch(() => 'Failed to sent. Try again!')
}

export const data = new SlashCommandBuilder()
    .setName('email')
    .setDescription('Sends email')
    .addStringOption(option =>
        option.setName('email_address')
            .setDescription('The email address to send the email to')
            .setRequired(true))

export async function execute(interaction) {
    const destEmailAdd = interaction.options.getString('email_address')
    const response = await sendEmail(destEmailAdd)
    await interaction.reply(response)
}
