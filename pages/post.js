import Error from 'next/error';
import Link from 'next/link';
import Head from 'next/head';
import { withParsedHtml, withReadingTime } from '../utils/post-utils';
import importAll from '../utils/import-all';
import Article from '../components/Article';
import Wrap from '../components/Wrap';
import Header from '../components/Header';
import frontMatter from '../utils/front-matter';

function Post(props) {
    if (!props.post) return <Error statusCode={404} />;

    const { attributes: attr } = props.post;

    return (
        <Wrap>
            <Head>
                <title>{attr.title} | Cezar Sampaio</title>
                <meta
                    name="description"
                    content={`${attr.title} - ${attr.preview}`}
                />
                {attr.keywords && (
                    <meta name="keywords" content={attr.keywords.join(',')} />
                )}
                <link
                    rel="canonical"
                    href={`https://cezarsampaio.dev/p/${attr.slug}`}
                />
            </Head>

            <Header />

            <main className="main-post">
                <Article {...props.post} />

                <div className="see-all">
                    <Link href="/" passHref prefetch>
                        <a>← see all posts</a>
                    </Link>
                </div>
            </main>

            <style jsx>{`
                .main-post {
                    padding-bottom: 150px;
                }

                .see-all {
                    text-align: center;
                }

                .see-all a {
                    color: var(--primary);
                    text-decoration: none;
                }

                .see-all a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </Wrap>
    );
}

Post.getInitialProps = async function(props) {
    const posts = importAll(require.context('../posts/', true, /\.md$/))
        .map(frontMatter)
        .map(withParsedHtml)
        .map(withReadingTime);

    const post = posts.find(post => post.attributes.slug === props.query.slug);

    return { post };
};

export default Post;
