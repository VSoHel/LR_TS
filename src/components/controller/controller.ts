import AppLoader from './appLoader';
import { NewsCallback, SourcesCallback, HTMLElementWithDataset } from '../../types/interfaces';

class AppController extends AppLoader {
    public getSources(callback: SourcesCallback): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: NewsCallback): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElementWithDataset | null;

        if (!target || !newsContainer) return;

        while (target !== newsContainer) {
            if (target.classList && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement | null;
            if (!target) return;
        }
    }
}

export default AppController;