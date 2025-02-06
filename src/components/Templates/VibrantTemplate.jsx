import React from "react";
import PropTypes from "prop-types";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const VibrantTemplate = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 45,
      fontSize: 12,
      fontFamily: "Helvetica",
      color: "#fff",
      backgroundColor: "#ff6f61", // vibrant coral background
    },
    header: {
      fontSize: 28,
      marginBottom: 10,
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#fff",
    },
    section: {
      marginBottom: 15,
      padding: 10,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#ffe066",
    },
    text: {
      marginBottom: 4,
      lineHeight: 1.5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{data.fullName || "Your Name"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Contact Info</Text>
          <Text>Email: {data.email || "email@example.com"}</Text>
          <Text>Phone: {data.phone || "+00 000 0000"}</Text>
          <Text>LinkedIn: {data.linkedin || "linkedin.com"}</Text>
          <Text>GitHub: {data.github || "github.com"}</Text>
          <Text>Address: {data.address || "Your Address"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          {data.education.map((edu, index) => (
            <Text key={index} style={styles.text}>
              {edu.degree} – {edu.institution} ({edu.graduationYear})
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

VibrantTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VibrantTemplate;
