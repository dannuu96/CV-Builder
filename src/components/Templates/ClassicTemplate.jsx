import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Import the gradient image
import gradientBackground from "./../assets/images/gradient.png";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#f4f6f9",
    padding: 10,
  },
  sidebar: {
    width: "40%",
    padding: 6,
    color: "#ffffff",
    borderBottomLeftRadius: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "5px",
    position: "relative", // Needed for absolute positioning of the background image
  },
  sidebarBackground: {
    position: "absolute",
    borderRadius: 10,

    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1, // Ensure the background is behind the content
  },
  main: {
    width: "60%",
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#ffffff",
  },
  jobTitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#ecf0f1",
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2980b9",
    borderBottomWidth: 2,
    borderBottomColor: "#2980b9",
    paddingBottom: 5,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    paddingBottom: 5,
  },
  contactInfo: {
    fontSize: 12,
    marginBottom: 4,
    color: "#ecf0f1",
    fontStyle: "italic",
  },
  socialLink: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  skillBadge: {
    backgroundColor: "#34495e",
    color: "#ffffff",
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 8,
    alignSelf: "flex-start",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridItem: {
    backgroundColor: "#34495e",
    color: "#ffffff",
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 8,
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  },
  listItem: {
    fontSize: 12,
    marginBottom: 8,
    color: "#ecf0f1",
  },
  workExperienceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#2c3e50",
  },
  workExperienceSubtitle: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 8,
    color: "#7f8c8d",
  },
  achievement: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  achievementBullet: {
    width: 5,
    height: 5,
    backgroundColor: "#2980b9",
    marginRight: 8,
    borderRadius: 2.5,
  },
  achievementText: {
    fontSize: 12,
    flexShrink: 1,
    color: "#2c3e50",
  },
  description: {
    fontSize: 12,
    marginBottom: 15,
    lineHeight: 1.5,
    color: "#2c3e50",
  },
  aboutMe: {
    fontSize: 12,
    marginBottom: 15,
    lineHeight: 1.5,
    color: "#2c3e50",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
  },
});

Font.register({
  family: "Helvetica",
});

const ModernCVTemplate = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    lists: { skills, interests, languages, conferences, courses },
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Gradient Background */}
          <Image src={gradientBackground} style={styles.sidebarBackground} />

          {/* Profile Picture */}
          {personalInfo.profilePicture && (
            <Image
              src={personalInfo.profilePicture}
              style={styles.profileImage}
            />
          )}

          {/* Name and Job Title */}
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>

          {/* Contact Info */}
          <Text style={styles.sidebarTitle}>Contact</Text>
          <Text style={styles.contactInfo}>{personalInfo.email}</Text>
          <Text style={styles.contactInfo}>{personalInfo.phone}</Text>
          <Text style={styles.contactInfo}>{personalInfo.address}</Text>

          {/* Social Links */}
          <View style={styles.socialLink}>
            <Text style={styles.contactInfo}>{personalInfo.linkedin}</Text>
          </View>
          <View style={styles.socialLink}>
            <Text style={styles.contactInfo}>{personalInfo.github}</Text>
          </View>
          <View style={styles.socialLink}>
            <Text style={styles.contactInfo}>{personalInfo.website}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Skills */}
          <Text style={styles.sidebarTitle}>Skills</Text>
          <View style={styles.gridContainer}>
            {skills.map((skill, index) => (
              <Text key={index} style={styles.gridItem}>
                {skill}
              </Text>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Languages */}
          <Text style={styles.sidebarTitle}>Languages</Text>
          <View style={styles.gridContainer}>
            {languages.map((language, index) => (
              <Text key={index} style={styles.gridItem}>
                {language}
              </Text>
            ))}
          </View>
        </View>

        {/* Right Main Content */}
        <View style={styles.main}>
          {/* Summary */}
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.description}>{personalInfo.description}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Experience */}
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((exp, index) => (
            <View key={index} style={styles.achievement}>
              <View style={styles.achievementBullet} />
              <View>
                <Text style={styles.workExperienceTitle}>{exp.jobTitle}</Text>
                <Text style={styles.workExperienceSubtitle}>
                  {exp.company} | {exp.duration}
                </Text>
                <Text style={styles.achievementText}>{exp.description}</Text>
              </View>
            </View>
          ))}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Education */}
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={styles.achievement}>
              <View style={styles.achievementBullet} />
              <View>
                <Text style={styles.workExperienceTitle}>{edu.degree}</Text>
                <Text style={styles.workExperienceSubtitle}>
                  {edu.institution} | {edu.graduationYear}
                </Text>
              </View>
            </View>
          ))}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Certifications */}
          <Text style={styles.sectionTitle}>Certifications</Text>
          {courses.map((course, index) => (
            <View key={index} style={styles.achievement}>
              <View style={styles.achievementBullet} />
              <Text style={styles.achievementText}>{course}</Text>
            </View>
          ))}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Hobbies */}
          <Text style={styles.sectionTitle}>Interest</Text>
          {interests.map((interest, index) => (
            <View key={index} style={styles.achievement}>
              <View style={styles.achievementBullet} />
              <Text style={styles.achievementText}>{interest}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ModernCVTemplate;
