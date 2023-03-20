declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: any;
    }
  }
}

export {};
