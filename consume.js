//a sample consumer
//kafkjs
const { Kafka } = require('kafkajs')
const avro = require('avsc')


//consume from kafka
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
  connectionTimeout: 10000,
  requestTimeout: 25000
})

const schmea = avro.Type.forSchema({
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


const consumer = kafka.consumer({ groupId: 'test-group-2' })

async function run() {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      console.log({
        value: message.value.toString(),
      })

      //decode the message
      const decodedMessage = schmea.fromBuffer(message.value);
      console.log("decoded message:")
      console.log(JSON.stringify(decodedMessage));
      //end
      console.log("end")

    },
  })
}

run().catch(console.error)



