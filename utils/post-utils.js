import marked from 'marked';
import readingTime from './reading-time';

export function withReadingTime(post) {
    return {
        ...post,
        readingTime: readingTime(post.body),
        body: undefined,
    };
}

export function withParsedHtml(post) {
    return { ...post, html: marked(post.body), body: undefined };
}
