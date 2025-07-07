import { pdf } from '@react-pdf/renderer';
import { showToast } from '../components/UI/Toast';

// Export formats
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  JSON: 'json',
  TXT: 'txt',
  HTML: 'html'
};

// Export CV as PDF
export const exportToPDF = async (templateComponent, formData, filename = 'resume') => {
  try {
    const blob = await pdf(templateComponent).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast.success('PDF Downloaded', 'Your CV has been downloaded successfully');
    
    // Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cv_download', {
        event_category: 'engagement',
        event_label: 'pdf_export',
        value: 1
      });
    }
  } catch (error) {
    console.error('PDF export failed:', error);
    showToast.error('Export Failed', 'Could not export your CV as PDF');
  }
};

// Export CV as JSON
export const exportToJSON = (formData, filename = 'resume-data') => {
  try {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `${filename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast.success('Data Exported', 'Your CV data has been exported as JSON');
  } catch (error) {
    console.error('JSON export failed:', error);
    showToast.error('Export Failed', 'Could not export your CV data');
  }
};

// Export CV as plain text
export const exportToText = (formData, filename = 'resume') => {
  try {
    let textContent = '';
    
    // Personal Info
    if (formData.personalInfo) {
      textContent += `${formData.personalInfo.fullName}\n`;
      textContent += `${formData.personalInfo.jobTitle}\n`;
      textContent += `Email: ${formData.personalInfo.email}\n`;
      textContent += `Phone: ${formData.personalInfo.phone}\n`;
      if (formData.personalInfo.address) {
        textContent += `Address: ${formData.personalInfo.address}\n`;
      }
      textContent += '\n';
    }
    
    // About Me
    if (formData.personalInfo?.aboutMe) {
      textContent += 'ABOUT ME\n';
      textContent += '--------\n';
      textContent += `${formData.personalInfo.aboutMe}\n\n`;
    }
    
    // Experience
    if (formData.experience?.length > 0) {
      textContent += 'EXPERIENCE\n';
      textContent += '----------\n';
      formData.experience.forEach(exp => {
        textContent += `${exp.jobTitle} at ${exp.company}\n`;
        textContent += `Duration: ${exp.duration}\n`;
        if (exp.description) {
          textContent += `${exp.description}\n`;
        }
        textContent += '\n';
      });
    }
    
    // Education
    if (formData.education?.length > 0) {
      textContent += 'EDUCATION\n';
      textContent += '---------\n';
      formData.education.forEach(edu => {
        textContent += `${edu.degree} - ${edu.institution}\n`;
        textContent += `Year: ${edu.graduationYear}\n\n`;
      });
    }
    
    // Skills
    if (formData.lists?.skills?.length > 0) {
      textContent += 'SKILLS\n';
      textContent += '------\n';
      textContent += formData.lists.skills.join(', ') + '\n\n';
    }
    
    // Languages
    if (formData.lists?.languages?.length > 0) {
      textContent += 'LANGUAGES\n';
      textContent += '---------\n';
      textContent += formData.lists.languages.join(', ') + '\n\n';
    }
    
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `${filename}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast.success('Text Exported', 'Your CV has been exported as plain text');
  } catch (error) {
    console.error('Text export failed:', error);
    showToast.error('Export Failed', 'Could not export your CV as text');
  }
};

// Import CV from JSON
export const importFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
        showToast.success('Data Imported', 'Your CV data has been imported successfully');
      } catch (error) {
        reject(error);
        showToast.error('Import Failed', 'Could not import the JSON file');
      }
    };
    reader.readAsText(file);
  });
};

// Share CV functionality
export const shareCV = async (formData, templateComponent) => {
  try {
    if (navigator.share) {
      // Use Web Share API if available
      await navigator.share({
        title: `${formData.personalInfo?.fullName || 'My'} CV`,
        text: 'Check out my professional CV created with CV Builder',
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      const shareText = `Check out my professional CV: ${window.location.href}`;
      await navigator.clipboard.writeText(shareText);
      showToast.success('Link Copied', 'CV link has been copied to clipboard');
    }
  } catch (error) {
    console.error('Share failed:', error);
    showToast.error('Share Failed', 'Could not share your CV');
  }
};

// Generate shareable link
export const generateShareableLink = (formData) => {
  try {
    const encodedData = btoa(JSON.stringify(formData));
    const baseUrl = window.location.origin;
    return `${baseUrl}/form?data=${encodedData}`;
  } catch (error) {
    console.error('Link generation failed:', error);
    return null;
  }
};

// Email CV functionality
export const emailCV = (formData) => {
  const subject = `CV - ${formData.personalInfo?.fullName || 'Resume'}`;
  const body = `Hi,\n\nPlease find attached my CV.\n\nBest regards,\n${formData.personalInfo?.fullName || 'Your Name'}`;
  
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

// Print CV functionality
export const printCV = () => {
  window.print();
};

// Analytics tracking
export const trackExport = (format, success = true) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'cv_export', {
      event_category: 'engagement',
      event_label: format,
      value: success ? 1 : 0
    });
  }
};

// Save to cloud (placeholder for future implementation)
export const saveToCloud = async (formData) => {
  // This would integrate with services like Google Drive, Dropbox, etc.
  showToast.info('Coming Soon', 'Cloud save functionality will be available soon');
};

export default {
  exportToPDF,
  exportToJSON,
  exportToText,
  importFromJSON,
  shareCV,
  generateShareableLink,
  emailCV,
  printCV,
  trackExport,
  saveToCloud
}; 