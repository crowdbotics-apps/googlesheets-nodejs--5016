const express = require('express')
const GoogleSpreadsheets = require('google-spreadsheets')

require('dotenv').config()

const app = express()
const port = 8000
let charts

GoogleSpreadsheets(
	{
		key: process.env.SPREADSHEET_KEY
	},
	function(err, spreadsheet) {
		spreadsheet.worksheets[0].cells(
			{
				// grab all the data
				range: 'R1C1:R9C06'
			},
			function(err, result) {
				// Put in-memory store for now
				charts = result.cells
			}
		)
	}
)

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
})

app.get('/charts', (req, res) => {
	res.send(charts)
})

app.listen(8000, () => {
	console.log(`App is running on port ${port}.`)
})
