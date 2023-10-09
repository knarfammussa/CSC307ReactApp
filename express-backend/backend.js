import express from "express";
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 8000;
// const uuid = require('uuid');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users['users_list'];
    if (name != undefined){
        if (job != undefined) {
            result = findUserByNameAndJob(name, job)
        }
        else {
            result = findUserByName(name);
        }
    }
    result = {users_list: result};
    res.send(result);
});

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] == name);
}

const findUserByNameAndJob = (name, job) => {
    return users['users_list'].filter( (user) => user['name'] === name).filter( (user) => user['job'] === job);
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = (generateID());
    addUser(userToAdd);
    //res.send(userToAdd);
    res.status(201).send(userToAdd);
});

function addUser(user) {
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const indexToDelete = users['users_list'].findIndex((user) => user.id === userId);
    if (indexToDelete === -1) {
        return res.status(404).json({message: 'User not found'});
    }
    deleteUser(indexToDelete)
    res.status(204).end();
});

function deleteUser(user) {
    users['users_list'].splice(user, 1);
}

function generateID() {
    return uuidv4();
}