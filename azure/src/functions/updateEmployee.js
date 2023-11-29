const { app } = require('@azure/functions');

app.http('update', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'update/{id}',
    handler: async (request, context) => {
        const body = await request.json()

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
            const [results,] = await connection.execute(
                'UPDATE employees SET name = ?, department = ? WHERE id = ?',
                [body.name, body.department, body.id]);

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
