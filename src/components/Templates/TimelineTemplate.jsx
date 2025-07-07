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
    marginBottom: 40,
    backgroundColor: '#26a69a',
    color: '#ffffff',
    padding: 30,
    borderRadius: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 16,
    marginBottom: 15,
    opacity: 0.9,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    fontSize: 12,
    opacity: 0.8,
  },
  contactItem: {
    fontSize: 12,
  },
  summary: {
    fontSize: 12,
    marginBottom: 30,
    lineHeight: 1.6,
    color: '#37474f',
    textAlign: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#26a69a',
  },
  timelineSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#26a69a',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 30,
  },
  timelineLine: {
    position: 'absolute',
    left: 15,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#26a69a',
  },
  timelineItem: {
    position: 'relative',
    marginBottom: 25,
    paddingLeft: 30,
  },
  timelineMarker: {
    position: 'absolute',
    left: -8,
    top: 5,
    width: 16,
    height: 16,
    backgroundColor: '#26a69a',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  timelineContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#26a69a',
  },
  timelineDate: {
    fontSize: 11,
    color: '#757575',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    fontWeight: 'bold',
  },
  timelineSubtitle: {
    fontSize: 12,
    color: '#37474f',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  timelineDescription: {
    fontSize: 11,
    color: '#37474f',
    lineHeight: 1.5,
  },
  skillsSection: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#26a69a',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  skillChip: {
    backgroundColor: '#26a69a',
    color: '#ffffff',
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontWeight: 'bold',
  },
  additionalInfo: {
    flexDirection: 'row',
    gap: 30,
  },
  additionalColumn: {
    flex: 1,
  },
  additionalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#26a69a',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  additionalCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderTopWidth: 4,
    borderTopColor: '#26a69a',
  },
  listItem: {
    fontSize: 11,
    marginBottom: 8,
    color: '#37474f',
    paddingLeft: 8,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  languageName: {
    fontSize: 11,
    color: '#37474f',
  },
  languageLevel: {
    fontSize: 10,
    color: '#757575',
    fontStyle: 'italic',
  },
});

const TimelineTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Professional Name',
    jobTitle: data.personalInfo?.jobTitle || 'Career Title',
    email: data.personalInfo?.email || 'email@professional.com',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'Location',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/profile',
    description:
      data.personalInfo?.description ||
      'Experienced professional with a proven track record of success and continuous growth throughout career journey.',
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
            <Text style={styles.contactItem}>{mappedData.email}</Text>
            <Text style={styles.contactItem}>•</Text>
            <Text style={styles.contactItem}>{mappedData.phone}</Text>
            <Text style={styles.contactItem}>•</Text>
            <Text style={styles.contactItem}>{mappedData.address}</Text>
            <Text style={styles.contactItem}>•</Text>
            <Text style={styles.contactItem}>{mappedData.linkedin}</Text>
          </View>
        </View>

        {/* Professional Summary */}
        <Text style={styles.summary}>{mappedData.description}</Text>

        {/* Experience Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Professional Journey</Text>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineLine} />
            {mappedData.experience.map((exp, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineMarker} />
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.timelineDate}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.timelineSubtitle}>{exp.company}</Text>
                  <Text style={styles.timelineDescription}>
                    {exp.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Education Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Educational Background</Text>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineLine} />
            {mappedData.education.map((edu, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineMarker} />
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineTitle}>{edu.degree}</Text>
                    <Text style={styles.timelineDate}>
                      {edu.graduationYear}
                    </Text>
                  </View>
                  <Text style={styles.timelineSubtitle}>{edu.institution}</Text>
                  {edu.description && (
                    <Text style={styles.timelineDescription}>
                      {edu.description}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Skills */}
        <View style={styles.skillsSection}>
          <Text style={styles.skillsTitle}>Core Competencies</Text>
          <View style={styles.skillsGrid}>
            {mappedData.skills.map((skill, index) => (
              <Text key={index} style={styles.skillChip}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.additionalInfo}>
          {/* Projects */}
          {mappedData.projects.length > 0 && (
            <View style={styles.additionalColumn}>
              <Text style={styles.additionalTitle}>Projects</Text>
              <View style={styles.additionalCard}>
                {mappedData.projects.slice(0, 4).map((project, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {project}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages & Certifications */}
          <View style={styles.additionalColumn}>
            {mappedData.languages.length > 0 && (
              <>
                <Text style={styles.additionalTitle}>Languages</Text>
                <View style={styles.additionalCard}>
                  {mappedData.languages.map((language, index) => (
                    <View key={index} style={styles.languageItem}>
                      <Text style={styles.languageName}>
                        {language.split('(')[0].trim()}
                      </Text>
                      <Text style={styles.languageLevel}>
                        {language.includes('(')
                          ? language.match(/\((.*?)\)/)?.[1] || 'Proficient'
                          : 'Proficient'}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {mappedData.certifications.length > 0 && (
              <>
                <Text style={styles.additionalTitle}>Certifications</Text>
                <View style={styles.additionalCard}>
                  {mappedData.certifications.slice(0, 3).map((cert, index) => (
                    <Text key={index} style={styles.listItem}>
                      • {cert}
                    </Text>
                  ))}
                </View>
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TimelineTemplate;
