declare global {
    interface CloudflareEnv {
        AI: {
            run: (model: string, input: any) => Promise<any>;
        }
    }
}