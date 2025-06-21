import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts (if needed)
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf",
    }, // Regular
    {
      src: "https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UNirkOUuhs.ttf",
      fontWeight: 600,
    }, // Bold
  ],
});

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    backgroundColor: "#003366", // Dark navy blue
    borderRadius: 8,
    padding: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Open Sans",
  },
  role: {
    fontSize: 18,
    color: "#66B2FF", // Light blue
    fontFamily: "Open Sans",
    marginTop: 5,
  },
  contact: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  contactGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
  },
  contactItem: {
    textAlign: "left",
    fontSize: 10,
    fontFamily: "Open Sans",
    padding: 8,

    wordBreak: "break-word",
    width: "100%",
  },
  icon: {
    marginRight: 5,
  },
  sectionHeader: {
    width: "170px",
    backgroundColor: "#000200",
    color: "#FFFFFF",
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontFamily: "Open Sans",
    marginBottom: 10,
    borderRadius: 8,
    border: "2px solid rgba(0, 0, 0, 0.1)", // Simulate a shadow
  },
  sectionContent: {
    fontSize: 10,
    fontFamily: "Open Sans",
    marginBottom: 15,
  },
  profileText: {
    textAlign: "justify",
    lineHeight: 1.5,
  },
  skills: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  skillColumn: {
    flex: 1,
    marginRight: 10,
  },
  skillItem: {
    listStyleType: "none",
    padding: 5,
    borderBottom: "1px solid #ddd",
  },
  bulletPoint: {
    marginRight: 5,
  },
  education: {
    marginBottom: 15,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  careerSummary: {
    marginBottom: 15,
  },
  job: {
    marginBottom: 10,
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  jobCompany: {
    fontSize: 10,
    color: "#666666",
  },
  jobDuration: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  listItem: {
    marginBottom: 5,
  },
});

const defaultData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    description: "",
    aboutMe: "",
  },
  experience: [],
  education: [],
  lists: {
    skills: [],
    interests: [],
    languages: [],
    conferences: [],
    courses: [],
  },
};

const ModernTemplate = ({ data = defaultData }) => {
  const { personalInfo, experience, education, lists } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.role}>{personalInfo.jobTitle}</Text>
        </View>

        {/* Contact Details */}
        <View style={styles.contact}>
          <Text style={styles.contactItem}>
            <Text style={styles.icon}></Text> {personalInfo.phone}
          </Text>
          <Text style={styles.contactItem}>
            <Text style={styles.icon}></Text> {personalInfo.email}
          </Text>
          <Text style={styles.contactItem}>
            <Text style={styles.icon}></Text> {personalInfo.address}
          </Text>
          <Text style={styles.contactItem}>
            <Text style={styles.icon}></Text> {personalInfo.linkedin}
          </Text>
          <Text style={styles.contactItem}>
            <Text style={styles.icon}></Text> {personalInfo.github}
          </Text>
        </View>

        {/* Professional Profile */}
        <View>
          <Text style={styles.sectionHeader}>Professional Profile</Text>
          <Text style={[styles.sectionContent, styles.profileText]}>
            {personalInfo.description}
          </Text>
        </View>

        {/* About Me */}
        <View>
          <Text style={styles.sectionHeader}>About Me</Text>
          <Text style={[styles.sectionContent, styles.profileText]}>
            {personalInfo.aboutMe}
          </Text>
        </View>

        {/* Core Skills */}
        <View>
          <Text style={styles.sectionHeader}>Core Skills</Text>
          <View style={styles.skills}>
            <View style={styles.skillColumn}>
              {lists.skills && Array.isArray(lists.skills) ? (
                lists.skills
                  .slice(0, Math.ceil(lists.skills.length / 2))
                  .map((skill, index) => (
                    <Text key={index} style={styles.sectionContent}>
                      <Text style={styles.bulletPoint}>•</Text> {skill}
                    </Text>
                  ))
              ) : (
                <Text style={styles.sectionContent}>No skills listed</Text>
              )}
            </View>
            <View style={styles.skillColumn}>
              {lists.skills && Array.isArray(lists.skills) ? (
                lists.skills
                  .slice(Math.ceil(lists.skills.length / 2))
                  .map((skill, index) => (
                    <Text key={index} style={styles.sectionContent}>
                      <Text style={styles.bulletPoint}>•</Text> {skill}
                    </Text>
                  ))
              ) : (
                <Text style={styles.sectionContent}>No skills listed</Text>
              )}
            </View>
          </View>
        </View>

        {/* Interests */}
        <View>
          <Text style={styles.sectionHeader}>Interests</Text>
          <View style={styles.skills}>
            {lists.interests && Array.isArray(lists.interests) ? (
              lists.interests.map((interest, index) => (
                <Text key={index} style={styles.sectionContent}>
                  <Text style={styles.bulletPoint}>•</Text> {interest}
                </Text>
              ))
            ) : (
              <Text style={styles.sectionContent}>No interests listed</Text>
            )}
          </View>
        </View>

        {/* Languages */}
        <View>
          <Text style={styles.sectionHeader}>Languages</Text>
          <View style={styles.skills}>
            {lists.languages && Array.isArray(lists.languages) ? (
              lists.languages.map((language, index) => (
                <Text key={index} style={styles.sectionContent}>
                  <Text style={styles.bulletPoint}>•</Text> {language}
                </Text>
              ))
            ) : (
              <Text style={styles.sectionContent}>No languages listed</Text>
            )}
          </View>
        </View>

        {/* Conferences */}
        <View>
          <Text style={styles.sectionHeader}>Conferences</Text>
          <View style={styles.skills}>
            {lists.conferences && Array.isArray(lists.conferences) ? (
              lists.conferences.map((conference, index) => (
                <Text key={index} style={styles.sectionContent}>
                  <Text style={styles.bulletPoint}>•</Text> {conference}
                </Text>
              ))
            ) : (
              <Text style={styles.sectionContent}>No conferences listed</Text>
            )}
          </View>
        </View>

        {/* Courses */}
        <View>
          <Text style={styles.sectionHeader}>Courses</Text>
          <View style={styles.skills}>
            {lists.courses && Array.isArray(lists.courses) ? (
              lists.courses.map((course, index) => (
                <Text key={index} style={styles.sectionContent}>
                  <Text style={styles.bulletPoint}>•</Text> {course}
                </Text>
              ))
            ) : (
              <Text style={styles.sectionContent}>No courses listed</Text>
            )}
          </View>
        </View>

        {/* Education */}
        <View>
          <Text style={styles.sectionHeader}>Education</Text>
          {education && Array.isArray(education) ? (
            education.map((edu, index) => (
              <View
                key={index}
                style={[styles.sectionContent, styles.educationItem]}
              >
                <Text style={styles.educationTitle}>
                  {edu.degree} - {edu.institution}
                </Text>
                <Text style={styles.jobDuration}>{edu.graduationYear}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.sectionContent}>No education listed</Text>
          )}
        </View>

        {/* Career Summary */}
        <View>
          <Text style={styles.sectionHeader}>Career Summary</Text>
          {experience && Array.isArray(experience) ? (
            experience.map((exp, index) => (
              <View key={index} style={[styles.sectionContent, styles.job]}>
                <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                <Text style={styles.jobCompany}>{exp.company}</Text>
                <Text style={styles.jobDuration}>{exp.duration}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.sectionContent}>No experience listed</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ModernTemplate;
