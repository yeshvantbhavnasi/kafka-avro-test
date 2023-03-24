const { Kafka } = require('kafkajs');
const avro = require('avsc');
// Define your Avro schema
const schema = avro.Type.forSchema({
  type: 'record',
  name: 'Person',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'age', type: 'int' },
    {
      name: 'address',
      type: [
        'null',
        {
          type: 'record',
          name: 'MailingAddress',
          fields: [
            { name: 'street', type: 'string' },
            { name: 'city', type: 'string' },
            { name: 'state', type: 'string' },
            { name: 'zip', type: 'int' },
          ],
        },
        {
          type: 'record',
          name: 'POBoxAddress',
          fields: [
            { name: 'po_box', type: 'int' },
            { name: 'city', type: 'string' },
            { name: 'state', type: 'string' },
            { name: 'zip', type: 'int' },
          ],
        },
      ],
    },
  ],
});

// Create an instance of the Kafka client
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
  connectionTimeout: 10000,
  requestTimeout: 25000
});


// Create a producer to send messages
const producer = kafka.producer();

console.log('Sending message...');
//see producer info
console.log(producer);
async function sendMessage() {
  await producer.connect();

  //create a message to send
  const message = {
    name: 'John Doe',
    age: 42,
    address: {
      "MailingAddress" : {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: 12345,
      }
    },
  };




  // Encode the message to a buffer
  const buffer = schema.toBuffer(message);

  // Send the message
  await producer.send({
    topic: 'my-topic',
    messages: [
      {
        value: buffer,
      },
    ],
  });

  await producer.disconnect();
}

// Call the sendMessage function
sendMessage();
