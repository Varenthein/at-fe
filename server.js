const express = require('express')
const cors = require('cors')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())
app.use(cors())

app.use(express.static(path.join(__dirname, '/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.listen(3000)
