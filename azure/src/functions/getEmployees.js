const { app } = require('@azure/functions');

app.http('home', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            // get the client
            const mysql = require('mysql2/promise');
            // create the connection
            const connection = await mysql.createConnection({
                host: 'mysql-uaqcloud.mysql.database.azure.com',
                user: 'developer',
                database: 'employees_sample',
                password: 'mysql-uaq-cloud-2023'
            });

            // query
            const [results,] = await connection.execute('SELECT id, name, department FROM employees');

            resultsJson = JSON.stringify(results);
            context.log(resultsJson)

            return { 
                body: resultsJson,
                headers: {
                    'Content-Type': 'application/json'
                } 
            }

        } catch (err) {
            context.log(`Connection error: ${err}`)
            return { status: 400 }
        }
    }
});
