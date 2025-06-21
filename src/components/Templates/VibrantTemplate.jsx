import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts (optional, for custom typography)
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf",
    }, // Regular
    {
      src: "https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhs.ttf",
      fontWeight: 600,
    }, // Bold
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 11,
    lineHeight: 1.5,
    backgroundColor: "#ffffff",
    fontFamily: "Open Sans",
  },
  container: {
    flexDirection: "row",
  },
  leftColumn: {
    width: "50%",
    backgroundColor: "#1e3a8a", // Navy blue
    padding: 20,
    color: "#ffffff",
  },
  rightColumn: {
    width: "50%",
    padding: 20,
    backgroundColor: "#f8fafc", // Light gray
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  contact: {
    marginBottom: 10,
    color: "#e2e8f0", // Light gray
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
    borderBottom: "2px solid #f97316", // Orange accent
    paddingBottom: 5,
  },
  item: {
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  itemSubtitle: {
    color: "#cbd5e1", // Light gray
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    marginBottom: 5,
    color: "#e2e8f0",
  },
  rightSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e3a8a", // Navy blue
    borderBottom: "2px solid #f97316", // Orange accent
    paddingBottom: 5,
  },
  rightItemTitle: {
    fontWeight: "bold",
    color: "#1e3a8a", // Navy blue
  },
  rightItemSubtitle: {
    color: "#64748b", // Gray
  },
});

const VibrantProfessionalTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          <View style={styles.header}>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            <Text style={styles.contact}>📧 {data.personalInfo.email}</Text>
            <Text style={styles.contact}>📞 {data.personalInfo.phone}</Text>
            <Text style={styles.contact}>📍 {data.personalInfo.address}</Text>
            <Text style={styles.contact}>🔗 {data.personalInfo.linkedin}</Text>
            <Text style={styles.contact}>🐱 {data.personalInfo.github}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.list}>
              {data.lists.skills.map((skill, index) => (
                <Text key={index} style={styles.listItem}>
                  • {skill}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.list}>
              {data.lists.languages.map((lang, index) => (
                <Text key={index} style={styles.listItem}>
                  • {lang}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.rightSectionTitle}>Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.rightItemTitle}>{exp.jobTitle}</Text>
                <Text style={styles.rightItemSubtitle}>{exp.company}</Text>
                <Text style={styles.rightItemSubtitle}>{exp.duration}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.rightSectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.rightItemTitle}>{edu.degree}</Text>
                <Text style={styles.rightItemSubtitle}>{edu.institution}</Text>
                <Text style={styles.rightItemSubtitle}>
                  {edu.graduationYear}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default VibrantProfessionalTemplate;
