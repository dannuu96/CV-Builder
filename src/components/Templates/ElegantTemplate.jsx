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
  decorativeBorder: {
    borderWidth: 3,
    borderColor: '#d4af37',
    borderRadius: 10,
    padding: 30,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d4af37',
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    letterSpacing: 2,
  },
  jobTitle: {
    fontSize: 16,
    color: '#d4af37',
    marginBottom: 15,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    fontSize: 11,
    color: '#7f8c8d',
  },
  contactItem: {
    fontSize: 11,
    color: '#7f8c8d',
  },
  separator: {
    fontSize: 11,
    color: '#bdc3c7',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#d4af37',
    borderBottomColor: '#d4af37',
    paddingVertical: 8,
  },
  summary: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.7,
    color: '#34495e',
    textAlign: 'center',
    fontStyle: 'italic',
    backgroundColor: '#faf7f0',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8dcc6',
  },
  experienceItem: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#fcfcfc',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  experienceHeader: {
    textAlign: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8dcc6',
  },
  jobTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  company: {
    fontSize: 13,
    color: '#d4af37',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 11,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 11,
    color: '#34495e',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 10,
  },
  achievementsList: {
    marginTop: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  elegantBullet: {
    width: 8,
    height: 8,
    backgroundColor: '#d4af37',
    borderRadius: 4,
    marginRight: 15,
    marginTop: 4,
  },
  achievementText: {
    fontSize: 11,
    color: '#34495e',
    flex: 1,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#faf7f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8dcc6',
    textAlign: 'center',
  },
  degree: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  institution: {
    fontSize: 12,
    color: '#d4af37',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  graduationYear: {
    fontSize: 11,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  skillsContainer: {
    backgroundColor: '#faf7f0',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8dcc6',
    textAlign: 'center',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  additionalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 20,
  },
  additionalColumn: {
    width: '48%',
  },
  miniSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  miniCard: {
    backgroundColor: '#fcfcfc',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e8dcc6',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 10,
    marginBottom: 6,
    color: '#34495e',
    textAlign: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
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
  footerDecoration: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#d4af37',
  },
});

const ElegantTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Distinguished Professional',
    jobTitle: data.personalInfo?.jobTitle || 'Executive Position',
    email: data.personalInfo?.email || 'professional@email.com',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'City, State',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/profile',
    description:
      data.personalInfo?.description ||
      'Accomplished professional with distinguished career achievements and proven leadership capabilities in driving organizational excellence and innovation.',
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
        <View style={styles.decorativeBorder}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{mappedData.fullName}</Text>
            <Text style={styles.jobTitle}>{mappedData.jobTitle}</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>{mappedData.email}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.contactItem}>{mappedData.phone}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.contactItem}>{mappedData.address}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.contactItem}>{mappedData.linkedin}</Text>
            </View>
          </View>

          {/* Professional Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{mappedData.description}</Text>
          </View>

          {/* Professional Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {mappedData.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitleText}>{exp.jobTitle}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.duration}>{exp.duration}</Text>
                </View>
                <Text style={styles.description}>{exp.description}</Text>

                <View style={styles.achievementsList}>
                  {exp.description &&
                    exp.description
                      .split('.')
                      .filter((item) => item.trim())
                      .slice(0, 3)
                      .map((achievement, idx) => (
                        <View key={idx} style={styles.achievementItem}>
                          <View style={styles.elegantBullet} />
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
                <Text style={styles.graduationYear}>
                  Class of {edu.graduationYear}
                </Text>
              </View>
            ))}
          </View>

          {/* Core Competencies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillsGrid}>
                {mappedData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Additional Information */}
          <View style={styles.additionalSection}>
            {/* Left Column - Languages & Certifications */}
            <View style={styles.additionalColumn}>
              {mappedData.languages.length > 0 && (
                <View style={styles.miniCard}>
                  <Text style={styles.miniSectionTitle}>Languages</Text>
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

              {mappedData.certifications.length > 0 && (
                <View style={styles.miniCard}>
                  <Text style={styles.miniSectionTitle}>Certifications</Text>
                  {mappedData.certifications.slice(0, 3).map((cert, index) => (
                    <Text key={index} style={styles.listItem}>
                      {cert}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            {/* Right Column - Projects & Interests */}
            <View style={styles.additionalColumn}>
              {mappedData.projects.length > 0 && (
                <View style={styles.miniCard}>
                  <Text style={styles.miniSectionTitle}>Notable Projects</Text>
                  {mappedData.projects.slice(0, 3).map((project, index) => (
                    <Text key={index} style={styles.listItem}>
                      {project}
                    </Text>
                  ))}
                </View>
              )}

              {mappedData.interests.length > 0 && (
                <View style={styles.miniCard}>
                  <Text style={styles.miniSectionTitle}>
                    Personal Interests
                  </Text>
                  {mappedData.interests.slice(0, 4).map((interest, index) => (
                    <Text key={index} style={styles.listItem}>
                      {interest}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Footer Decoration */}
          <Text style={styles.footerDecoration}>◆ ◆ ◆</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ElegantTemplate;
