import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ClassicTemplate from "../components/Templates/ClassicTemplate";
import ModernTemplate from "../components/Templates/ModernTemplate";
import VibrantTemplate from "../components/Templates/VibrantTemplate";
import ElegantTemplate from "../components/Templates/ElegantTemplate";
import BoldTemplate from "../components/Templates/BoldTemplate";
import SidebarTemplate from "../components/Templates/NewTemplate";

const LivePreview = ({ formData, selectedTemplate }) => {
  const templates = {
    modern: ModernTemplate,
    vibrant: VibrantTemplate,
    elegant: ElegantTemplate,
    bold: BoldTemplate,
    classic: ClassicTemplate,
    new: SidebarTemplate,
  };

  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-amber-50 p-6 rounded-xl shadow-2xl">
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-gray-900 rounded-lg overflow-hidden">
        <PDFViewer width="100%" height="28%">
          <SelectedTemplate data={formData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default LivePreview;
