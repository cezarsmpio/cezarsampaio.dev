import marked from 'marked';
import readingTime from './reading-time';

export function withReadingTime(post) {
    return {
        ...post,
        readingTime: readingTime(post.body),
    };
}

export function withParsedHtml(post) {
    return { ...post, html: marked(post.body) };
}

export function withNoBody(post) {
    return { ...post, body: undefined };
}
