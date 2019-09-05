module.exports = {
    env: 'dev',
    port: 3306,
    mysql: {
        aws: {
            host: 'aats487qjcgqlk.cnzpbbuapk9p.us-east-2.rds.amazonaws.com',
            username: 'admin',
            database: 'dba',
            password: 'admin123',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }
    },
    s3: {
        signatureVersion: 'v4',
        apiVersion: '2006-03-01',
        region: 'us-east-2'
    },

    keys: {
        jwt: "cs407summer19modworkshop"
    }
}