import pg from 'pg';

const { Client } = pg



const client = new Client({
    host: "localhost",
    user: "",
    port: 5432,
    password: "",
    database: "postgres"
})

export default client
