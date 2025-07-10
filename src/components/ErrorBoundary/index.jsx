import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

function ErrorBoundary({ children, fallback, onRetry }) {
    const [hasError, setHasError] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const handleError = (error) => {
            setHasError(true);
            setError(error);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleError);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleError);
        };
    }, []);

    const handleRetry = () => {
        setHasError(false);
        setError(null);
        if (onRetry) {
            onRetry();
        }
    };

    if (hasError) {
        if (fallback) {
            return fallback;
        }

        return (
            <div className="error-boundary">
                <div className="error-content">
                    <AlertCircle size={48} className="error-icon" />
                    <h2>Oops! Something went wrong</h2>
                    <p>We're sorry, but something unexpected happened.</p>
                    {error && (
                        <details className="error-details">
                            <summary>Error details</summary>
                            <pre>{error.toString()}</pre>
                        </details>
                    )}
                    <button onClick={handleRetry} className="retry-button">
                        <RefreshCw size={20} />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return children;
}

export default ErrorBoundary;
