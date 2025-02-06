import React from "react";
import PropTypes from "prop-types";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const ModernTemplate = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 50,
      fontSize: 11,
      fontFamily: "Helvetica",
      color: "#444",
      backgroundColor: "#f4f4f4",
    },
    header: {
      fontSize: 26,
      marginBottom: 15,
      textAlign: "left",
      fontWeight: "bold",
      color: "#222",
    },
    section: {
      marginBottom: 15,
      paddingBottom: 10,
      borderBottom: "1px solid #aaa",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#222",
      textDecoration: "underline",
    },
    text: {
      marginBottom: 6,
      lineHeight: 1.4,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{data.fullName || "Name"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Contact</Text>
          <Text>Email: {data.email || "example@domain.com"}</Text>
          <Text>Phone: {data.phone || "000-000-0000"}</Text>
          <Text>LinkedIn: {data.linkedin || "linkedin.com"}</Text>
          <Text>GitHub: {data.github || "github.com"}</Text>
          <Text>Address: {data.address || "Your Address"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          {data.education.map((edu, index) => (
            <Text key={index} style={styles.text}>
              {edu.degree} from {edu.institution} ({edu.graduationYear})
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Experience</Text>
          {data.experience.map((exp, index) => (
            <Text key={index} style={styles.text}>
              {exp.jobTitle} at {exp.company} ({exp.duration})
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Skills</Text>
          {data.skills.map((skill, index) => (
            <Text key={index} style={styles.text}>
              • {skill}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Interests</Text>
          {data.interests.map((interest, index) => (
            <Text key={index} style={styles.text}>
              • {interest}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

ModernTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ModernTemplate;
