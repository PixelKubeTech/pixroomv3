export {};

declare global {
    interface Window {
        ledController?: {
            postMessage: (message: string) => void;
        };
    }
}

