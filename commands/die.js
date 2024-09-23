import { SlashCommandBuilder } from 'discord.js'
import { client } from '../client.js'

export const data = new SlashCommandBuilder()
    .setName('die')
    .setDescription('Returns something then shuts down')

export async function execute(interaction) {
    await interaction.reply('Goodbye my friend 👋')
    await client.destroy()
}
