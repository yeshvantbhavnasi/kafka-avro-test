# kafka-avro-test

This repo shows an example avro schema with complex record type produced to kafka and read on consumer side


## turn up the infra using docker compose

docker compose up


## run the kafka producer

`node produce.js`

<img width="1613" alt="image" src="https://user-images.githubusercontent.com/20260478/227465878-ceb8bf71-0cba-475a-952e-ed734fe119ec.png">


# run the consumer 

`node consume.js`

```
mbp-013913 :: ~/avro-test » node consume.js                                                                                                                   130 ↵
{"level":"INFO","timestamp":"2023-03-24T08:13:26.959Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"test-group-2"}
{"level":"INFO","timestamp":"2023-03-24T08:13:29.986Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"test-group-2","memberId":"my-app-b15ba7ba-6fce-4a5e-8869-e38b9ad11399","leaderId":"my-app-b15ba7ba-6fce-4a5e-8869-e38b9ad11399","isLeader":true,"memberAssignment":{"my-topic":[0]},"groupProtocol":"RoundRobinAssigner","duration":3023}
{ value: '\x10John DoeT\x02\x16123 Main St\x0EAnytown\x04CA��\x01' }
decoded message:
{"name":"John Doe","age":42,"address":{"MailingAddress":{"street":"123 Main St","city":"Anytown","state":"CA","zip":12345}}}
end
```

As you can see we are able to produce a `Person` object with type `MailingAddress` and read properly
