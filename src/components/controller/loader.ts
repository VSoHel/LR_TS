import { RequestParams, RequestOptions, LoaderOptions, NewsResponse, SourcesResponse } from '../../types/interfaces';

type CallbackFunction<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T = NewsResponse | SourcesResponse>(
        { endpoint, options = {} }: RequestParams,
        callback: CallbackFunction<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Извините, но произошла  ${res.status} ошибка: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: RequestOptions & LoaderOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key];
            if (value !== undefined) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: string,
        endpoint: string,
        callback: CallbackFunction<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;