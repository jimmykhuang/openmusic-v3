process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
require('dotenv').config();
const amqp = require('amqplib');
const SongsService = require('./SongsService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async() => {
    const songsService = new SongsService();
    const mailSender = new MailSender();
    const listener = new Listener(songsService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:notes', {
        durable: true,
    });

    channel.consume('export:notes', listener.listen, { noAck: true });

};

init();