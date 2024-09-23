import { Events, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'

import { client } from './client.js'
import * as help from './commands/help.js'
import * as lorem from './commands/lorem.js'
import * as dadjoke from './commands/dadjoke.js'
import * as die from './commands/die.js'
import * as text from './commands/text.js'
import * as email from './commands/email.js'
import * as music from './commands/music.js'
import * as weather from './commands/weather.js'

const token = process.env.DISCORD_BOT_TOKEN


// When the client is ready:
client.once(Events.ClientReady, () => {
    console.log(`${client.user.displayName} has logged in and is ready!`)
})

client.login(token)

async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return
    switch (interaction.commandName) {
        case 'help':
            await help.execute(interaction)
            break;
        case 'lorem':
            await lorem.execute(interaction)
            break;
        case 'dadjoke':
            await dadjoke.execute(interaction)
            break;
        case 'die':
            await die.execute(interaction)
            break;
        case 'text':
            await text.execute(interaction)
            break;
        case 'email':
            await email.execute(interaction)
            break;
        case 'music':
            await music.execute(interaction)
            break;
        case 'weather':
            await weather.execute(interaction)
            break;
    }
}

client.on(Events.InteractionCreate, handleInteraction)
