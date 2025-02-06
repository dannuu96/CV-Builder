import React from "react";
import PropTypes from "prop-types";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#F5F7FA",
  },
  header: {
    textAlign: "center",
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#FF6600",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    textTransform: "uppercase",
  },
  role: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FF6600",
    textTransform: "uppercase",
    borderBottomWidth: 2,
    borderBottomColor: "#FF6600",
    paddingBottom: 3,
  },
  text: {
    marginBottom: 4,
    lineHeight: 1.5,
    color: "#333",
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#003366",
  },
  company: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
  },
  duration: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#777",
  },
  bulletList: {
    marginTop: 4,
    paddingLeft: 10,
  },
  bulletItem: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

// Chronological Resume Template
const ChronologicalTemplate = ({ data }) => {
  // Ensure arrays exist
  const education = data.education || [];
  const experience = data.experience ? [...data.experience].reverse() : []; // Reverse for chronological order
  const skills = data.skills || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName || "Your Name"}</Text>
          <Text style={styles.role}>{data.role || "Your Job Title"}</Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.title}>Contact Information</Text>
          <Text style={styles.text}>
            Email: {data.email || "example@domain.com"}
          </Text>
          <Text style={styles.text}>Phone: {data.phone || "+00 000 0000"}</Text>
          <Text style={styles.text}>
            LinkedIn: {data.linkedin || "linkedin.com"}
          </Text>
          <Text style={styles.text}>GitHub: {data.github || "github.com"}</Text>
          <Text style={styles.text}>
            Address: {data.address || "Your Address"}
          </Text>
        </View>

        {/* Work Experience (Most Important Section) */}
        <View style={styles.section}>
          <Text style={styles.title}>Work Experience</Text>
          {experience.length > 0 ? (
            experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.duration}>{exp.duration}</Text>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.responsibilities.map((resp, idx) => (
                      <Text key={idx} style={styles.bulletItem}>
                        • {resp}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.text}>No work experience provided.</Text>
          )}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.duration}>{edu.graduationYear}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No education details provided.</Text>
          )}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Skills</Text>
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <Text key={index} style={styles.text}>
                • {skill}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No skills provided.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

// Define PropTypes
ChronologicalTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

// Export Component
export default ChronologicalTemplate;
