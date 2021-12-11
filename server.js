const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
	/**
	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
	 */

	const db_name = process.env.DB_NAME;
	const db_pass = process.env.DB_PASS;
	const uri = `mongodb+srv://${db_name}:${db_pass}@cluster0.chluz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		await client.connect();
		await listDatabases(client);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

async function listDatabases(client) {
	databasesList = await client.db().admin().listDatabases();
	console.log('Databases');
	databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

main().catch(console.error);
