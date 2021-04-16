const fs = require('fs')
const csv = require('fast-csv')
const Pool = require('pg').Pool
const middleware = require('../middleware/db')

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	database: 'postgres',
	password: '123',
	port: 5432,
})

const uploadData = (req, res) => {
	let csvData = []

	fs.createReadStream(req.file.path)
		.pipe(csv.parse({ headers: true, maxRows: 5 }))
		.on('error', (error) => {
			res.send(error)
			console.error(error)
		})
		.on('data', (row) => {
			csvData.push(row)
			console.log(row)
		})
		.on('end', (rowCount) => {
			csvData.shift()

			middleware.upload(req, res, csvData, rowCount)
		})
}

const getData = (req, res) => {
	middleware.data(req, res)
}

module.exports = {
	uploadData,
	getData,
}
