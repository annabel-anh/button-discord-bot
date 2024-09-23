import * as url from 'url'
import path from 'path'
import fs from 'node:fs'
import { REST, Routes } from 'discord.js';
import 'dotenv/config'


const token = process.env.DISCORD_BOT_TOKEN
const clientId = process.env.DISCORD_CLIENT_ID
const guildId = process.env.DISCORD_SERVER_ID
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const commandsFolderPath = path.join(__dirname, 'commands')


const commands = [];
// Grab all the command files from the commands directory
const commandFiles = fs.readdirSync(commandsFolderPath)
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`); // Using dynamic import
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON())
    } else {
        console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
    }
}


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();