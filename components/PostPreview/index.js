import Link from 'next/link';

function PostPreview(props) {
    const { attributes: attr } = props;

    return (
        <section className="preview">
            <h1 className="preview__title">
                <Link href={`/post/${attr.slug}`} passHref prefetch>
                    <a className="preview__link" title={attr.title}>
                        {attr.title}
                    </a>
                </Link>
            </h1>
            {attr.preview && <p className="preview__desc">{attr.preview}</p>}
            <p className="preview__meta">
                <time>
                    {new Date(attr.created_at).toLocaleDateString('en', {
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
                <span> - </span>
                <span>{props.readingTime} min read</span>
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
