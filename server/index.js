require('dotenv').config()
const express = require('express')
// const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')
const whatsAppClient = require("@green-api/whatsapp-api-client");


const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
// app.use(errorHandler)


// app.get('/', (req ,res) => {
//     res.status(200).json({message: 'TK UVENTA 200 OK'})
// })
// app.use(express.static(path.resolve(__dirname, '../client/build')));
// app.get('/*', (req ,res) => {
    // res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// })


// const webHookAPI = whatsAppClient.webhookAPI(app, '/api/other')
// webHookAPI.onIncomingMessageText((data, idInstance, idMessage, sender, typeMessage, textMessage) => {
//     console.log(`Incoming Notification data ${JSON.stringify(data)}`)
// });


const start = async () => {
    try {
        // await sequelize.authenticate()
        // await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
