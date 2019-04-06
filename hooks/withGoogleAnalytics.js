import { useEffect } from 'react';

function withGoogleAnalyticsPageView(props) {
    useEffect(function() {
        try {
            window.gtag('config', process.env.googleAnalyticsId, props);
        } catch (err) {}
    }, []);
}

export default withGoogleAnalyticsPageView;
