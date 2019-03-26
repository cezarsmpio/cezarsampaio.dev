import Head from 'next/head';
import importAll from '../utils/import-all';
import { withReadingTime } from '../utils/post-utils';
import frontMatter from '../utils/front-matter';
import Posts from '../components/Posts';
import Header from '../components/Header';
import Wrap from '../components/Wrap';

function Index(props) {
    return (
        <Wrap>
            <Head>
                <title>
                    Cezar Sampaio - Randomly writing about lovely things
                </title>
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
    const posts = importAll(require.context('../posts/', true, /\.md$/))
        .map(frontMatter)
        .map(withReadingTime);

    return { posts };
};

export default Index;
