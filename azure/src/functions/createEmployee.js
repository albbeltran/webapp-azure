const { app } = require('@azure/functions');

app.http('create', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = await request.json()

        try {
            // get the client5
            const mysql = require('mysql2/promise');
            // create the connection    
            const connection = await mysql.createConnection({
                host: 'mysql-uaqcloud.mysql.database.azure.com',
                user: 'developer',
                database: 'employees_sample',
                password: 'mysql-uaq-cloud-2023'
            });
            
            // query
            const [results,] = await connection.execute("INSERT INTO employees_sample.employees(id,name,password,department) VALUES (?, ?, ?, ?)",
                [body.id, body.name, body.password, body.department]);

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
