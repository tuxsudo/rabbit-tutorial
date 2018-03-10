#!/usr/bin/env node

const amqp = require("amqplib");
const q = "task_queue";

amqp
  .connect("amqp://guest:guest@localhost")
  .then(conn => conn.createChannel())
  .then(ch => ch.assertQueue(q, { durable: true }).then(() => ch))
  .then(ch => {
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(
      q,
      msg => {
        var secs = msg.content.toString().split('.').length - 1;
        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function() {
          console.log(" [x] Done with %s", msg.content.toString());
          ch.ack(msg);
        }, secs * 1000);
      },
      { noAck: false }
    );
  })
  .catch(err => console.error(err));
