import { SlashCommandBuilder } from 'discord.js'
import { LoremIpsum } from 'lorem-ipsum'


export const data = new SlashCommandBuilder()
    .setName('lorem')
    .setDescription('Produces lorem ipsum words. Returns 15 words if users don\'t provide an argument or pass in 0')
    .addIntegerOption(option =>
        option.setName('words_count')
            .setDescription('Number of lorem words to return'))

export async function execute(interaction) {
    const wordsCount = interaction.options.getInteger('words_count')
    if (wordsCount < 0) {
        await interaction.reply('words_count can\'t be negative. Try again!')
    } else {
        await interaction.reply(new LoremIpsum().generateWords(
            ((wordsCount === null) || (wordsCount === 0)) ? 15 : wordsCount
        ))
    }
}
