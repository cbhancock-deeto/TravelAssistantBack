const mongoose = require('mongoose');
const route = require('./Routes/routing');
const express = require('express');
const app = express();
require('dotenv').config();

async function main() {
	/**
	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
	 */

	const db_name = process.env.DB_NAME;
	const db_pass = process.env.DB_PASS;
	const uri = `mongodb+srv://${db_name}:${db_pass}@cluster0.chluz.mongodb.net/travelAssistant?retryWrites=true&w=majority`;

	mongoose
		.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('DB connection successful'));

	app.use(express.json());
	app.use('/', route);

	const port = process.env.PORT || 8000;
	app.listen(port, () => {
		console.log(`App running on port ${port}...`);
	});
}

main().catch(console.error);
