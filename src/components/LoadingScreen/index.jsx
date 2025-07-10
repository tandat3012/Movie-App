function LoadingScreen({ isExit }) {
    return (
        <div className={`loading-screen ${isExit ? 'exit' : ''}`}>
            <div className="loading-content">
                <div className="loading-logo">
                    <img src="/Logo.png" alt="Logo" />
                </div>
                <h1 className="loading-title">
                    Bringing Cinema to Your Screen
                </h1>
            </div>
        </div>
    );
}

export default LoadingScreen;
