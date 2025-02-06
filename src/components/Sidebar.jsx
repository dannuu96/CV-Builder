import React from "react";
import classic from "./assets/images/classic.png";
import modern from "./assets/images/modern.png";
import vibrant from "./assets/images/vibrant.png";
import bold from "./assets/images/bold.png";

const Sidebar = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    { id: "classic", label: "Classic", image: classic },
    { id: "modern", label: "Modern", image: modern },
    { id: "vibrant", label: "Vibrant", image: vibrant },
    { id: "bold", label: "Bold", image: bold },
  ];

  // Find selected template data
  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  return (
    <aside className="w-1/4 bg-gradient-to-br from-gray-900 to-green-600 p-6 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Choose Your Template
      </h2>

      {/* Dropdown for selecting a template */}
      <select
        className="w-full p-3 rounded-lg border-2 border-transparent focus:border-white focus:ring-2 focus:ring-white transition duration-200 bg-white text-gray-800 font-medium"
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option value="" disabled>
          Select a template
        </option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.label}
          </option>
        ))}
      </select>

      {/* Show selected template image */}
      {selectedTemplateData && (
        <div className="mt-6 border border-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img
            src={selectedTemplateData.image}
            alt={selectedTemplateData.label}
            className="w-full h-auto object-cover mb-4 rounded"
          />
          <p className="text-center text-lg font-semibold text-white">
            {selectedTemplateData.label}
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
