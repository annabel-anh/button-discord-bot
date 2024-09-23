import { SlashCommandBuilder } from 'discord.js'
import { sendEmail } from './email.js'

export const data = new SlashCommandBuilder()
    .setName('text')
    .setDescription('Sends a text message to a T-Mobile phone number')
    .addStringOption(option =>
        option.setName('phone_number')
            .setDescription('The phone number to send a text to')
            .setRequired(true))

export async function execute(interaction) {
    const phoneNum = interaction.options.getString('phone_number')
    const response = await sendEmail(`${phoneNum}@tmomail.net`)
    await interaction.reply(response)
}
