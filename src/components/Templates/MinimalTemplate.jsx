import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: 50,
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  contactInfo: {
    flexDirection: 'row',
    gap: 20,
    fontSize: 11,
    color: '#34495e',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 11,
    color: '#34495e',
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  company: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  duration: {
    fontSize: 10,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 11,
    color: '#34495e',
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  institution: {
    fontSize: 11,
    color: '#7f8c8d',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    fontSize: 11,
    color: '#34495e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 15,
  },
  listItem: {
    fontSize: 11,
    color: '#34495e',
    marginBottom: 6,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 30,
  },
  leftColumn: {
    width: '70%',
  },
  rightColumn: {
    width: '30%',
  },
});

const MinimalTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Your Name',
    jobTitle: data.personalInfo?.jobTitle || 'Your Title',
    email: data.personalInfo?.email || 'email@example.com',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'Your Address',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/profile',
    description:
      data.personalInfo?.description ||
      'Professional summary highlighting your experience and goals.',
    skills: data.lists?.skills || [],
    experience: data.experience || [],
    education: data.education || [],
    languages: data.lists?.languages || [],
    projects: data.lists?.projects || [],
    certifications: data.lists?.certifications || [],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{mappedData.fullName}</Text>
          <Text style={styles.jobTitle}>{mappedData.jobTitle}</Text>
          <View style={styles.contactInfo}>
            <Text>{mappedData.email}</Text>
            <Text>•</Text>
            <Text>{mappedData.phone}</Text>
            <Text>•</Text>
            <Text>{mappedData.address}</Text>
            <Text>•</Text>
            <Text>{mappedData.linkedin}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>{mappedData.description}</Text>
        </View>

        {/* Two Column Layout */}
        <View style={styles.twoColumn}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {mappedData.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.jobTitleText}>{exp.jobTitle}</Text>
                    <Text style={styles.duration}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {mappedData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>
                    {edu.institution}, {edu.graduationYear}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsGrid}>
                {mappedData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>

            {/* Languages */}
            {mappedData.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                {mappedData.languages.map((language, index) => (
                  <Text key={index} style={styles.listItem}>
                    {language}
                  </Text>
                ))}
              </View>
            )}

            {/* Projects */}
            {mappedData.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {mappedData.projects.slice(0, 4).map((project, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {project}
                  </Text>
                ))}
              </View>
            )}

            {/* Certifications */}
            {mappedData.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {mappedData.certifications.slice(0, 3).map((cert, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {cert}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalTemplate;
