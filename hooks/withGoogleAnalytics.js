import { useEffect } from 'react';

function withGoogleAnalyticsPageView(props) {
    useEffect(function() {
        try {
            if (window.location.href.includes('localhost')) return;

            window.gtag('config', process.env.googleAnalyticsId, props);
        } catch (err) {}
    }, []);
}

export default withGoogleAnalyticsPageView;
