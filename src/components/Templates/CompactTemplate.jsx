import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: 25,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#8e44ad',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 12,
    color: '#8e44ad',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    color: '#34495e',
  },
  summary: {
    fontSize: 10,
    color: '#34495e',
    lineHeight: 1.4,
    marginBottom: 15,
    textAlign: 'justify',
  },
  mainLayout: {
    flexDirection: 'row',
    gap: 20,
  },
  leftColumn: {
    width: '70%',
  },
  rightColumn: {
    width: '30%',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8e44ad',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  jobTitleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  company: {
    fontSize: 10,
    color: '#8e44ad',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 9,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 9,
    color: '#34495e',
    lineHeight: 1.3,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  institution: {
    fontSize: 9,
    color: '#7f8c8d',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillChip: {
    backgroundColor: '#8e44ad',
    color: '#ffffff',
    fontSize: 8,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginBottom: 3,
  },
  rightSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8e44ad',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  listItem: {
    fontSize: 9,
    color: '#34495e',
    marginBottom: 4,
    paddingLeft: 5,
  },
  compactCard: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#8e44ad',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  languageName: {
    fontSize: 9,
    color: '#34495e',
  },
  languageLevel: {
    fontSize: 8,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
});

const CompactTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Your Name',
    jobTitle: data.personalInfo?.jobTitle || 'Professional Title',
    email: data.personalInfo?.email || 'email@example.com',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'Location',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/profile',
    description:
      data.personalInfo?.description ||
      'Efficient professional with strong results and proven track record.',
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
          <View style={styles.contactRow}>
            <Text>{mappedData.email}</Text>
            <Text>{mappedData.phone}</Text>
            <Text>{mappedData.address}</Text>
            <Text>{mappedData.linkedin}</Text>
          </View>
        </View>

        {/* Summary */}
        <Text style={styles.summary}>{mappedData.description}</Text>

        {/* Main Content */}
        <View style={styles.mainLayout}>
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

            {/* Projects */}
            {mappedData.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {mappedData.projects.slice(0, 3).map((project, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {project}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            <View style={styles.compactCard}>
              <Text style={styles.rightSectionTitle}>Skills</Text>
              <View style={styles.skillsGrid}>
                {mappedData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillChip}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>

            {/* Languages */}
            {mappedData.languages.length > 0 && (
              <View style={styles.compactCard}>
                <Text style={styles.rightSectionTitle}>Languages</Text>
                {mappedData.languages.map((language, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageName}>
                      {language.split('(')[0].trim()}
                    </Text>
                    <Text style={styles.languageLevel}>
                      {language.includes('(')
                        ? language.match(/\((.*?)\)/)?.[1] || 'Fluent'
                        : 'Fluent'}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {mappedData.certifications.length > 0 && (
              <View style={styles.compactCard}>
                <Text style={styles.rightSectionTitle}>Certifications</Text>
                {mappedData.certifications.slice(0, 4).map((cert, index) => (
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

export default CompactTemplate;
