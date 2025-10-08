import express from 'express'
import dotenv from 'dotenv'
import router from './routes/routes.js'
import cors from 'cors'
import errorHandler from './error/errorhandler.js'
import connectDatabase from './db_config/db_connection.js'

dotenv.config()

const app = express()
const port = process.env.PORT

connectDatabase()

app.use(cors())
app.use(express.json())

app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server Listening on PORT : ${port}`)
})
