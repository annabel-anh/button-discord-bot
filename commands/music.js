import {SlashCommandBuilder} from 'discord.js'
import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    entersState,
    joinVoiceChannel,
    StreamType,
    VoiceConnectionStatus
} from '@discordjs/voice'
import ytdl from 'ytdl-core'


async function connectToChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
    });
    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 30_000)
        return connection;

    } catch (error) {
        connection.destroy()
        throw error;
    }
}

async function playSong(player) {
    const url = 'https://www.youtube.com/watch?v=E8gmARGvPlI'
    const song = await ytdl.getInfo(url)
    const formats = song.formats
    const stream = ytdl.chooseFormat(formats, {quality: 'highestaudio'}).url
    const audioResource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary
    });
    player.play(audioResource)
    return entersState(player, AudioPlayerStatus.Playing, 5000)
}


export const data = new SlashCommandBuilder()
    .setName('music')
    .setDescription('Streams music remotely')


export async function execute(interaction) {
    if (!interaction.member.voice.channel) {
        await interaction.reply('You must join a voice channel first to use this command')
    } else {
        try {
            const player = createAudioPlayer()
            const connection = await connectToChannel(interaction.member.voice.channel)
            connection.subscribe(player)
            await interaction.reply('Now playing...')
            await playSong(player)

        } catch (error) {
            console.error(error)
        }
    }
}
