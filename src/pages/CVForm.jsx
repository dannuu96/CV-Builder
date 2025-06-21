import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ClassicTemplate from "../components/Templates/ClassicTemplate";
import ModernTemplate from "../components/Templates/ModernTemplate";
import VibrantTemplate from "../components/Templates/VibrantTemplate";
import ElegantTemplate from "../components/Templates/ElegantTemplate";
import BoldTemplate from "../components/Templates/BoldTemplate";
import SidebarTemplate from "../components/Templates/NewTemplate";
import LivePreview from "../components/LivePreview";
import Sidebar from "../components/Sidebar";

// Common recommendations for fields
const RECOMMENDATIONS = {
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "HTML",
    "CSS",
    "SQL",
    "Git",
    "TypeScript",
    "AWS",
  ],
  interests: [
    "Machine Learning",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "UI/UX Design",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
  ],
  languages: [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Hindi",
    "Arabic",
    "Portuguese",
  ],
  courses: [
    "Advanced JavaScript",
    "React for Beginners",
    "Python for Data Science",
    "AWS Certified Solutions Architect",
    "Machine Learning with TensorFlow",
    "Full-Stack Web Development",
    "DevOps Fundamentals",
  ],
  education: [
    "Bachelor of Science in Computer Science",
    "Master of Business Administration",
    "Bachelor of Arts in Economics",
    "Master of Science in Data Science",
    "Bachelor of Engineering",
  ],
};

const INITIAL_FORM_DATA = {
  personalInfo: {
    fullName: "Muhammad Danyal",
    jobTitle: "Front End Developer",
    email: "danyalmohammad26@gmail.com",
    phone: "03479167195",
    address: "Gulshan Abad Dir Lower",
    linkedin: "this is linkdin",
    github: "this is github",

    description: `for CSS properties, and gradients are not among the supported features. To achieve a gradient effect, you can use an image with the gradient as the background for the sidebar. Here's how you can modify your code file. Use the Image as Background: Replace the background: linear-gradient(...) wit`,

    aboutMe: `a Gradient Image: Create an image with the gradient you want (e.g., using a tool like Photoshop, GIMP, or an online gradient generator). Save it as a PNG or JPEG`,
  },
  experience: [
    { jobTitle: "Front End Developer", company: "Code Crush", duration: "1 year" },
  ],
  education: [
    { degree: "Software Engineering", institution: "Uet Mardan", graduationYear: "2024" },
  ],
  lists: {
    skills: ["React JS", "JavaScript", "HTML", "CSS", "Python"],
    interests: ["Machine Learning", "Cricket", "Football", "This"],
    languages: ["English", "Pashto", "Urdu", "Arabic"],
    projects: ["This is a conference"],
    courses: ["This", "That", "Flana", "Dimka"],
  },
};

const CVForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("bold");
  const [isViewing, setIsViewing] = useState(false);
  const [errors, setErrors] = useState({});

  const validateWordCount = (text, minWords) => {
    const words = text.trim().split(/\s+/);
    return words.length >= minWords;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { description, aboutMe } = formData.personalInfo;
    const minWords = 10;

    const newErrors = {};

    if (!validateWordCount(description, minWords)) {
      newErrors.description = "Description must contain at least 10 words.";
    }

    if (!validateWordCount(aboutMe, minWords)) {
      newErrors.aboutMe = "About Me must contain at least 10 words.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsGenerated(true);
  };

  const handleChange = (category, field, value, index = null) => {
    if (category === "personalInfo") {
      setFormData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value },
      }));
    } else if (category === "lists") {
      const updatedList = [...formData.lists[field]];
      if (index !== null) updatedList[index] = value;
      setFormData((prev) => ({
        ...prev,
        lists: { ...prev.lists, [field]: updatedList },
      }));
    } else {
      const updatedArray = [...formData[category]];
      if (index !== null) updatedArray[index][field] = value;
      setFormData((prev) => ({ ...prev, [category]: updatedArray }));
    }
  };

  const addField = (category, field = null) => {
    if (field) {
      setFormData((prev) => ({
        ...prev,
        lists: { ...prev.lists, [field]: [...prev.lists[field], ""] },
      }));
    } else {
      const newItem =
        category === "education"
          ? { degree: "", institution: "", graduationYear: "" }
          : { jobTitle: "", company: "", duration: "" };
      setFormData((prev) => ({
        ...prev,
        [category]: [...prev[category], newItem],
      }));
    }
  };

  const renderPersonalInfo = () => (
    <div className="col-span-2 mb-6">
      <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(formData.personalInfo).map((field) => (
          <div key={field}>
            <input
              type="text"
              className="w-full p-2 border border-gray-500 rounded-lg"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.personalInfo[field]}
              onChange={(e) =>
                handleChange("personalInfo", field, e.target.value)
              }
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderLists = () => (
    <>
      {Object.keys(formData.lists).map((listName) => (
        <div key={listName} className="col-span-2 mb-6">
          <h2 className="text-lg font-semibold mb-2">
            {listName.charAt(0).toUpperCase() + listName.slice(1)}
          </h2>
          {formData.lists[listName].map((item, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-500 rounded-lg"
                placeholder={`Enter ${listName}`}
                value={item}
                onChange={(e) =>
                  handleChange("lists", listName, e.target.value, index)
                }
                list={`${listName}-options-${index}`} // Unique ID for datalist
              />
              <datalist id={`${listName}-options-${index}`}>
                {RECOMMENDATIONS[listName]?.map((option, i) => (
                  <option key={i} value={option} />
                ))}
              </datalist>
            </div>
          ))}
          <button
            type="button"
            className="text-white bg-blue-700 rounded px-3 py-2 mt-2"
            onClick={() => addField("lists", listName)}
          >
            Add More {listName}
          </button>
        </div>
      ))}
    </>
  );

  const renderComplexFields = () => (
    <>
      {["education", "experience"].map((category) => (
        <div key={category} className="col-span-2 mb-6">
          <h2 className="text-lg font-semibold mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          {formData[category].map((item, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 gap-2">
              {Object.keys(item).map((field) => (
                <div key={field}>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-500 rounded-lg"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[category][index][field]}
                    onChange={(e) =>
                      handleChange(category, field, e.target.value, index)
                    }
                    list={`${category}-${field}-options-${index}`} // Unique ID for datalist
                  />
                  {field === "degree" && (
                    <datalist id={`${category}-${field}-options-${index}`}>
                      {RECOMMENDATIONS.education.map((option, i) => (
                        <option key={i} value={option} />
                      ))}
                    </datalist>
                  )}
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="text-white bg-blue-700 rounded px-3 py-2 mt-2"
            onClick={() => addField(category)}
          >
            Add More {category}
          </button>
        </div>
      ))}
    </>
  );

  const renderTemplate = () => {
    const templates = {
      modern: ModernTemplate,
      vibrant: VibrantTemplate,
      elegant: ElegantTemplate,
      bold: BoldTemplate,
      classic: ClassicTemplate,
      new: SidebarTemplate,
    };
    const SelectedTemplate = templates[selectedTemplate];
    return <SelectedTemplate data={formData} />;
  };

  return (
    <div className="flex min-h-screen   ">
      <Sidebar
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
      <div className="w-3/4 p-6 bg-gradient-to-r from-[#cacdcf] to-[#a2f1a2]">
        <h1 className="text-2xl font-bold text-center mb-6">Create Your CV</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {renderPersonalInfo()}
          {renderComplexFields()}
          {renderLists()}

          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
            >
              Generate CV
            </button>
            {isGenerated && (
              <>
                <button
                  type="button"
                  onClick={() => setIsViewing(true)}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700"
                >
                  View CV
                </button>

                <PDFDownloadLink
                  document={renderTemplate()}
                  fileName="cv.pdf"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
                >
                  Download CV
                </PDFDownloadLink>
              </>
            )}
          </div>
        </form>

        {/* View CV Modal */}
        {isViewing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[80vw] h-[90vh] overflow-auto relative flex justify-center items-center">
              <button
                onClick={() => setIsViewing(false)}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
              <div className="w-full h-full">
                <PDFViewer width="100%" height="100%">
                  {renderTemplate()}
                </PDFViewer>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Live Preview Section */}
      <div className="w-1/2 p-6 bg-amber-50">
        <h2 className="text-2xl font-bold text-center mb-6">Live Preview</h2>
        <LivePreview formData={formData} selectedTemplate={selectedTemplate} />
      </div>
    </div>
  );
};

export default CVForm;
