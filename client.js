import { Client, GatewayIntentBits } from 'discord.js'

const client = new Client( {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
})

// export the client to use in index.js and help.js
export { client }