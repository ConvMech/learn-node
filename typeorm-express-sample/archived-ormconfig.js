const type = process.env.TYPEORM_TYPE || 'postgres';
const username = process.env.TYPEORM_USERNAME || 'test';
const password = process.env.TYPEORM_PASSWORD || 'test';
const host = process.env.TYPEORM_HOST || 'test';
const port = parseInt(process.env.TYPEORM_PORT, 10) || 5432;
const database = process.env.TYPEORM_DATABASE || 'test';

module.exports = {
    type,
    url: process.env.DATABASE_URL ||
        `${type}://${username}:${password}@${host}:${port}/${database}`,
    entities: [
        process.env.NODE_ENV === 'test' ?
        'src/**/*.entity.ts' :
        'dist/**/*.entity.js',
    ],
    synchronize: true,
};