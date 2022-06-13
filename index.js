const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')

require('./db')

const app = express()

app.use(express())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send('okk')
})

app.get('*',(req,res)=>{
    res.send('BAD_REQUEST')
})

port = config.get('port') || 8080

mongoose.connection.once('open',()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`)
    })
    console.log('DB CONNECTED')
})

