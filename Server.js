const express = require('express');
const mongoose = require('mongoose');
const Rooms = require('./dbRooms');
const app = express()
const cors=require('cors');//for cors orgin policy
const Messages = require('./dbMessage');
const Pusher = require("pusher");


app.use(express.json());
app.use(cors())

const pusher = new Pusher({
  appId: "1343466",
  key: "56fc8ad686887feca24c",
  secret: "2d7d0ac7167e928b16f2",
  cluster: "ap2",
  useTLS: true
});
 
const dbUrl = "mongodb+srv://suba:suba@streamapps.gpmyi.mongodb.net/whatsappclone?retryWrites=true&w=majority";
mongoose.connect(dbUrl)

const db = mongoose.connection;
db.once("open", () => {
    console.log("connected");

    const roomCollection = db.collection("rooms");
    const changeStream = roomCollection.watch();
    changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const roomDetails = change.fullDocument;
            pusher.trigger("rooms", "inserted", roomDetails);
        }
        else
        {
            console.log("Not expexted event to trigger")
         }
    })

    const msgCollection = db.collection("messages");
    const changeStream1 = msgCollection.watch();
    changeStream1.on("change", (change) => {
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", messageDetails);
        }
        else
        {
            console.log("Not expexted event to trigger")
         }
    })



})

app.get(('/'), (req, res) => {
    res.send("hello this is backend")
})

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(201).send(data);
        }
    })
})

app.post("/group/create", (req, res) => {
    const name = req.body.groupName;
    Rooms.create({ name }, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(201).send(data);
        }
    })
})

app.get("/all/rooms", (req, res) => {
    Rooms.find({}, (err, data) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            return res.status(201).send(data)
        }
    })
})
app.get("/room/:id", (req, res) => {
    Rooms.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            console.log(data[0])
            return res.status(200).send(data[0]);
        }
    })
})
app.get("/messages/:id", (req, res) => {
    Messages.find({ roomId: req.params.id }, (err, data) => {
        if (err) {
           return res.status(500).send(err);
        }
        else {
            
            return res.status(200).send(data);
        }
    })
})

app.listen(5000, () => { 
    console.log("yyyy")
});//localhost:5000
console.log("heii")