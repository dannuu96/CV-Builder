import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: 40,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  jobTitle: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    fontSize: 11,
    color: '#333333',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingBottom: 5,
  },
  description: {
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 15,
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  company: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  institution: {
    fontSize: 11,
    color: '#333333',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillItem: {
    fontSize: 11,
    color: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 0,
  },
  listItem: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 8,
    paddingLeft: 15,
  },
  bullet: {
    fontSize: 11,
    color: '#333333',
    marginRight: 8,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 30,
  },
  leftColumn: {
    width: '65%',
  },
  rightColumn: {
    width: '35%',
  },
});

const ClassicTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Your Name',
    jobTitle: data.personalInfo?.jobTitle || 'Professional Title',
    email: data.personalInfo?.email || 'email@example.com',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'Your Address',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/profile',
    description:
      data.personalInfo?.description ||
      'Professional summary highlighting your experience and qualifications.',
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
            <Text>•</Text>
            <Text>{mappedData.phone}</Text>
            <Text>•</Text>
            <Text>{mappedData.address}</Text>
            <Text>•</Text>
            <Text>{mappedData.linkedin}</Text>
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.description}>{mappedData.description}</Text>
        </View>

        {/* Two Column Layout */}
        <View style={styles.twoColumn}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Professional Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
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
                    <Text style={styles.bullet}>•</Text>
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
                    <Text style={styles.bullet}>•</Text>
                    {project}
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
                    <Text style={styles.bullet}>•</Text>
                    {cert}
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

export default ClassicTemplate;
