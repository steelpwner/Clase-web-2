const express = require('express')
const bodyParser = require("body-parser")
const UserService = require("./services/users");
const app = express()
app.use(bodyParser.json())

const usersService = new UserService();

const configuracion = require("./config/config");


require("./models/index");

app.get('/', (req, res) => {
  res.send('Hello World Diego!')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Ha consultado el index en POST!')
})

app.get('/logout', (req, res) => {
  console.log(req)
  res.send('Ha cerrado sesión correctamente')
})

app.get('/users/:id', async (req, res) => {
    const users = await usersService.getUser(req.params.id);
    res.send(users)
})


app.delete('/users/:id', async (req, res) => {
    const result = await usersService.deleteUser(req.params.id);
    res.send(result)
})

app.put('/users/:id', async (req, res) => {
    const body = req.body
    const result = await usersService.updateUser(req.params.id, body);
    res.send(result)
})

app.post('/users/getUsers', async (req, res) => {
    const body = req.body
    const users = await usersService.getUsers(body);
    res.send(users)
})

app.post('/users/', async (req, res) => {
    const body = req.body
    const result = await usersService.createUser(body);
    res.send(result)
})

app.listen(configuracion.appPort, () => {
  console.log(`Example app listening on port http://localhost:${configuracion.appPort}`)
})