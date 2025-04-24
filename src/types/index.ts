export interface PageProps {
    params: {
        lang: 'en' | 'ru'
    }
    searchParams?: { [key: string]: string | string[] | undefined }
}
