function ArticleContent(props) {
    return (
        <>
            <section
                className="content"
                dangerouslySetInnerHTML={{ __html: props.children }}
            />
            <style jsx global>{`
                .content p,
                .content li,
                .content blockquote,
                .content pre {
                    line-height: 2;
                }

                .content p,
                .content hr,
                .content iframe,
                .content table,
                .content .gist,
                .content blockquote,
                .content pre,
                .content ul,
                .content ol {
                    margin-bottom: 35px;
                }

                .content h1,
                .content h2,
                .content h3,
                .content h4,
                .content h5,
                .content h6 {
                    margin-bottom: 20px;

                    color: var(--primary);
                }

                .content h1 {
                    font-size: 40px;
                }
                .content h2 {
                    font-size: 36px;
                }
                .content h3 {
                    font-size: 32px;
                }
                .content h4 {
                    font-size: 28px;
                }
                .content h5 {
                    font-size: 24px;
                }
                .content h6 {
                    font-size: 20px;
                }

                .content a {
                    font-weight: 900;

                    color: var(--primary);
                }

                .content a:hover {
                    text-decoration: none;
                }

                .content p code {
                    color: var(--primary);
                }

                .content p code:after,
                .content p code:before {
                    content: '\`';
                }

                .content img,
                .content .gist,
                .content pre {
                    max-width: 120%;
                    height: auto;
                    margin-left: -10%;
                    margin-right: -10%;
                }

                .content pre {
                    padding: 15px;
                    overflow: auto;
                    -webkit-overflow-scrolling: touch;

                    color: #fff;

                    border: 1px solid #0d3a58;
                    background-color: #193549;
                }

                .content blockquote {
                    margin-top: 100px;
                    margin-bottom: 100px;
                    padding-left: 15%;

                    color: var(--gray);
                    font-size: 24px;
                }

                .content table {
                    width: 100%;
                }

                .content table thead th {
                    padding: 15px 10px;

                    color: var(--primary);
                }

                .content table tbody tr:nth-child(odd) {
                    background-color: var(--lightGray);
                }

                .content table tbody td {
                    padding: 15px 10px;
                }

                @media screen and (max-width: 768px) {
                    .content iframe {
                        max-width: 100%;
                    }

                    .content ul,
                    .content ol {
                        padding-left: 20px;
                    }

                    .content img,
                    .content .gist,
                    .content pre {
                        max-width: 100%;
                        height: auto;
                        margin-left: 0;
                        margin-right: 0;
                    }

                    .content blockquote {
                        margin-top: 60px;
                        margin-bottom: 60px;
                        padding-left: 10%;

                        font-size: 18px;
                    }
                }
            `}</style>
        </>
    );
}

function Article(props) {
    const { attributes: attr } = props;

    return (
        <article className="article">
            <h1 className="article__title">{attr.title}</h1>
            <p className="article__desc">{attr.preview}</p>
            <p className="article__meta">
                <time>
                    {new Date(attr.created_at).toLocaleDateString('en', {
                        month: 'long',
                        day: 'numeric',
                    })}
                </time>
                <span> - </span>
                <span>{props.readingTime} min read</span>
            </p>

            <div className="article__content">
                <ArticleContent>{props.html}</ArticleContent>
            </div>

            <style jsx>{`
                .article {
                    max-width: 615px;
                    margin: 0 auto;
                }

                .article__title {
                    font-size: 44px;
                    color: var(--primary);
                }

                .article__desc {
                    margin-top: 10px;

                    font-size: 18px;
                }

                .article__meta {
                    margin-top: 30px;

                    font-size: 12px;
                    color: var(--gray);
                }

                .article__content {
                    margin-top: 50px;
                    margin-bottom: 50px;
                    padding-top: 50px;

                    border-top: 1px solid var(--lightGray);
                }

                @media screen and (max-width: 768px) {
                    .article__title {
                        font-size: 32px;
                    }

                    .article__content {
                        margin-top: 25px;
                        padding-top: 25px;
                    }
                }
            `}</style>
        </article>
    );
}

export default Article;
