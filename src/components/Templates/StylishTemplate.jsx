import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: 35,
  },
  headerContainer: {
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    padding: 30,
    marginBottom: 30,
    borderRadius: 12,
    position: 'relative',
  },
  headerAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: '#3498db',
    borderRadius: 50,
    opacity: 0.1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff',
  },
  jobTitle: {
    fontSize: 16,
    color: '#3498db',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    fontSize: 11,
    color: '#ecf0f1',
  },
  contactItem: {
    fontSize: 11,
    color: '#ecf0f1',
  },
  summarySection: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
  },
  summaryText: {
    fontSize: 12,
    color: '#2c3e50',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  mainContent: {
    flexDirection: 'row',
    gap: 25,
  },
  leftColumn: {
    width: '65%',
  },
  rightColumn: {
    width: '35%',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 8,
  },
  experienceCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderTopWidth: 4,
    borderTopColor: '#3498db',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  company: {
    fontSize: 12,
    color: '#3498db',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 10,
    color: '#7f8c8d',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  description: {
    fontSize: 11,
    color: '#34495e',
    lineHeight: 1.5,
  },
  educationCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  degree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  institution: {
    fontSize: 11,
    color: '#2ecc71',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  graduationYear: {
    fontSize: 10,
    color: '#7f8c8d',
  },
  sidebarCard: {
    backgroundColor: '#f8f9fa',
    padding: 18,
    marginBottom: 20,
    borderRadius: 8,
    borderTopWidth: 4,
    borderTopColor: '#3498db',
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#3498db',
    color: '#ffffff',
    fontSize: 9,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 10,
    color: '#34495e',
    marginBottom: 8,
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 8,
    color: '#3498db',
    marginRight: 8,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingLeft: 10,
  },
  languageName: {
    fontSize: 10,
    color: '#34495e',
  },
  languageLevel: {
    fontSize: 9,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  achievementBadge: {
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    fontSize: 9,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  progressBar: {
    backgroundColor: '#ecf0f1',
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    backgroundColor: '#3498db',
    height: 4,
    borderRadius: 2,
    width: '85%',
  },
});

const StylishTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Your Name',
    jobTitle: data.personalInfo?.jobTitle || 'Professional Title',
    email: data.personalInfo?.email || 'email@example.com',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'Your Location',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/profile',
    website: data.personalInfo?.website || 'yourwebsite.com',
    description:
      data.personalInfo?.description ||
      'Dynamic professional with innovative approach and strong commitment to excellence in all endeavors.',
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
        <View style={styles.headerContainer}>
          <View style={styles.headerAccent} />
          <Text style={styles.name}>{mappedData.fullName}</Text>
          <Text style={styles.jobTitle}>{mappedData.jobTitle}</Text>
          <View style={styles.contactGrid}>
            <Text style={styles.contactItem}>📧 {mappedData.email}</Text>
            <Text style={styles.contactItem}>📱 {mappedData.phone}</Text>
            <Text style={styles.contactItem}>📍 {mappedData.address}</Text>
            <Text style={styles.contactItem}>💼 {mappedData.linkedin}</Text>
            {mappedData.website && (
              <Text style={styles.contactItem}>🌐 {mappedData.website}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryText}>{mappedData.description}</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Professional Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {mappedData.experience.map((exp, index) => (
                <View key={index} style={styles.experienceCard}>
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
                <View key={index} style={styles.educationCard}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.graduationYear}>
                    Class of {edu.graduationYear}
                  </Text>
                  {edu.description && (
                    <Text style={styles.description}>{edu.description}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            <View style={styles.sidebarCard}>
              <Text style={styles.sidebarTitle}>Core Skills</Text>
              <View style={styles.skillsContainer}>
                {mappedData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>

            {/* Languages */}
            {mappedData.languages.length > 0 && (
              <View style={styles.sidebarCard}>
                <Text style={styles.sidebarTitle}>Languages</Text>
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

            {/* Key Projects */}
            {mappedData.projects.length > 0 && (
              <View style={styles.sidebarCard}>
                <Text style={styles.sidebarTitle}>Key Projects</Text>
                {mappedData.projects.slice(0, 4).map((project, index) => (
                  <Text key={index} style={styles.listItem}>
                    <Text style={styles.bullet}>▶</Text>
                    {project}
                  </Text>
                ))}
              </View>
            )}

            {/* Certifications */}
            {mappedData.certifications.length > 0 && (
              <View style={styles.sidebarCard}>
                <Text style={styles.sidebarTitle}>Certifications</Text>
                {mappedData.certifications.slice(0, 4).map((cert, index) => (
                  <View key={index}>
                    <Text style={styles.achievementBadge}>CERTIFIED</Text>
                    <Text style={styles.listItem}>{cert}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default StylishTemplate;
