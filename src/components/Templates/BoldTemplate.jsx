import React from "react";
import PropTypes from "prop-types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  sidebar: {
    position: "relative",
    width: "40%",
    backgroundColor: "#1c0000",
    padding: 10,
    color: "#ffffff",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  main: {
    width: "60%",
    padding: 30,
    backgroundColor: "#ffffff",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 8,
    color: "#ffffff",
  },
  jobTitle: {
    fontSize: 16,
    textAlign: "start",
    color: "#bdc3c7",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#3498db",
    borderBottomWidth: 1.5,
    borderBottomColor: "#3498db",
    paddingBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
    color: "#ffffff",
  },
  skillBadge: {
    backgroundColor: "#34495e",
    color: "#ffffff",
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },

  listItem: {
    fontSize: 12,
    marginBottom: 5,
    color: "#ffffff",
  },
  workExperienceTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
  workExperienceSubtitle: {
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 6,
    color: "#7f8c8d",
  },
  achievement: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  achievementBullet: {
    width: 5,
    height: 5,
    backgroundColor: "#3498db",
    marginRight: 8,
    borderRadius: 2.5,
  },
  achievementText: {
    fontSize: 12,
    flexShrink: 1,
  },
  description: {
    fontSize: 12,
    marginBottom: 15,
    lineHeight: 1.5,
    color: "#2c3e50",
  },
});

const ResumeTemplate = ({ data = {}, profileImage }) => {
  // Map formData to the expected structure
  const mappedData = {
    fullName: data.personalInfo?.fullName || "Your Name",
    jobTitle: data.personalInfo?.jobTitle || "Job Title",
    email: data.personalInfo?.email || "email@example.com",
    phone: data.personalInfo?.phone || "000-000-0000",
    address: data.personalInfo?.address || "Your Address",
    linkedin: data.personalInfo?.linkedin || "linkedin.com/in/profile",
    description:
      data.personalInfo?.description || "A brief description about yourself.",

    skills: data.lists?.skills || [],
    languages: data.lists?.languages || [],
    interests: data.lists?.interests || [],
    experience:
      data.experience?.map((exp) => ({
        jobTitle: exp.jobTitle || "Job Title",
        company: exp.company || "Company Name",
        duration: exp.duration || "Duration",
        achievements: exp.achievements || [],
      })) || [],
    education:
      data.education?.map((edu) => ({
        degree: edu.degree || "Degree",
        institution: edu.institution || "Institution",
        graduationYear: edu.graduationYear || "Year",
      })) || [],
    conferences: data.lists?.conferences || [],
    courses: data.lists?.courses || [],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {profileImage && (
            <Image src={profileImage} style={styles.profileImage} />
          )}
          <Text style={styles.name}>{mappedData.fullName}</Text>
          <Text style={styles.jobTitle}>{mappedData.jobTitle}</Text>

          <Text style={styles.sectionTitle}>CONTACT</Text>
          <Text style={styles.contactInfo}>{mappedData.email}</Text>
          <Text style={styles.contactInfo}>{mappedData.phone}</Text>
          <Text style={styles.contactInfo}>{mappedData.address}</Text>
          <Text style={styles.contactInfo}>{mappedData.linkedin}</Text>

          <Text style={styles.sectionTitle}>SKILLS</Text>
          <View style={styles.gridContainer}>
            {mappedData.skills.map((skill, index) => (
              <View key={index} style={styles.gridItem}>
                <Text style={styles.skillBadge}>{skill}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>LANGUAGES</Text>
          <View style={styles.gridContainer}>
            {mappedData.languages.map((language, index) => (
              <View key={index} style={styles.gridItem}>
                <Text style={styles.skillBadge}>{language}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>INTERESTS</Text>
          <View style={{ flexDirection: "column" }}>
            {mappedData.interests.map((interest, index) => (
              <Text key={index} style={styles.listItem}>
                - {interest}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>COURSES</Text>
          <View style={{ flexDirection: "column" }}>
            {mappedData.courses.map((course, index) => (
              <Text key={index} style={styles.listItem}>
                - {course}
              </Text>
            ))}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Description Section */}
          {mappedData.description && (
            <>
              <Text style={styles.sectionTitle}>DESCRIPTION</Text>
              <Text style={styles.description}>{mappedData.description}</Text>
            </>
          )}

          {/* About Me Section */}
          {mappedData.aboutMe && (
            <>
              <Text style={styles.sectionTitle}>ABOUT ME</Text>
              <Text style={styles.aboutMe}>{mappedData.aboutMe}</Text>
            </>
          )}

          {/* Work Experience Section */}
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
          {mappedData.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.workExperienceTitle}>{exp.jobTitle}</Text>
              <Text style={styles.workExperienceSubtitle}>
                {exp.company} | {exp.duration}
              </Text>
              {exp.achievements.map((ach, i) => (
                <View key={i} style={styles.achievement}>
                  <View style={styles.achievementBullet} />
                  <Text style={styles.achievementText}>{ach}</Text>
                </View>
              ))}
            </View>
          ))}

          {/* Education Section */}
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {mappedData.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.workExperienceTitle}>{edu.degree}</Text>
              <Text style={styles.workExperienceSubtitle}>
                {edu.institution} | {edu.graduationYear}
              </Text>
            </View>
          ))}

          {/* Conferences Section */}
          <Text style={styles.sectionTitle}>CONFERENCES</Text>
          {mappedData.conferences.map((conf, index) => (
            <Text key={index} style={styles.contactInfo}>
              {conf}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

ResumeTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  profileImage: PropTypes.string,
};

export default ResumeTemplate;
