export const config = () => ({
  port: Number(process.env.PORT),
  jwtAccess: process.env.JWT_ACCESS_SECRET,
  jwtRefresh: process.env.JWT_REFRESH_SECRET,

  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
});
