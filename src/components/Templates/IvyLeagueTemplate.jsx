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
    borderBottomWidth: 3,
    borderBottomColor: '#1a237e',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 8,
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    fontSize: 11,
    color: '#666666',
  },
  contactItem: {
    fontSize: 11,
    color: '#666666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a237e',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#1a237e',
    paddingBottom: 5,
  },
  summary: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.6,
    color: '#424242',
    textAlign: 'justify',
    fontStyle: 'italic',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#1a237e',
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    color: '#1a237e',
  },
  duration: {
    fontSize: 11,
    color: '#666666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 13,
    color: '#424242',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 11,
    color: '#424242',
    lineHeight: 1.5,
    marginTop: 8,
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
    width: 4,
    height: 4,
    backgroundColor: '#1a237e',
    borderRadius: 2,
    marginRight: 12,
    marginTop: 6,
  },
  achievementText: {
    fontSize: 11,
    color: '#424242',
    flex: 1,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 18,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  degree: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  institution: {
    fontSize: 12,
    color: '#424242',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  graduationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  graduationYear: {
    fontSize: 11,
    color: '#666666',
  },
  gpa: {
    fontSize: 11,
    color: '#666666',
  },
  twoColumnLayout: {
    flexDirection: 'row',
    gap: 25,
  },
  leftColumn: {
    width: '70%',
  },
  rightColumn: {
    width: '30%',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    backgroundColor: '#f5f5f5',
    color: '#1a237e',
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1a237e',
    fontWeight: 'bold',
  },
  rightSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a237e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 8,
    color: '#424242',
    paddingLeft: 10,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingLeft: 10,
  },
  languageName: {
    fontSize: 11,
    color: '#424242',
  },
  languageLevel: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  honorItem: {
    marginBottom: 12,
    paddingLeft: 10,
  },
  honorTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  honorDescription: {
    fontSize: 10,
    color: '#666666',
  },
});

const IvyLeagueTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Your Name',
    jobTitle: data.personalInfo?.jobTitle || 'Your Professional Title',
    email: data.personalInfo?.email || 'email@university.edu',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'City, State',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/profile',
    description:
      data.personalInfo?.description ||
      'Distinguished professional with extensive experience in academic and research environments. Proven track record of excellence in leadership, research, and educational initiatives.',
    skills: data.lists?.skills || [],
    experience: data.experience || [],
    education: data.education || [],
    languages: data.lists?.languages || [],
    projects: data.lists?.projects || [],
    certifications: data.lists?.certifications || [],
    courses: data.lists?.courses || [],
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{mappedData.description}</Text>
        </View>

        {/* Two Column Layout */}
        <View style={styles.twoColumnLayout}>
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
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <View style={styles.graduationInfo}>
                    <Text style={styles.graduationYear}>
                      Graduated: {edu.graduationYear}
                    </Text>
                    {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
                  </View>
                  {edu.description && (
                    <Text style={styles.description}>{edu.description}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Core Competencies */}
            <View style={styles.section}>
              <Text style={styles.rightSectionTitle}>Core Competencies</Text>
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
              <View style={styles.section}>
                <Text style={styles.rightSectionTitle}>Languages</Text>
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
            )}

            {/* Research Projects */}
            {mappedData.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.rightSectionTitle}>Research Projects</Text>
                {mappedData.projects.slice(0, 4).map((project, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {project}
                  </Text>
                ))}
              </View>
            )}

            {/* Certifications & Honors */}
            {mappedData.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.rightSectionTitle}>Certifications</Text>
                {mappedData.certifications.slice(0, 4).map((cert, index) => (
                  <View key={index} style={styles.honorItem}>
                    <Text style={styles.honorTitle}>{cert}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Professional Development */}
            {mappedData.courses.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.rightSectionTitle}>
                  Professional Development
                </Text>
                {mappedData.courses.slice(0, 3).map((course, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {course}
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

export default IvyLeagueTemplate;
