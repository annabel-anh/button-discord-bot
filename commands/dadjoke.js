import { SlashCommandBuilder } from "discord.js"


function getDadJoke() {
    const url = 'https://icanhazdadjoke.com/'
    const headers = { 'Accept': 'application/json' }
    return fetch(url, { headers })
        .then(response => response.json())
        .then(data => data.joke)
        .catch(error => console.error('Dad is a German. Jokes not found.'))
}

export const data = new SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('Tells a random dad joke')

export async function execute(interaction) {
    const joke = await getDadJoke()
    await interaction.reply(`${joke}`)
}
