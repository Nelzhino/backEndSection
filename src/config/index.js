const { env } = process;
if (env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    PORT: env.PORT,
    MONGO_URI: env.MONGO_URI,
    APPLICATION_NAME: env.APPLICATION_NAME,
    JWT_SECRET: env.JWT_SECRET,
    CACHE_KEY: env.CACHE_KEY,
    SWAGGER_PATH: `../config/swagger/${env.SWAGGER_DOC}.json`
};