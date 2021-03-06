import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends NextDocument {
    static async getInitialProps(ctx) {
        const initialProps = await NextDocument.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en-us">
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, user-scalable=no"
                    />
                    <meta name="robots" content="index, follow" />
                    <meta charSet="utf-8" />
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        :root {
                            --primary: #b48c68;
                            --black: #000;
                            --text: #000;
                            --gray: #6e6e6e;
                            --lightGray: #f8f8f8;
                        }

                        body {
                            font-family: 'Merriweather', serif;
                            font-size: 16px;
                            color: var(--text);
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;

                            border-top: 10px solid var(--primary);
                        }

                        a {
                            transition: color 100ms;
                        }
                    `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    <link
                        href="https://fonts.googleapis.com/css?family=Merriweather:400,900"
                        rel="stylesheet"
                    />
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${
                            process.env.googleAnalyticsId
                        }`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${
                                    process.env.googleAnalyticsId
                                }');`,
                        }}
                    />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
