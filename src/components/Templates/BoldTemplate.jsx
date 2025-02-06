import React from "react";
import PropTypes from "prop-types";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#f8f9fa",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#2c3e50",
    padding: 20,
    color: "#fff",
  },
  main: {
    width: "70%",
    padding: 20,
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff",
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#3498db",
  },
  text: {
    marginBottom: 5,
    lineHeight: 1.4,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: "#3498db",
    borderRadius: 50,
    marginRight: 6,
    marginTop: 6,
  },
});

const ResumeTemplate = ({ data = {} }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.header}>{data.fullName || "Your Name"}</Text>
          <View style={styles.section}>
            <Text style={styles.title}>Contact</Text>
            <Text>Email: {data.email || "email@example.com"}</Text>
            <Text>Phone: {data.phone || "000-000-0000"}</Text>
            <Text>
              LinkedIn: {data.linkedin || "linkedin.com/in/yourprofile"}
            </Text>
            <Text>Address: {data.address || "Your Address"}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Skills</Text>
            {(data.skills || []).map(
              (
                skill,
                index // Add default empty array
              ) => (
                <View key={index} style={styles.bulletPoint}>
                  <View style={styles.bullet} />
                  <Text>{skill}</Text>
                </View>
              )
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Languages</Text>
            {(data.languages || []).map((language, index) => (
              <View key={index} style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text>{language}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <View style={styles.section}>
            <Text style={styles.title}>Work Experience</Text>
            {(data.experience || []).map((exp, index) => (
              <View key={index} style={styles.section}>
                <Text style={{ fontWeight: "bold" }}>{exp.jobTitle}</Text>
                <Text style={{ fontStyle: "italic" }}>
                  {exp.company} ({exp.duration})
                </Text>
                {(exp.achievements || []).map((ach, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <View style={styles.bullet} />
                    <Text>{ach}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Education</Text>
            {(data.education || []).map((edu, index) => (
              <View key={index} style={styles.section}>
                <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
                <Text style={{ fontStyle: "italic" }}>
                  {edu.institution} ({edu.graduationYear})
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Interests</Text>
            {(data.interests || []).map((interest, index) => (
              <View key={index} style={styles.bulletPoint}>
                <View style={styles.bullet} />
                <Text>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

ResumeTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ResumeTemplate;
