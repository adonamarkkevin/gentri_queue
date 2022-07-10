declare namespace NodeJS {
    interface ProcessEnv {
        SALT_ROUNDS: string;
        ACCESS_TOKEN_SECRET: string;
        PORT: string;
    }
}
