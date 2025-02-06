import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ClassicTemplate from "../components/Templates/ClassicTemplate";
import ModernTemplate from "../components/Templates/ModernTemplate";
import VibrantTemplate from "../components/Templates/VibrantTemplate";
import ElegantTemplate from "../components/Templates/ElegantTemplate";
import BoldTemplate from "../components/Templates/BoldTemplate";
import Sidebar from "../components/Sidebar";

const CVForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    skills: [""],
    education: [{ degree: "", institution: "", graduationYear: "" }],
    experience: [{ jobTitle: "", company: "", duration: "" }],
    interests: [""],
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value, category) => {
    const updatedArray = [...formData[category]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [category]: updatedArray });
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = [...formData.interests];
    updatedInterests[index] = value;
    setFormData({ ...formData, interests: updatedInterests });
  };

  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addField = (category, newField) => {
    setFormData({ ...formData, [category]: [...formData[category], newField] });
  };

  // Render the selected PDF template
  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate data={formData} />;
      case "vibrant":
        return <VibrantTemplate data={formData} />;
      case "elegant":
        return <ElegantTemplate data={formData} />;
      case "bold":
        return <BoldTemplate data={formData} />;
      default:
        return <ClassicTemplate data={formData} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
      <div className="w-3/4 p-6 bg-white">
        <h1 className="text-2xl font-bold text-center mb-6">Create Your CV</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsGenerated(true);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Personal Details */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "fullName",
                "email",
                "phone",
                "address",
                "linkedin",
                "github",
              ].map((field, index) => (
                <input
                  key={index}
                  name={field}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder={`Enter your ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                {["jobTitle", "company", "duration"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                    value={exp[field]}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        field,
                        e.target.value,
                        "experience"
                      )
                    }
                    required
                  />
                ))}
              </div>
            ))}
            <button
              type="button"
              className="text-white bg-blue-700 rounded px-3 py-2 mt-2"
              onClick={() =>
                addField("experience", {
                  jobTitle: "",
                  company: "",
                  duration: "",
                })
              }
            >
              Add More Experience
            </button>
          </div>

          {/* Education */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                {["degree", "institution", "graduationYear"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                    value={edu[field]}
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        field,
                        e.target.value,
                        "education"
                      )
                    }
                    required
                  />
                ))}
              </div>
            ))}
            <button
              type="button"
              className="text-white bg-blue-700 rounded px-3 py-2 mt-2"
              onClick={() =>
                addField("education", {
                  degree: "",
                  institution: "",
                  graduationYear: "",
                })
              }
            >
              Add More Education
            </button>
          </div>

          {/* Interests */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Interests</h2>
            {formData.interests.map((interest, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Interest"
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
                required
              />
            ))}
            <button
              type="button"
              className="text-white bg-blue-700 rounded px-3 py-2 mt-2"
              onClick={() => addField("interests", "")}
            >
              Add More Interests
            </button>
          </div>

          {/* Skills */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            {formData.skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleSkillsChange(index, e.target.value)}
                required
              />
            ))}
            <button
              type="button"
              className="text-white bg-blue-700 rounded px-3 py-2 mt-2"
              onClick={() => addField("skills", "")}
            >
              Add More Skills
            </button>
          </div>

          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
            >
              Generate CV
            </button>
            {isGenerated && (
              <PDFDownloadLink
                document={renderSelectedTemplate()}
                fileName="cv.pdf"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
              >
                Download CV
              </PDFDownloadLink>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CVForm;
