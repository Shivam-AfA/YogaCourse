import express from 'express';
import * as React from 'react';
import cors from 'cors';
import { database } from './src/firebase.mjs';
import {fileURLToPath} from 'url';
import path from 'path';


const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + "/publicS")));
const PORT = process.env.PORT || 4000;

app.get("/", async (req, res) => {
    const snapshot = await database.users.get();
    const list = snapshot.docs.map((obj) => ({ id: obj.id, ...obj.data() }));
    // console.log(list);
    // console.log((data));
    // await database.users.add(data);
    // res.send({msg: "User added"});
    res.send(list);
});

app.post("/create", async (req, res) => {
    const uid = req.body.id;
    // console.log(uid);
    // console.log(req.body.month);
    // const data = req.body;
    // console.log((data));
    await database.users.doc(`${uid}`).set(
        {
            "name": req.body.name,
            "email": req.body.email,
            "mobile": req.body.mobile,
            "age": req.body.age,
            "batch": req.body.batch,
            "month": req.body.month
        }
    );
    res.send({ msg: "User added", uid: uid});
});

app.post("/update", async (req, res) => {
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    await database.users.doc(id).update(data);
    res.send({ msg: "User updated" });
});

app.post("/delete", async (req, res) => {
    const id = req.body.id;
    await database.users.doc(id).delete();
    res.send({ msg: "User deleted" });
});

app.listen(PORT, () => console.log("Started on", PORT));