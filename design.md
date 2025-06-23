# Tables

```SQL
Project MVP_TELESYNC{
  database_type:"postgresSQL"
  Note:"Database design for TeleSync"
}

Table user.user{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  firstname VARCHAR(215) [NOT NULL]
  lastname VARCHAR(215) [NOT NULL]
  username VARCHARR(215) [NOT NULL]
  email VARCHAR(215) [DEFAULT:NULL]
  phonenumber VARCHAR(15) [DEFAULT:NULL]
  profileid INT [NOTE: "Foreign Key. A user will have only 1 profile"]
}

Table profile.profile{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  bio VARCHAR(215) [DEFAULT:NULL]
  tiktok VARCHAR(215) [DEFAULT:NULL]
  instagram VARCHAR(215) [DEFAULT: NULL]
  createdat TIMESTAMP [DEFAULT: `now()`]
  followersid INT [NOTE:"Foreign Key. A profile can have 0 or many follwers"]
  following INT [NOTE:"Foreign Key. a Profile can follow 0 or many other users"]
  userid INT [REF:-user.user.id]
}

Table followers.followers{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  followerscount INT [default:0]
  profileid INT [REF:>profile.profile.id, NOTE:"A user profile will display number of user followers. So a user can have 0 or many followers."]
}

Table following.following{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  followingcount INT [default:0]
  profileid INT [REF:>profile.profile.id, NOTE:"A user profile will display number of people user is following. So a user can follow 0 or many other users."]
}

Table notification.notification{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  notificationreceiveddate TIMESTAMP [DEFAULT:`now()`]
  userid INT [REF:>user.user.id]
}

// A contact is a type of user
Table contact.contact{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  contactinformation user.user
  userid INT [REF:>user.user.id,Note:"User can have 0 or many contacts"]
}

Table sender.sender{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  senderuser user.user
}

Table receiver.receiver{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  receiveruser user.user
}

Table message.message{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
  senderid INT [REF:> sender.sender.id,NOTE: "A sender can send 0 or more messages"]
  receiverid INT [REF:> receiver.receiver.id,NOTE: "A receiver can receive one or more messages from a sender"]
  content VARCHAR(215)
  messagesenddate TIMESTAMP [DEFAULT:`now()`]
  messageread bool [default:false]
  messagereaddate TIMESTAMP [default: NULL]
}

Table conversation.conversation{
  id INT [PRIMARY KEY, INCREMENT, NOT NULL]
}
```
