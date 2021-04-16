const fs = require('fs')
const csv = require('fast-csv')
const Pool = require('pg').Pool

const pool = new Pool({
	host: 'localhost',
	user: 'vinit',
	database: 'csv-reader',
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

			const query =
				'INSERT INTO category (Region, Country, Item Type, Sales Channel,Order Priority,Order Date,Order ID,Ship Date,Units Sold,Unit Price,Unit Cost,Total Revenue,Total Cost,Total Profit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,)'

			pool.connect((err, client, done) => {
				if (err) throw err

				try {
					csvData.forEach((row) => {
						client.query(query, row, (err, res) => {
							if (err) {
								console.log(
									err.stack
								)
							} else {
								console.log(
									'inserted ' +
										res.rowCount +
										' row:',
									row
								)
							}
						})
					})
				} finally {
					res.send(
						`Successfully added Total ${rowCount} rows in database`
					)
					console.log(`${rowCount} rows`)
					done()
				}
			})
		})
}

const getData = (req, res) => {
	const query = 'SELECT * FROM users'

	pool.query(query, (error, results) => {
		if (error) {
			throw error
		}
		res.status(200).json(results.rows)
	})
}

module.exports = {
	uploadData,
	getData,
}
