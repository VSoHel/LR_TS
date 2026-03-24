import Loader from './loader';
import { LoaderOptions } from '../../types/interfaces';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;
        
        if (!apiUrl || !apiKey) {
            throw new Error('API_URL или API_KEY не определены в переменных окружения.');
        }
        
        super(apiUrl, {
            apiKey: apiKey,
        });
    }
}

export default AppLoader;