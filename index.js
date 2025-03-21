const { Client, GatewayIntentBits, Partials, EmbedBuilder, PermissionsBitField, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('./config.json'); // Importa il file di configurazione
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const warnDataPath = './warns.json';
const path = require('path'); // Aggiungi questa riga
const { exec } = require('child_process');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User]
});

const PREFIX = config.prefix; // Prefisso per i comandi
client.prefix = PREFIX;
const GIPHY_API_KEY = process.env.GIPHY_API_KEY; // Usa la chiave API da .env
const WELCOME_CHANNEL_ID = "1331000466900779111"
const WELCOME_ROLE_ID = "1331005128450375691"
const TICKETS_DIR = path.join(__dirname, 'tickets');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;

client.once('ready', () => {
    console.log(`Bot avviato come ${client.user.tag}`);
});

// Funzione per ottenere una GIF da Giphy
async function getAnimeGif(action) {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=anime ${action}&limit=10`;
        const response = await axios.get(url);
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.data.length);
        return data.data[randomIndex].images.original.url;
    } catch (error) {
        console.error('Errore durante il recupero della GIF:', error);
        return null;
    }
}

async function getKirbyGif(action) {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=kirby ${action}&limit=10`;
        const response = await axios.get(url);
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.data.length);
        return data.data[randomIndex].images.original.url;
    } catch (error) {
        console.error('Errore durante il recupero della GIF:', error);
        return null;
    }
}


async function getFurryGif(action) {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=furry-fandom ${action}&limit=10`;
        const response = await axios.get(url);
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.data.length);
        return data.data[randomIndex].images.original.url;
    } catch (error) {
        console.error('Errore durante il recupero della GIF:', error);
        return null;
    }
}

async function getKillGif(action) {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=kill ${action}&limit=10`;
        const response = await axios.get(url);
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.data.length);
        return data.data[randomIndex].images.original.url;
    } catch (error) {
        console.error('Errore durante il recupero della GIF:', error);
        return null;
    }
}



// Comandi di roleplay
const roleplayCommands = {
    darling: {
        description: 'Chiama qualcuno "Darling"',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two darling');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} chiama ${message.mentions.users.first()?.username || 'qualcuno'} "Darling"`)
                .setDescription(roleplayCommands.darling.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },

    kill: {
        description: 'Ammazza qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getKillGif('kill');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} ammazza ${message.mentions.users.first()?.username}`)
                .setDescription(roleplayCommands.kill.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    pilot: {
        description: 'Diventa il pilota di un Franxx',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two pilot');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} diventa il pilota di un Franxx`)
                .setDescription(roleplayCommands.pilot.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    smile: {
        description: 'Mostra un sorriso malizioso',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two smile');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} sorride maliziosamente`)
                .setDescription(roleplayCommands.smile.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    fight: {
        description: 'Preparati per una battaglia epica',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two fight');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} Kirby :)`)
                .setDescription(roleplayCommands.fight.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    kirby: {
        description: "Kirby",
        execute: async (message, args) => {
            const gifUrl = await getKirbyGif("kirby");
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`Kirbo`)
                .setDescription("kirbo ;)")
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    furry: {
        description: "Get furry gif",
        execute: async (message, args) => {
            const gifUrl = await getFurryGif("furry");
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`Kirbo`)
                .setDescription("Get furry gif")
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    transform: {
        description: 'Trasformati in una forma potente',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two transform');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} si trasforma in una forma potente`)
                .setDescription(roleplayCommands.transform.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    dance: {
        description: 'Balliamo insieme!',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('zero two dance');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} balla con ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.dance.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    hug: {
        description: 'Abbraccia qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('hug');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} abbraccia ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.hug.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    kiss: {
        description: 'Bacia qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('kiss');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} bacia ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.kiss.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    pat: {
        description: 'Fai una carezza a qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('pat');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} fa una carezza a ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.pat.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
    slap: {
        description: 'Dai uno schiaffo a qualcuno',
        execute: async (message, args) => {
            const gifUrl = await getAnimeGif('slap');
            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle(`${message.author.username} schiaffeggia ${message.mentions.users.first()?.username || 'qualcuno'}`)
                .setDescription(roleplayCommands.slap.description)
                .setImage(gifUrl);
            message.channel.send({ embeds: [embed] });
        }
    },
};

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'benvenuto');
    if (!welcomeChannel) return;

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Benvenuto!')
        .setDescription(`Ciao ${member.user.username}, benvenuto su ${member.guild.name}!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

    welcomeChannel.send({ embeds: [welcomeEmbed] });
});

const ticketsDir = path.join(__dirname, 'tickets');
if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir);
}

// Funzione per aggiornare index.html
function updateIndexHTML() {
    const ticketFiles = fs.readdirSync(ticketsDir).filter(file => file.endsWith('.html') && file !== 'index.html');

    // Ordina i ticket in base alla data di creazione (dal più recente al più vecchio)
    ticketFiles.sort((a, b) => {
        const timestampA = parseInt(a.split('_')[1].replace('.html', ''), 10); // Estrae l'ID del canale
        const timestampB = parseInt(b.split('_')[1].replace('.html', ''), 10); // Estrae l'ID del canale
        return timestampB - timestampA; // Ordina dal più recente al più vecchio
    });

    let htmlContent = `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elenco Ticket</title>
    <style>
        body {
            background-color: #36393f;
            color: #ffffff;
            font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #ffffff;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 10px 0;
        }
        a {
            text-decoration: none;
            color: #00b0f4;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Elenco Ticket</h1>
    <ul>
`;

    ticketFiles.forEach(file => {
        const ticketName = file.replace('.html', '');
        htmlContent += `
        <li><a href="${file}">${ticketName}</a></li>
`;
    });

    htmlContent += `
    </ul>
</body>
</html>
`;

    fs.writeFileSync(path.join(ticketsDir, 'index.html'), htmlContent);
}

// Funzione per generare la trascrizione HTML di un ticket
async function generateTranscript(channel) {
    try {
        // Raccogli tutti i messaggi del canale
        const messages = await channel.messages.fetch({ limit: 100 }); // Puoi aumentare il limite se necessario

        // Creazione della struttura HTML
        let htmlContent = `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trascrizione Ticket - ${channel.name}</title>
    <style>
        body {
            background-color: #36393f;
            color: #ffffff;
            font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .message {
            display: flex;
            margin-bottom: 15px;
        }
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 15px;
        }
        .message-content {
            flex: 1;
        }
        .username {
            font-weight: bold;
            color: #ffffff;
            margin-right: 8px;
        }
        .timestamp {
            font-size: 0.8em;
            color: #72767d;
        }
        .content {
            margin-top: 5px;
            color: #dcddde;
        }
    </style>
</head>
<body>
    <h1>Trascrizione Ticket - ${channel.name}</h1>
    <p><strong>ID Ticket:</strong> ${channel.id}</p>
    <p><strong>Creato da:</strong> ${channel.topic || 'N/A'}</p>
    <p><strong>Data di creazione:</strong> ${new Date(channel.createdAt).toLocaleString()}</p>
    <p><strong>Data di chiusura:</strong> ${new Date().toLocaleString()}</p>
    <hr>
    <h2>Messaggi</h2>
`;

        // Aggiungi ogni messaggio all'HTML
        messages.reverse().forEach(msg => {
            htmlContent += `
    <div class="message">
        <img class="avatar" src="${msg.author.displayAvatarURL()}" alt="${msg.author.username}">
        <div class="message-content">
            <div>
                <span class="username">${msg.author.username}</span>
                <span class="timestamp">${new Date(msg.createdAt).toLocaleString()}</span>
            </div>
            <div class="content">${msg.content}</div>
        </div>
    </div>
`;
        });

        htmlContent += `
</body>
</html>
`;

        // Salva il file HTML
        const transcriptPath = path.join(ticketsDir, `${channel.name}_${channel.id}.html`);
        fs.writeFileSync(transcriptPath, htmlContent);

        // Aggiorna index.html
        updateIndexHTML();

        return transcriptPath;
    } catch (error) {
        console.error('Errore durante la generazione della trascrizione:', error);
        return null;
    }
}

// Gestione degli eventi dei bottoni
client.on('interactionCreate', async interaction => {
    try {
        if (!interaction.isButton()) return;

        const { customId, guild, member, channel } = interaction;

        if (customId === 'apri_ticket') {
            // Verifica se l'utente ha già un ticket aperto
            const existingTicket = guild.channels.cache.find(ch => ch.name === `ticket-${member.user.id}`);
            if (existingTicket) {
                return interaction.reply({ content: 'Hai già un ticket aperto!', flags: 'Ephemeral' });
            }

            // Creazione del canale ticket
            const ticketChannel = await guild.channels.create({
                name: `ticket-${member.user.id}`, // Nome del canale
                type: ChannelType.GuildText, // Tipo di canale (testo)
                permissionOverwrites: [
                    {
                        id: guild.id, // Imposta i permessi per il server
                        deny: [PermissionsBitField.Flags.ViewChannel], // Nega la vista a tutti
                    },
                    {
                        id: member.user.id, // Imposta i permessi per l'utente
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages], // Permetti la vista e l'invio di messaggi
                    },
                ],
            });

            // Embed per il ticket creato
            const ticketEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Ticket Aperto')
                .setDescription(`Ciao ${member.user.username}, il tuo ticket è stato aperto!`)
                .addFields(
                    { name: 'Utente', value: `${member.user}`, inline: true },
                    { name: 'ID Ticket', value: `${ticketChannel.id}`, inline: true }
                )
                .setFooter({ text: 'Il nostro team ti risponderà al più presto!' })
                .setTimestamp();

            // Pulsanti per il ticket (Claim e Close)
            const ticketButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('claim_ticket')
                        .setLabel('Claim')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('close_ticket')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Danger)
                );

            // Invio dell'embed e dei pulsanti nel canale del ticket
            ticketChannel.send({ embeds: [ticketEmbed], components: [ticketButtons] });

            // Risposta all'utente
            interaction.reply({ content: `Il tuo ticket è stato creato: ${ticketChannel}`, flags: 'Ephemeral' });
        }

        if (customId === 'claim_ticket') {
            if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return interaction.reply({ content: 'Non hai il permesso di gestire i ticket.', flags: 'Ephemeral' });
            }

            await channel.permissionOverwrites.edit(member.id, { ViewChannel: true, SendMessages: true });

            // Invia un messaggio pubblico nel canale del ticket
            channel.send(`Il ticket è stato reclamato da ${member.user.username}.`);
        }

        if (customId === 'close_ticket') {
            if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return interaction.reply({ content: 'Non hai il permesso di chiudere i ticket.', flags: 'Ephemeral' });
            }

            // Verifica che il canale esista
            if (!channel || channel.deleted) {
                return interaction.reply({ content: 'Il canale del ticket non esiste più.', flags: 'Ephemeral' });
            }

            // Genera la trascrizione PRIMA di eliminare il canale
            const transcriptPath = await generateTranscript(channel);

            // Elimina il canale del ticket DOPO aver generato la trascrizione
            await channel.delete();

            // Notifica l'utente
            try {
                await member.send('Il tuo ticket è stato chiuso. Grazie per aver contattato il supporto!');
            } catch (error) {
                console.error('Impossibile inviare un messaggio privato all\'utente:', error);
            }
        }
    } catch (error) {
        console.error('Errore durante la gestione dell\'interazione:', error);
        interaction.reply({ content: 'Si è verificato un errore durante l\'esecuzione del comando.', flags: 'Ephemeral' });
    }
});


// Funzione per gestire il comando 
async function warnCommand(message, args) {
    try {
        console.log('[LOG] Comando warn avviato.'); // Log di avvio del comando

        // Controlla se l'utente che esegue il comando ha i permessi
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            console.log('[LOG] Utente senza permessi ha provato a usare il comando warn.'); // Log in console
            return message.reply('Non hai il permesso di avvisare gli utenti!');
        }

        // Ottieni l'utente menzionato
        const user = message.mentions.users.first();
        if (!user) {
            console.log('[LOG] Nessun utente menzionato nel comando warn.'); // Log in console
            return message.reply('Devi menzionare un utente da avvisare!');
        }

        // Motivo del warn
        const reason = args.slice(1).join(' ') || 'Nessuna ragione specificata';

        let warnData = {};

        // Verifica se il file esiste e se è leggibile
        if (fs.existsSync(warnDataPath)) {
            try {
                warnData = JSON.parse(fs.readFileSync(warnDataPath, 'utf8'));
            } catch (error) {
                console.error('[ERRORE] Errore nel leggere o analizzare il file warns.json:', error);
                warnData = {}; // Se c'è un errore nel parsing, inizializza warnData come un oggetto vuoto
            }
        }

        // Inizializza i dati dell'utente se non esistono
        if (!warnData[user.id]) {
            warnData[user.id] = { count: 0, warns: [] };
        }

        // Aggiungi il warn
        warnData[user.id].count += 1;
        warnData[user.id].warns.push({ reason, date: new Date().toISOString() });

        // Salva i dati aggiornati nel file
        fs.writeFileSync(warnDataPath, JSON.stringify(warnData, null, 2));

        console.log(`[LOG] ${user.tag} è stato warnato. Motivo: ${reason}`); // Log in console
        message.reply(`Hai avvisato ${user.tag} per: ${reason}. Questo è il loro ${warnData[user.id].count}° avviso.`);

        // Applicazione delle sanzioni progressive
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            console.log('[LOG] Utente menzionato non trovato nel server.'); // Log in console
            return message.reply('Questo utente non è più nel server.');
        }

	if (warnData[user.id].count === 3) {
	    console.log("[LOG] ${user.tag} ha raggiunto 2 warn. Applicazione del timeout..."); //Log in console
	    await member.timeout(1800000, "Raggiunto il limite di 3 warn");
	    message.channel.send("${user.tag} ha ricevuto un timeout di 30 minuti per 5 avvisi");
        } else if (warnData[user.id].count === 2) {
            console.log(`[LOG] ${user.tag} ha raggiunto 3 warn. Applicazione del timeout...`); // Log in console
            await member.timeout(600000, 'Raggiunto il limite di 3 warn');
            message.channel.send(`${user.tag} ha ricevuto un timeout di 10 minuti per 3 avvisi.`);
        } else if (warnData[user.id].count === 5) {
            console.log(`[LOG] ${user.tag} ha raggiunto 5 warn. Espulsione...`); // Log in console
            await member.kick('Raggiunto il limite di 5 warn');
            message.channel.send(`${user.tag} è stato espulso per aver raggiunto 5 avvisi.`);
        } else if (warnData[user.id].count === 7) {
            console.log(`[LOG] ${user.tag} ha raggiunto 7 warn. Ban...`); // Log in console
            await member.ban({ reason: 'Raggiunto il limite di 7 warn' });
            message.channel.send(`${user.tag} è stato bannato per aver raggiunto 7 avvisi.`);
        }
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in comando warn:`, error); // Log dell'errore in console

        if (error.code === 50013) { // Codice per "Missing Permissions"
            console.log('[LOG] Il bot non può eseguire l\'azione a causa di permessi mancanti.'); // Log in console
            message.reply('Il bot non ha i permessi necessari per eseguire questa azione.');
        } else {
            console.error(`[ERRORE] in comando warn:`, error); // Log dell'errore in console
            message.reply('Si è verificato un errore durante l\'esecuzione del comando.');
        }
    }
}

// Funzione per gestire il comando kick
async function kickCommand(message, args) {
    try {
        console.log('[LOG] Comando kick avviato.'); // Log di avvio del comando

        // Controlla se l'utente che esegue il comando ha i permessi
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            console.log('[LOG] Utente senza permessi ha provato a usare il comando kick.'); // Log in console
            return message.reply('Non hai il permesso di espellere gli utenti!');
        }

        // Ottieni l'utente menzionato
        const user = message.mentions.users.first();
        if (!user) {
            console.log('[LOG] Nessun utente menzionato nel comando kick.'); // Log in console
            return message.reply('Devi menzionare un utente da espellere!');
        }

        // Motivo del kick
        const reason = args.slice(1).join(' ') || 'Nessuna ragione specificata';

        // Espelli l'utente
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            console.log('[LOG] Utente menzionato non trovato nel server.'); // Log in console
            return message.reply('Questo utente non è più nel server.');
        }

        await member.kick(reason);
        console.log(`[LOG] ${user.tag} è stato espulso. Motivo: ${reason}`); // Log in console
        message.channel.send(`${user.tag} è stato espulso per: ${reason}`);
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in comando kick:`, error); // Log dell'errore in console

        if (error.code === 50013) { // Codice per "Missing Permissions"
            console.log('[LOG] Il bot non può eseguire l\'azione a causa di permessi mancanti.'); // Log in console
            message.reply('Il bot non ha i permessi necessari per eseguire questa azione.');
        } else {
            console.error(`[ERRORE] in comando kick:`, error); // Log dell'errore in console
            message.reply('Si è verificato un errore durante l\'esecuzione del comando.');
        }
    }
}

// Funzione per gestire il comando ban
async function banCommand(message, args) {
    try {
        console.log('[LOG] Comando ban avviato.'); // Log di avvio del comando

        // Controlla se l'utente che esegue il comando ha i permessi
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            console.log('[LOG] Utente senza permessi ha provato a usare il comando ban.'); // Log in console
            return message.reply('Non hai il permesso di bannare gli utenti!');
        }

        // Ottieni l'utente menzionato
        const user = message.mentions.users.first();
        if (!user) {
            console.log('[LOG] Nessun utente menzionato nel comando ban.'); // Log in console
            return message.reply('Devi menzionare un utente da bannare!');
        }

        // Motivo del ban
        const reason = args.slice(1).join(' ') || 'Nessuna ragione specificata';

        // Banna l'utente
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            console.log('[LOG] Utente menzionato non trovato nel server.'); // Log in console
            return message.reply('Questo utente non è più nel server.');
        }

        await member.ban({ reason });
        console.log(`[LOG] ${user.tag} è stato bannato. Motivo: ${reason}`); // Log in console
        message.channel.send(`<@${user.id}> è stato bannato per: ${reason}`);
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in comando ban:`, error); // Log dell'errore in console

        Copy

if (warnData[user.id].count === 3) {
    console.log(`[LOG] ${user.tag} ha raggiunto 3 warn. Applicazione del timeout...`); // Log in console
    try {
        await member.timeout(600000, 'Raggiunto il limite di 3 warn');
        message.channel.send(`${user.tag} ha ricevuto un timeout di 10 minuti per 3 avvisi.`);
    } catch (error) {
        console.error(`[ERRORE] Impossibile applicare il timeout a ${user.tag}:`, error);
        if (error.code === 50013) { // Codice per "Missing Permissions"
            message.reply('Il bot non ha i permessi necessari per applicare il timeout.');
        } else {
            message.reply('Si è verificato un errore durante l\'applicazione del timeout.');
        }
    }
}
    }
}

async function unbanCommand(message, args) {
    try {
        console.log('[LOG] Comando unban avviato.'); // Log di avvio del comando

        // Controlla se l'utente che esegue il comando ha i permessi
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            console.log('[LOG] Utente senza permessi ha provato a usare il comando unban.'); // Log in console
            return message.reply('Non hai il permesso di rimuovere il ban degli utenti!');
        }

        // Ottieni l'ID o il tag dell'utente da sbannare
        const userInput = args[0];
        if (!userInput) {
            console.log('[LOG] Nessun utente specificato nel comando unban.'); // Log in console
            return message.reply('Devi specificare l\'ID o il tag dell\'utente da sbannare!');
        }

        // Verifica se il bot ha i permessi per rimuovere il ban
        if (!message.guild.members.me.permissions.has('BAN_MEMBERS')) {
            console.log('[LOG] Il bot non ha i permessi per rimuovere il ban degli utenti.'); // Log in console
            return message.reply('Il bot non ha i permessi necessari per rimuovere il ban degli utenti.');
        }

        // Recupera la lista degli utenti bannati
        const bans = await message.guild.bans.fetch();
        const bannedUser = bans.find(ban => ban.user.id === userInput || ban.user.tag === userInput);

        if (!bannedUser) {
            console.log('[LOG] Utente non trovato nella lista dei ban.'); // Log in console
            return message.reply('Questo utente non è bannato o non è stato trovato.');
        }

        // Rimuovi il ban
        await message.guild.bans.remove(bannedUser.user.id);
        console.log(`[LOG] ${bannedUser.user.tag} è stato sbannato.`); // Log in console
        message.channel.send(`${bannedUser.user.tag} è stato sbannato con successo.`);
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in comando unban:`, error); // Log dell'errore in console

        if (error.code === 50013) { // Codice per "Missing Permissions"
            console.log('[LOG] Il bot non può eseguire l\'azione a causa di permessi mancanti.'); // Log in console
            message.reply('Il bot non ha i permessi necessari per eseguire questa azione.');
        } else {
            console.error(`[ERRORE] in comando unban:`, error); // Log dell'errore in console
            message.reply('Si è verificato un errore durante l\'esecuzione del comando.');
        }
    }
}


client.on('guildMemberAdd', async (member) => {
    try {
        console.log(`[LOG] ${member.user.tag} è entrato nel server.`); // Log in console

        // Assegna il ruolo di benvenuto
        const role = member.guild.roles.cache.get(WELCOME_ROLE_ID);
        if (role) {
            await member.roles.add(role);
            console.log(`[LOG] Ruolo ${role.name} assegnato a ${member.user.tag}.`); // Log in console
        } else {
            console.log('[ERRORE] Ruolo di benvenuto non trovato.'); // Log in console
        }

        // Crea l'embed di benvenuto
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00') // Colore verde
            .setTitle('Benvenuto/a!')
            .setDescription(`Ciao ${member.user.username}, benvenuto/a su **${member.guild.name}**!`)
            .setThumbnail(member.user.displayAvatarURL()) // Immagine del profilo dell'utente
            .addFields(
                { name: 'Regole', value: 'Assicurati di leggere le regole del server!' },
                { name: 'Ruolo', value: `Ti è stato assegnato il ruolo <@&${WELCOME_ROLE_ID}>.` }
            )
            .setFooter({ text: 'Divertiti e buona permanenza!' })
            .setTimestamp();

        // Invia l'embed nel canale di benvenuto
        const welcomeChannel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
        if (welcomeChannel && welcomeChannel.isTextBased()) {
            await welcomeChannel.send({ embeds: [welcomeEmbed] });
            console.log(`[LOG] Messaggio di benvenuto inviato per ${member.user.tag}.`); // Log in console
        } else {
            console.log('[ERRORE] Canale di benvenuto non trovato o non è un canale di testo.'); // Log in console
        }
    } catch (error) {
        // Gestione dell'errore
        console.error(`[ERRORE] in evento guildMemberAdd:`, error); // Log dell'errore in console
    }
});

// Comandi disponibili
const commands = {
    warn: {
        description: 'Avvisa un utente',
        execute: warnCommand
    },
    kick: {
        description: 'Espelli un utente',
        execute: kickCommand
    },
    ban: {
        description: 'Banna un utente',
        execute: banCommand
    },
    unban: {
        description: 'Sbanna un utente',
        execute: unbanCommand
    },
    // Aggiungi altri comandi qui...
};

function runGitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Errore durante l'esecuzione del comando: ${command}`);
                console.error(stderr);
                reject(error);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
}

// Funzione per pushare i file al repository GitHub
async function pushToGitHub() {
    try {
        // Configura Git
        await runGitCommand('git config --global user.name "Bot"');
        await runGitCommand('git config --global user.email "bot@example.com"');

        // Aggiungi tutti i file nella cartella tickets
        await runGitCommand(`git add ${TICKETS_DIR}`);

        // Fai commit delle modifiche
        await runGitCommand('git commit -m "Aggiunti nuovi ticket automaticamente"');

        // Push al repository GitHub
        await runGitCommand(`git push https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git main`);

        console.log('Push completato con successo!');
    } catch (error) {
        console.error('Errore durante il push al repository GitHub:', error);
    }
}

// Esempio: Push automatico quando viene creato un nuovo file
fs.watch(TICKETS_DIR, (eventType, filename) => {
    if (eventType === 'rename' && filename.endsWith('.html')) {
        console.log(`Nuovo file rilevato: ${filename}`);
        pushToGitHub();
    }
});


// Gestione dei messaggi
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (commands[command]) {
        commands[command].execute(message, args);
    }
});




client.login(process.env.DISCORD_TOKEN); // Usa il token da .env
