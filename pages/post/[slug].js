import Error from 'next/error';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { createClient } from 'contentful';
import withGoogleAnalyticsPageView from '../../hooks/withGoogleAnalytics';
import Article from '../../components/Article';
import Wrap from '../../components/Wrap';
import Header from '../../components/Header';

function Post(props) {
    if (!props.post) return <Error statusCode={404} />;

    const { fields, sys } = props.post;
    const pageTitle = `${fields.title} | Cezar Sampaio`;
    const pageDescription = `${fields.title} - ${fields.shortDescription}`;

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
                {fields.keywords && (
                    <meta name="keywords" content={fields.keywords} />
                )}
                <link
                    rel="canonical"
                    href={`https://cezarsampaio.dev/post/${fields.slug}`}
                />
            </Head>

            <Header />

            <main className="main-post">
                <Article {...props.post} />

                <div className="see-all">
                    <Link href="/" passHref>
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

export async function getStaticPaths() {
    const blog = createClient({
        space: process.env.contentfulBlogSpaceId,
        accessToken: process.env.contentfulAccessToken,
    });

    const posts = await blog.getEntries({
        content_type: 'post',
        order: '-fields.date'
    });

    return { 
        paths: posts.items.map(post => ({
            params: {
                slug: post.fields.slug
            }
        })),
        fallback: false
    };
}

export async function getStaticProps(props) {
    try {
        const blog = createClient({
            space: process.env.contentfulBlogSpaceId,
            accessToken: process.env.contentfulAccessToken,
        });
    
        const posts = await blog.getEntries({
            content_type: 'post',
            'fields.slug': props.params.slug,
        });

        return { 
            props: {
                post: posts.items[0]
            } 
        };
    } catch (err) {
        return { 
            props: {
                post: false 
            }
        };
    }
};

export default withRouter(Post);
