const Pool = require('pg').Pool

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	database: 'postgres',
	password: '123',
	port: 5432,
})

const upload = (req, res, csvData, rowCount) => {
	const query =
		'INSERT INTO sales (region, country, item_type, sales_channel,order_priority,order_date,order_id,ship_date,units_sold,unit_price,unit_cost,total_revenue,total_cost,total_profit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)'

	pool.connect((err, client, done) => {
		if (err) throw err

		try {
			csvData.forEach((row) => {
				client.query(query, [row], (err, res) => {
					if (err) {
						console.log(err.stack)
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
			res.send(`Successfully added Total ${rowCount} rows in database`)
			console.log(`${rowCount} rows`)
		} finally {
			done()
		}
	})
}

const data = (req, res) => {
	const query = 'SELECT * FROM sales'

	pool.query(query, (error, results) => {
		if (error) {
			throw error
		}
		res.status(200).json(results.rows)
	})
}

module.exports = { upload, data }
