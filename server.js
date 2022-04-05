// server.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api/:date?', (req, res) => {
  let { date } = req.params

  if (!date) {
    return res.json(getTimeStamp())
  }
  let nums = date.match(/\d/g)

  let isUnix = nums && nums.length === date.length
  let dateString = !isUnix
    ? String(new Date(date))
    : new Date(parseInt(date)).toString()

  if (dateString == 'Invalid Date') {
    return res.json({ error: 'Invalid Date' })
  }

  let [day, dt, mo, yr, time, ...rest] = dateString.split(' ')
  let utc = `${day}, ${mo} ${dt} ${yr} ${time} GMT`
  let unix = isUnix ? parseInt(date) : new Date(date).valueOf()
  return res.json({ unix, utc })
})

const getTimeStamp = () => {
  let unix = Date.now() || new Date().getTime()
  let [day, dt, mo, yr, time, ...rest] = Date(unix).split(' ')
  let utc = `${day}, ${mo} ${dt} ${yr} ${time} GMT`
  return { unix, utc }
}

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
