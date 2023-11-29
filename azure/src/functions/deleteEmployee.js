const { app } = require('@azure/functions');

app.http('delete', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'delete/{id}',
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
            const [results,] = await connection.execute('DELETE FROM employees WHERE id = ?', [request.params.id]);

            context.log(results)
            return { status: 200, body: results }

        } catch (err) {
            context.log(`Connection error: ${err}`)
            return { status: 400 }
        }
    }
});
