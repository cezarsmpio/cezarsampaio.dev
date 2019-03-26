import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends NextDocument {
    static async getInitialProps(ctx) {
        const initialProps = await NextDocument.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, user-scalable=no"
                    />
                    <meta charSet="utf-8" />
                    <style jsx global>{`
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
                        }

                        a {
                            transition: color 100ms;
                        }
                    `}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    <link
                        href="https://fonts.googleapis.com/css?family=Merriweather:400,900"
                        rel="stylesheet"
                    />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
