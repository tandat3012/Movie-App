import React, { useState, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

function LazyImage({
    src,
    alt,
    className,
    placeholder = '/No-Poster.png',
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(placeholder);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    React.useEffect(() => {
        if (inView && src && currentSrc === placeholder) {
            setCurrentSrc(src);
        }
    }, [inView, src, currentSrc, placeholder]);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
        setHasError(false);
    }, []);

    const handleError = useCallback(() => {
        setHasError(true);
        setIsLoaded(false);
        if (currentSrc !== placeholder) {
            setCurrentSrc(placeholder);
        }
    }, [currentSrc, placeholder]);

    return (
        <div
            ref={ref}
            className={`lazy-image-container ${className || ''}`}
            {...props}
        >
            <img
                src={currentSrc}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                className={`lazy-image ${
                    isLoaded && currentSrc === src ? 'loaded' : ''
                } ${hasError ? 'error' : ''}`}
                loading="lazy"
            />
            {!isLoaded && currentSrc === src && (
                <div className="image-skeleton">
                    <div className="skeleton-animation"></div>
                </div>
            )}
        </div>
    );
}

export default LazyImage;
