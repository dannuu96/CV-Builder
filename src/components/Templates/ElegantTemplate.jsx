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
  family: "Montserrat",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf",
    }, // Regular
    {
      src: "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD-w.ttf",
      fontWeight: 600,
    }, // Bold
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    backgroundColor: "#f0f4f8", // Light mint green
    fontFamily: "Montserrat",
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "2px solid #ff6f61", // Coral accent
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50", // Dark gray
  },
  contact: {
    marginTop: 10,
    color: "#4a5568", // Gray
  },
  icon: {
    marginRight: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6f61", // Coral accent
    marginBottom: 10,
  },
  item: {
    marginBottom: 15,
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#2c3e50", // Dark gray
  },
  itemSubtitle: {
    color: "#4a5568", // Gray
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    marginBottom: 5,
    color: "#2c3e50", // Dark gray
  },
});

const CreativeMinimalistTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        <View style={styles.contact}>
          <Text>
            <Text style={styles.icon}>📧</Text> {data.personalInfo.email}
          </Text>
          <Text>
            <Text style={styles.icon}>📞</Text> {data.personalInfo.phone}
          </Text>
          <Text>
            <Text style={styles.icon}>📍</Text> {data.personalInfo.address}
          </Text>
          <Text>
            <Text style={styles.icon}>🔗</Text> {data.personalInfo.linkedin}
          </Text>
          <Text>
            <Text style={styles.icon}>🐱</Text> {data.personalInfo.github}
          </Text>
        </View>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
            <Text style={styles.itemSubtitle}>{exp.company}</Text>
            <Text style={styles.itemSubtitle}>{exp.duration}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTitle}>{edu.degree}</Text>
            <Text style={styles.itemSubtitle}>{edu.institution}</Text>
            <Text style={styles.itemSubtitle}>{edu.graduationYear}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
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

      {/* Languages */}
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
    </Page>
  </Document>
);

export default CreativeMinimalistTemplate;
