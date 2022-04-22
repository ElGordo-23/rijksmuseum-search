declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_KEY: string;
  }
}

declare module '*.json' {
  const value: any;
  export default value;
}
