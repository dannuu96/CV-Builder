import React, { createContext, useContext, useEffect, useState } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [screenReaderAnnouncements, setScreenReaderAnnouncements] = useState([]);

  // Detect keyboard usage
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        document.body.classList.add('keyboard-user');
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      document.body.classList.remove('keyboard-user');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Handle high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Handle font size
  useEffect(() => {
    document.body.className = document.body.className.replace(/font-size-\w+/g, '');
    document.body.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  // Screen reader announcements
  const announce = (message, priority = 'polite') => {
    setScreenReaderAnnouncements(prev => [
      ...prev,
      { id: Date.now(), message, priority }
    ]);

    // Remove announcement after 5 seconds
    setTimeout(() => {
      setScreenReaderAnnouncements(prev => 
        prev.filter(announcement => announcement.id !== Date.now())
      );
    }, 5000);
  };

  // Skip link functionality
  const skipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Alt + 1: Skip to main content
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        skipToContent();
      }
      
      // Alt + H: Go to home
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        window.location.href = '/';
      }

      // Alt + S: Save (if on form page)
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const saveButton = document.querySelector('[data-save-button]');
        if (saveButton) {
          saveButton.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const value = {
    isKeyboardUser,
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    announce,
    skipToContent,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {/* Skip Links */}
      <div className="sr-only">
        <a
          href="#main-content"
          className="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          onClick={(e) => {
            e.preventDefault();
            skipToContent();
          }}
        >
          Skip to main content
        </a>
      </div>

      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {screenReaderAnnouncements
          .filter(a => a.priority === 'polite')
          .map(announcement => (
            <div key={announcement.id}>{announcement.message}</div>
          ))}
      </div>
      
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {screenReaderAnnouncements
          .filter(a => a.priority === 'assertive')
          .map(announcement => (
            <div key={announcement.id}>{announcement.message}</div>
          ))}
      </div>

      {/* Accessibility Toolbar */}
      <div className="fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-2 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 sr-only">Accessibility Options</h3>
        
        <button
          onClick={() => setHighContrast(!highContrast)}
          className="w-full text-left px-2 py-1 text-xs hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-pressed={highContrast}
        >
          {highContrast ? '🔆' : '🌓'} High Contrast
        </button>
        
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="w-full text-xs border border-gray-300 rounded px-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Font size"
        >
          <option value="small">Small Text</option>
          <option value="medium">Medium Text</option>
          <option value="large">Large Text</option>
          <option value="xl">Extra Large Text</option>
        </select>
      </div>

      {children}
    </AccessibilityContext.Provider>
  );
}; 