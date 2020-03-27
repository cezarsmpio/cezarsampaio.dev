import Head from 'next/head';
import { createClient } from 'contentful';
import { withRouter } from 'next/router';
import Posts from '../components/Posts';
import Header from '../components/Header';
import Wrap from '../components/Wrap';
import withGoogleAnalyticsPageView from '../hooks/withGoogleAnalytics';

function Index(props) {
    const pageTitle = 'Cezar Sampaio - Randomly writing about lovely things';

    withGoogleAnalyticsPageView({
        page_location: props.router.asPath,
        page_path: props.router.asPath,
        page_title: pageTitle,
    });

    return (
        <Wrap>
            <Head>
                <title>{pageTitle}</title>
                <meta
                    name="description"
                    content="Blog of Cezar Sampaio, mainly talking about development, photography, people management, daily life and so on."
                />
                <meta
                    name="keywords"
                    content="cezar sampaio, cezar, blog, development, frontend, backend, photography, people, management"
                />
                <link rel="canonical" href="https://cezarsampaio.dev" />
            </Head>

            <Header />

            <main>
                <Posts posts={props.posts} />
            </main>
        </Wrap>
    );
}

Index.getInitialProps = async function() {
    const blog = createClient({
        space: process.env.contentfulBlogSpaceId,
        accessToken: process.env.contentfulAccessToken,
    });

    const posts = await blog.getEntries({
        content_type: 'post',
        order: '-fields.date'
    });

    return { posts: posts.items };
};

export default withRouter(Index);
