# kafka-avro-test

This repo shows an example avro schema with complex record type produced to kafka and read on consumer side


## turn up the infra using docker compose

`docker compose up`


## run the kafka producer

`node produce.js`

<img width="1780" alt="image" src="https://user-images.githubusercontent.com/20260478/227467301-cc1a8323-91e3-4c97-8d88-741e92b0148d.png">



# run the consumer 

`node consume.js`

```
{"level":"INFO","timestamp":"2023-03-24T08:35:27.057Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"test-group-2"}
{"level":"INFO","timestamp":"2023-03-24T08:35:30.089Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"test-group-2","memberId":"my-app-d7060458-c56e-40b4-a5e0-e9fa303f0919","leaderId":"my-app-d7060458-c56e-40b4-a5e0-e9fa303f0919","isLeader":true,"memberAssignment":{"my-topic":[0]},"groupProtocol":"RoundRobinAssigner","duration":3029}
{ value: '\x10John DoeT\x02\x16123 Main St\x0EAnytown\x04CA��\x01' }
decoded message:
{"name":"John Doe","age":42,"address":{"MailingAddress":{"street":"123 Main St","city":"Anytown","state":"CA","zip":12345}}}
end
{ value: '\x10Jane DoeH\x04�\x01\x0EAnytown\x04CA��\x01' }
decoded message:
{"name":"Jane Doe","age":36,"address":{"POBoxAddress":{"po_box":123,"city":"Anytown","state":"CA","zip":12345}}}
end
{ value: '\x10John DoeT\x00' }
decoded message:
{"name":"John Doe","age":42,"address":null}
end
```

As you can see we are able to produce a `Person` object with type `MailingAddress` and read properly
