const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins([withBundleAnalyzer, withOptimizedImages], {
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
