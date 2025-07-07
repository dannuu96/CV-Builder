import React from 'react';

const Sidebar = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    {
      id: 'double-column',
      label: 'Double Column',
      description: 'Professional two-column layout',
    },
    {
      id: 'ivy-league',
      label: 'Ivy League',
      description: 'Sophisticated academic styling',
    },
    {
      id: 'contemporary',
      label: 'Contemporary',
      description: 'Modern business design',
    },
    {
      id: 'elegant',
      label: 'Elegant',
      description: 'Refined gold-accented design',
    },
    {
      id: 'creative',
      label: 'Creative',
      description: 'Bold pink creative layout',
    },
    {
      id: 'timeline',
      label: 'Timeline',
      description: 'Chronological teal timeline',
    },
    {
      id: 'minimal',
      label: 'Minimal',
      description: 'Clean and simple design',
    },
    {
      id: 'classic',
      label: 'Classic',
      description: 'Traditional professional style',
    },
    {
      id: 'compact',
      label: 'Compact',
      description: 'Space-efficient purple design',
    },
    {
      id: 'stylish',
      label: 'Stylish',
      description: 'Modern with blue accents',
    },
  ];

  return (
    <aside className="w-1/4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-tr-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        Choose Your Template
      </h2>

      {/* Template Grid */}
      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`
              p-4 rounded-lg cursor-pointer transition-all duration-300 transform
              ${
                selectedTemplate === template.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 hover:shadow-lg'
              }
            `}
          >
            <h3 className="font-bold text-lg mb-1">{template.label}</h3>
            <p className="text-sm opacity-80">{template.description}</p>
          </div>
        ))}
      </div>

      {/* Selected Template Info */}
      {selectedTemplate && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
          <h3 className="text-white font-bold text-center mb-2">
            Selected Template
          </h3>
          <p className="text-center text-blue-100 text-sm">
            {templates.find((t) => t.id === selectedTemplate)?.label}
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
