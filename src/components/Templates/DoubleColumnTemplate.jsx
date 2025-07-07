import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    padding: 0,
  },
  leftColumn: {
    width: "35%",
    backgroundColor: "#2c3e50",
    padding: 25,
    color: "#ffffff",
  },
  rightColumn: {
    width: "65%",
    padding: 30,
    backgroundColor: "#ffffff",
  },
  profileSection: {
    marginBottom: 30,
    textAlign: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ffffff",
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 14,
    color: "#bdc3c7",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#3498db",
    paddingBottom: 5,
  },
  rightSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottomWidth: 2,
    borderBottomColor: "#3498db",
    paddingBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 8,
    color: "#ecf0f1",
  },
  skillItem: {
    marginBottom: 12,
  },
  skillName: {
    fontSize: 11,
    color: "#ffffff",
    marginBottom: 4,
  },
  skillBar: {
    backgroundColor: "#34495e",
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  skillLevel: {
    backgroundColor: "#3498db",
    height: 6,
    width: "85%",
    borderRadius: 3,
  },
  description: {
    fontSize: 11,
    marginBottom: 20,
    lineHeight: 1.5,
    color: "#34495e",
    textAlign: "justify",
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  jobTitleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  duration: {
    fontSize: 10,
    color: "#7f8c8d",
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  company: {
    fontSize: 12,
    color: "#3498db",
    marginBottom: 8,
    fontWeight: "bold",
  },
  achievementsList: {
    marginTop: 8,
  },
  achievementItem: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: "#3498db",
    borderRadius: 3,
    marginRight: 10,
    marginTop: 4,
  },
  achievementText: {
    fontSize: 10,
    color: "#34495e",
    flex: 1,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  institution: {
    fontSize: 11,
    color: "#7f8c8d",
    marginBottom: 5,
  },
  sidebarSection: {
    marginBottom: 25,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 6,
    color: "#ecf0f1",
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  languageName: {
    fontSize: 10,
    color: "#ffffff",
  },
  languageLevel: {
    fontSize: 9,
    color: "#bdc3c7",
  },
  interestTag: {
    backgroundColor: "#34495e",
    color: "#ffffff",
    fontSize: 9,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  interestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const DoubleColumnTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || "Your Name",
    jobTitle: data.personalInfo?.jobTitle || "Job Title",
    email: data.personalInfo?.email || "email@example.com",
    phone: data.personalInfo?.phone || "000-000-0000",
    address: data.personalInfo?.address || "Your Address",
    linkedin: data.personalInfo?.linkedin || "linkedin.com/in/profile",
    github: data.personalInfo?.github || "github.com/username",
    website: data.personalInfo?.website || "yourwebsite.com",
    description: data.personalInfo?.description || "Professional summary highlighting your key strengths and career objectives.",
    skills: data.lists?.skills || [],
    experience: data.experience || [],
    education: data.education || [],
    languages: data.lists?.languages || [],
    interests: data.lists?.interests || [],
    projects: data.lists?.projects || [],
    certifications: data.lists?.certifications || [],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Text style={styles.name}>{mappedData.fullName}</Text>
            <Text style={styles.jobTitle}>{mappedData.jobTitle}</Text>
          </View>

          {/* Contact Information */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.contactInfo}>📧 {mappedData.email}</Text>
            <Text style={styles.contactInfo}>📱 {mappedData.phone}</Text>
            <Text style={styles.contactInfo}>📍 {mappedData.address}</Text>
            <Text style={styles.contactInfo}>💼 {mappedData.linkedin}</Text>
            {mappedData.github && <Text style={styles.contactInfo}>🔗 {mappedData.github}</Text>}
            {mappedData.website && <Text style={styles.contactInfo}>🌐 {mappedData.website}</Text>}
          </View>

          {/* Skills */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {mappedData.skills.slice(0, 8).map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <Text style={styles.skillName}>{skill}</Text>
                <View style={styles.skillBar}>
                  <View style={styles.skillLevel} />
                </View>
              </View>
            ))}
          </View>

          {/* Languages */}
          {mappedData.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {mappedData.languages.map((language, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{language.split('(')[0].trim()}</Text>
                  <Text style={styles.languageLevel}>
                    {language.includes('(') ? language.match(/\((.*?)\)/)?.[1] || 'Fluent' : 'Fluent'}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Interests */}
          {mappedData.interests.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.interestsGrid}>
                {mappedData.interests.slice(0, 8).map((interest, index) => (
                  <Text key={index} style={styles.interestTag}>
                    {interest}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Professional Summary */}
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.rightSectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{mappedData.description}</Text>
          </View>

          {/* Experience */}
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.rightSectionTitle}>Professional Experience</Text>
            {mappedData.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitleText}>{exp.jobTitle}</Text>
                  <Text style={styles.duration}>{exp.duration}</Text>
                </View>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.description}>{exp.description}</Text>
                
                {/* Achievement bullets */}
                <View style={styles.achievementsList}>
                  {exp.description && exp.description.split('.').filter(item => item.trim()).slice(0, 3).map((achievement, idx) => (
                    <View key={idx} style={styles.achievementItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.achievementText}>{achievement.trim()}.</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.rightSectionTitle}>Education</Text>
            {mappedData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.institution}>Graduated: {edu.graduationYear}</Text>
                {edu.description && <Text style={styles.description}>{edu.description}</Text>}
              </View>
            ))}
          </View>

          {/* Projects */}
          {mappedData.projects.length > 0 && (
            <View style={{ marginBottom: 25 }}>
              <Text style={styles.rightSectionTitle}>Key Projects</Text>
              {mappedData.projects.slice(0, 3).map((project, index) => (
                <View key={index} style={styles.achievementItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.achievementText}>{project}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {mappedData.certifications.length > 0 && (
            <View style={{ marginBottom: 25 }}>
              <Text style={styles.rightSectionTitle}>Certifications</Text>
              {mappedData.certifications.slice(0, 4).map((cert, index) => (
                <View key={index} style={styles.achievementItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.achievementText}>{cert}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default DoubleColumnTemplate; 