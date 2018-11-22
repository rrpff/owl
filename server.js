const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const messages = []

app.get('/messages', (req, res) => {
  res.send({ messages })
})

app.post('/messages', (req, res) => {
  const { message } = req.body
  messages.push({ message, timestamp: Date.now() })

  res.status(201).send({ ok: true })
})

app.listen(3000, () => console.log('Listening on http://localhost:3000'))
