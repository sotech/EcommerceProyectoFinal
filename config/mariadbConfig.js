const config = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: '3310',
        database: 'ecommerce'
    },
    pool: {
        min: 2,
        max: 10
    }
}

module.exports = {
    config
}