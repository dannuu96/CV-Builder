import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Define styles similar to the uploaded CV design
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#222",
    color: "#fff",
    padding: 20,
  },
  main: {
    width: "70%",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  bullet: {
    width: 4,
    height: 4,
    backgroundColor: "#fff",
    borderRadius: "50%",
    marginRight: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  jobItem: {
    marginBottom: 10,
  },
  skillsSection: {
    marginTop: 10,
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 3,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    marginBottom: 10,
  },
});

const SidebarTemplate = ({ data }) => {
  const { personalInfo, experience, education, lists } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={styles.profilePic} />
          )}
          <Text style={styles.header}>{personalInfo.fullName}</Text>
          <Text style={styles.text}>{personalInfo.jobTitle}</Text>

          {/* Contact Info */}
          <Text style={styles.sectionTitle}>Contact Me</Text>
          <View>
            <Text style={styles.contactItem}> {personalInfo.email}</Text>
            <Text style={styles.contactItem}> {personalInfo.phone}</Text>
            <Text style={styles.contactItem}> {personalInfo.address}</Text>
            {personalInfo.linkedin && (
              <Text style={styles.contactItem}> {personalInfo.linkedin}</Text>
            )}
            {personalInfo.github && (
              <Text style={styles.contactItem}> {personalInfo.github}</Text>
            )}
          </View>

          {/* Education */}
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <View key={index}>
              <Text style={styles.text}>{edu.degree}</Text>
              <Text style={styles.text}>{edu.institution}</Text>
              <Text style={styles.text}>{edu.graduationYear}</Text>
            </View>
          ))}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* About Me */}
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.text}>{personalInfo.aboutMe}</Text>

          {/* Experience */}
          <Text style={styles.sectionTitle}>Job Experience</Text>
          {experience.map((job, index) => (
            <View key={index} style={styles.jobItem}>
              <Text style={styles.text}>
                <strong>{job.jobTitle}</strong> - {job.company}
              </Text>
              <Text style={styles.text}>{job.duration}</Text>
            </View>
          ))}

          {/* Skills */}
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {lists.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                • {skill}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SidebarTemplate;
