import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CV Builder Error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-yellow-500 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              Don't worry, your CV data is safe. We've encountered an unexpected
              error.
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Reload Page
              </button>
              <button
                onClick={() =>
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  })
                }
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Show Error Details
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-700 overflow-auto max-h-40">
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  <pre>{this.state.errorInfo?.componentStack || ''}</pre>
                </div>
              </details>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
