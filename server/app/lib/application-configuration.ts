export class ApplicationConfiguration {
    static Default():ApplicationConfiguration {
        const config = new ApplicationConfiguration();
        try {
            const port: number = Number.parseInt(process.env.PORT || '3000');
            config.port = port;
        } catch (e) {
            // do nothing
        }
        return config;
    }

    port: number = 3000;
}
