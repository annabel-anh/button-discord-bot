import { Collection, SlashCommandBuilder } from 'discord.js'
import { client } from '../client.js'
import * as url from 'url'
import fs from "node:fs";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))


async function makeDescriptionCollection() {
    client.commands = new Collection()

    const commandFiles = fs.readdirSync(__dirname)
        .filter(file => file.includes('.js'))
        .filter(file => !file.includes('help'))

    for (const file of commandFiles) {
        const command = await import(`./${file}`)
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
        }
    }
    return client.commands
}


export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a helpful summary of commands')

export async function execute(interaction) {
    const commandInfo = await makeDescriptionCollection()
    let helpText = `Usage:\n\t/${data.name}: ${data.description}\n`
    commandInfo.forEach(command => {
        helpText += `\t/${command.data.name}: ${command.data.description}\n`
    })

    await interaction.reply(helpText)
}
