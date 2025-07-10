import React from 'react';
import { Loader2 } from 'lucide-react';

function LoadingSpinner({ size = 40, text = 'Loading...' }) {
    return (
        <div
            className="loading-spinner-container"
            role="status"
            aria-label={text}
        >
            <div className="loading-spinner">
                <Loader2 size={size} className="animate-spin" />
            </div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
}

export default LoadingSpinner;
