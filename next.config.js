const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withBundleAnalyzer({
    target: 'serverless',

    env: {
        googleAnalyticsId: 'UA-134779745-3',
    },

    webpack: config => {
        config.module.rules.push({
            test: /\.md$/i,
            loader: ['raw-loader'],
        });

        // config.context = path.resolve(__dirname, './posts');

        return config;
    },

    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),

    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),

    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
        },
    },
});
