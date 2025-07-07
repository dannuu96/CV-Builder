import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  headerSection: {
    backgroundColor: '#f8f9fa',
    padding: 25,
    marginBottom: 25,
    borderRadius: 8,
    borderLeftWidth: 6,
    borderLeftColor: '#007bff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  contactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 11,
    color: '#6c757d',
  },
  contactItem: {
    fontSize: 11,
    color: '#6c757d',
  },
  mainContent: {
    flexDirection: 'row',
    gap: 25,
  },
  leftColumn: {
    width: '60%',
  },
  rightColumn: {
    width: '40%',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007bff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  rightSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007bff',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  summary: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.6,
    color: '#495057',
    textAlign: 'justify',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  experienceCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
  },
  duration: {
    fontSize: 10,
    color: '#6c757d',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 12,
    color: '#007bff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 11,
    color: '#495057',
    lineHeight: 1.5,
  },
  achievementsList: {
    marginTop: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: '#007bff',
    borderRadius: 3,
    marginRight: 12,
    marginTop: 5,
  },
  achievementText: {
    fontSize: 10,
    color: '#495057',
    flex: 1,
    lineHeight: 1.4,
  },
  educationCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 15,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  degree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#212529',
  },
  institution: {
    fontSize: 11,
    color: '#28a745',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  graduationYear: {
    fontSize: 10,
    color: '#6c757d',
  },
  skillsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontSize: 9,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontWeight: 'bold',
  },
  sidebarCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 20,
    borderRadius: 6,
    borderTopWidth: 4,
    borderTopColor: '#007bff',
  },
  listItem: {
    fontSize: 10,
    marginBottom: 8,
    color: '#495057',
    paddingLeft: 8,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingLeft: 8,
  },
  languageName: {
    fontSize: 10,
    color: '#495057',
  },
  languageLevel: {
    fontSize: 9,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingLeft: 8,
  },
  metricLabel: {
    fontSize: 10,
    color: '#495057',
  },
  metricValue: {
    fontSize: 10,
    color: '#007bff',
    fontWeight: 'bold',
  },
  certificationItem: {
    marginBottom: 12,
    paddingLeft: 8,
  },
  certTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#495057',
  },
  certIssuer: {
    fontSize: 9,
    color: '#6c757d',
  },
});

const ContemporaryTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Your Name',
    jobTitle: data.personalInfo?.jobTitle || 'Professional Title',
    email: data.personalInfo?.email || 'email@company.com',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'City, State',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/profile',
    website: data.personalInfo?.website || 'yourwebsite.com',
    description:
      data.personalInfo?.description ||
      'Results-driven professional with proven expertise in delivering innovative solutions and driving business growth through strategic leadership and collaborative teamwork.',
    skills: data.lists?.skills || [],
    experience: data.experience || [],
    education: data.education || [],
    languages: data.lists?.languages || [],
    projects: data.lists?.projects || [],
    certifications: data.lists?.certifications || [],
    interests: data.lists?.interests || [],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerSection}>
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

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.summary}>{mappedData.description}</Text>
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

                  <View style={styles.achievementsList}>
                    {exp.description &&
                      exp.description
                        .split('.')
                        .filter((item) => item.trim())
                        .slice(0, 3)
                        .map((achievement, idx) => (
                          <View key={idx} style={styles.achievementItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.achievementText}>
                              {achievement.trim()}.
                            </Text>
                          </View>
                        ))}
                  </View>
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
                    Graduated: {edu.graduationYear}
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
            {/* Core Skills */}
            <View style={styles.sidebarCard}>
              <Text style={styles.rightSectionTitle}>Core Skills</Text>
              <View style={styles.skillsGrid}>
                {mappedData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>

            {/* Key Projects */}
            {mappedData.projects.length > 0 && (
              <View style={styles.sidebarCard}>
                <Text style={styles.rightSectionTitle}>Key Projects</Text>
                {mappedData.projects.slice(0, 4).map((project, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {project}
                  </Text>
                ))}
              </View>
            )}

            {/* Languages */}
            {mappedData.languages.length > 0 && (
              <View style={styles.sidebarCard}>
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
              <View style={styles.sidebarCard}>
                <Text style={styles.rightSectionTitle}>Certifications</Text>
                {mappedData.certifications.slice(0, 4).map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Text style={styles.certTitle}>{cert}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Professional Metrics */}
            <View style={styles.sidebarCard}>
              <Text style={styles.rightSectionTitle}>Professional Metrics</Text>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Years of Experience</Text>
                <Text style={styles.metricValue}>
                  {mappedData.experience.length > 0
                    ? `${mappedData.experience.length}+`
                    : 'N/A'}
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Projects Completed</Text>
                <Text style={styles.metricValue}>
                  {mappedData.projects.length || 'Multiple'}
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Technical Skills</Text>
                <Text style={styles.metricValue}>
                  {mappedData.skills.length}+
                </Text>
              </View>
            </View>

            {/* Interests */}
            {mappedData.interests.length > 0 && (
              <View style={styles.sidebarCard}>
                <Text style={styles.rightSectionTitle}>Interests</Text>
                {mappedData.interests.slice(0, 6).map((interest, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {interest}
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

export default ContemporaryTemplate;
