#!/usr/bin/env node

const amqp = require("amqplib");
const q = "task_queue";
const msg = process.argv.slice(2).join(" ") || "Hello World!";

(async () => {
  try {
    const conn = await amqp.connect("amqp://guest:guest@localhost");
    const ch = await conn.createChannel();
    await ch.assertQueue(q, { durable: true });

    ch.sendToQueue(q, new Buffer.from(msg), { persistent: true });

    console.log(" [x] Sent '%s'", msg);

    setTimeout(function() {
      conn.close();
      process.exit(0);
    }, 100);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
