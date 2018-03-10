#!/usr/bin/env node

const amqp = require("amqplib");
const q = "hello";

amqp
  .connect("amqp://guest:guest@localhost")
  .then(conn => conn.createChannel())
  .then(ch => ch.assertQueue(q, { durable: false }).then(() => ch))
  .then(ch => {
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(
      q,
      msg => {
        console.log(" [x] Received %s", msg.content.toString());
      },
      { noAck: true }
    );
  })
  .catch(err => console.error(err));
