declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: any;
      MONGO_URI: string;
    }
  }
}

export {};
