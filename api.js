const express = require('express')
const parse = require('csv-parse')
const fs = require('fs')
const multer = require('multer')
const port = 5000
const baseUrl = `http://localhost:${port}/`
const initRoutes = require("./src/routes/routes");

global.__basedir = __dirname;


const app = express()

app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(express.static('public'))

app.get('/',(req,res)=> res.send('Api is running...'))

initRoutes(app)


app.listen(port, () => console.log(`Server started on port ${baseUrl}`))
