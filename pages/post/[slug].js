import Error from 'next/error';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import {
    withParsedHtml,
    withReadingTime,
    withNoBody,
} from '../../utils/post-utils';
import frontMatter from '../../utils/front-matter';
import compose from '../../utils/compose';
import withGoogleAnalyticsPageView from '../../hooks/withGoogleAnalytics';
import Article from '../../components/Article';
import Wrap from '../../components/Wrap';
import Header from '../../components/Header';

function Post(props) {
    if (!props.post) return <Error statusCode={404} />;

    const { attributes: attr } = props.post;
    const pageTitle = `${attr.title} | Cezar Sampaio`;
    const pageDescription = `${attr.title} - ${attr.preview}`;

    withGoogleAnalyticsPageView({
        page_location: props.router.asPath,
        page_path: props.router.asPath,
        page_title: pageTitle,
    });

    return (
        <Wrap>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
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
    try {
        const post = require('../../posts/' + props.query.slug + '.md').default;

        return {
            post: compose(
                withNoBody,
                withReadingTime,
                withParsedHtml,
                frontMatter,
            )(post),
        };
    } catch (err) {
        return { post: false };
    }
};

export default withRouter(Post);
