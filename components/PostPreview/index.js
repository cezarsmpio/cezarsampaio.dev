import Link from 'next/link';
import readingTime from '../../utils/reading-time';

function PostPreview(props) {
    const { fields, sys } = props;

    return (
        <section className="preview">
            <h1 className="preview__title">
                <Link href={`/post/${fields.slug}`} passHref>
                    <a className="preview__link" title={fields.title}>
                        {fields.title}
                    </a>
                </Link>
            </h1>
            {fields.shortDescription && <p className="preview__desc">{fields.shortDescription}</p>}
            <p className="preview__meta">
                <time>
                    {new Date(fields.date).toLocaleDateString('en', {
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
                <span> - </span>
                <span>{readingTime(fields.content)} min read</span>
            </p>

            <style jsx>{`
                .preview:not(:last-child) {
                    margin-bottom: 70px;
                }

                .preview__title {
                    font-weight: 900;
                    font-size: 24px;
                }

                .preview__link {
                    text-decoration: none;
                    color: var(--primary);
                }

                .preview__link:hover {
                    text-decoration: underline;
                }

                .preview__desc {
                    margin-top: 5px;

                    font-size: 14px;
                }

                .preview__meta {
                    margin-top: 20px;

                    font-size: 12px;
                    color: var(--gray);
                }
            `}</style>
        </section>
    );
}

export default PostPreview;
