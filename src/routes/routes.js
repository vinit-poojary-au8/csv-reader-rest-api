const express = require('express')
const router = express.Router()
const controller = require('../controller/fileController')
const multer = require('multer')
const upload = multer({ dest: 'csv/' })

let routes = (app) => {
	router.post('/upload', upload.single('file'), controller.uploadData)
	router.get('/data', controller.getData)
	app.use(router)
}

module.exports = routes
