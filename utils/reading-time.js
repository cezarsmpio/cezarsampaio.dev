export default function readingTime(text = '') {
    return Math.ceil(text.split(/s/g).length / 200);
}
