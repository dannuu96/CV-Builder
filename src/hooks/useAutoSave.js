import { useEffect, useRef, useCallback } from 'react';
import { showToast } from '../components/UI/Toast';

export const useAutoSave = (data, key = 'cvBuilder-autoSave', delay = 30000) => {
  const timeoutRef = useRef(null);
  const lastSavedRef = useRef(null);

  const saveData = useCallback(async () => {
    try {
      const savePayload = {
        ...data,
        savedAt: new Date().toISOString(),
        version: '1.0'
      };
      
      localStorage.setItem(key, JSON.stringify(savePayload));
      lastSavedRef.current = Date.now();
      
      // Show subtle notification
      showToast.info('Auto-saved', 'Your work has been saved automatically');
    } catch (error) {
      console.error('Auto-save failed:', error);
      showToast.error('Auto-save failed', 'Unable to save your work automatically');
    }
  }, [data, key]);

  const debouncedSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      saveData();
    }, delay);
  }, [saveData, delay]);

  const manualSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    saveData();
  }, [saveData]);

  const loadSavedData = useCallback(() => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        const savedTime = new Date(parsed.savedAt);
        const now = new Date();
        const timeDiff = now - savedTime;
        
        // Only restore if saved within last 7 days
        if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    return null;
  }, [key]);

  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(key);
      showToast.success('Data cleared', 'Auto-saved data has been cleared');
    } catch (error) {
      console.error('Error clearing saved data:', error);
    }
  }, [key]);

  const getLastSavedTime = useCallback(() => {
    return lastSavedRef.current;
  }, []);

  // Auto-save when data changes
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      debouncedSave();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, debouncedSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Save before page unload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (data && Object.keys(data).length > 0) {
        manualSave();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [data, manualSave]);

  return {
    manualSave,
    loadSavedData,
    clearSavedData,
    getLastSavedTime,
    isAutoSaveEnabled: true
  };
}; 