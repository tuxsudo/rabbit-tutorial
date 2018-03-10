#!/usr/bin/env node

const amqp = require("amqplib");
const q = "hello";

(async () => {
  try {
    const conn = await amqp.connect("amqp://guest:guest@localhost");
    const ch = await conn.createChannel();
    await ch.assertQueue(q, { durable: false });
    const date = new Date().toLocaleString();

    ch.sendToQueue(q, new Buffer.from(date));
    console.log(" [x] Sent %s", date);
    setTimeout(function() {
      conn.close();
      process.exit(0);
    }, 500);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
