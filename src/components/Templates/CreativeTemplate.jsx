import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: 0,
  },
  leftColumn: {
    width: '40%',
    backgroundColor: '#e91e63',
    padding: 30,
    color: '#ffffff',
    position: 'relative',
  },
  rightColumn: {
    width: '60%',
    padding: 30,
    backgroundColor: '#ffffff',
  },
  creativeHeader: {
    textAlign: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  jobTitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fce4ec',
    fontStyle: 'italic',
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 8,
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#ad1457',
    paddingBottom: 5,
  },
  rightSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#e91e63',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 3,
    borderBottomColor: '#e91e63',
    paddingBottom: 8,
  },
  creativeSkillItem: {
    marginBottom: 15,
  },
  skillName: {
    fontSize: 11,
    color: '#ffffff',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  skillBar: {
    backgroundColor: '#ad1457',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  skillLevel: {
    backgroundColor: '#ffffff',
    height: 4,
    width: '90%',
    borderRadius: 2,
  },
  creativeSummary: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.6,
    color: '#424242',
    textAlign: 'justify',
    backgroundColor: '#fce4ec',
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#e91e63',
  },
  experienceItem: {
    marginBottom: 25,
    position: 'relative',
    paddingLeft: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#e91e63',
  },
  experienceHeader: {
    marginBottom: 10,
  },
  jobTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 5,
  },
  company: {
    fontSize: 13,
    color: '#424242',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 10,
    color: '#757575',
    backgroundColor: '#fce4ec',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    alignSelf: 'flex-start',
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
  creativeBullet: {
    width: 8,
    height: 8,
    backgroundColor: '#e91e63',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 4,
  },
  achievementText: {
    fontSize: 10,
    color: '#424242',
    flex: 1,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fce4ec',
    borderRadius: 8,
    borderTopWidth: 4,
    borderTopColor: '#e91e63',
  },
  degree: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  institution: {
    fontSize: 12,
    color: '#424242',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  graduationYear: {
    fontSize: 10,
    color: '#757575',
  },
  creativeSidebarSection: {
    marginBottom: 25,
  },
  creativeListItem: {
    fontSize: 10,
    marginBottom: 8,
    color: '#ffffff',
    paddingLeft: 8,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingLeft: 8,
  },
  languageName: {
    fontSize: 10,
    color: '#ffffff',
  },
  languageLevel: {
    fontSize: 9,
    color: '#fce4ec',
    fontStyle: 'italic',
  },
  creativeInterestTag: {
    backgroundColor: '#ad1457',
    color: '#ffffff',
    fontSize: 9,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  portfolioItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e91e63',
  },
  portfolioTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 4,
  },
  portfolioDescription: {
    fontSize: 9,
    color: '#424242',
  },
  creativeQuote: {
    fontSize: 12,
    color: '#ffffff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ad1457',
    borderRadius: 8,
  },
});

const CreativeTemplate = ({ data = {} }) => {
  const mappedData = {
    fullName: data.personalInfo?.fullName || 'Creative Professional',
    jobTitle: data.personalInfo?.jobTitle || 'Creative Director',
    email: data.personalInfo?.email || 'creative@design.com',
    phone: data.personalInfo?.phone || '(000) 000-0000',
    address: data.personalInfo?.address || 'Creative City, State',
    linkedin: data.personalInfo?.linkedin || 'linkedin.com/in/creative',
    website: data.personalInfo?.website || 'myportfolio.com',
    github: data.personalInfo?.github || 'github.com/creative',
    description:
      data.personalInfo?.description ||
      'Innovative creative professional passionate about pushing boundaries and creating impactful design solutions that inspire and engage audiences.',
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
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Header */}
          <View style={styles.creativeHeader}>
            <Text style={styles.name}>{mappedData.fullName}</Text>
            <Text style={styles.jobTitle}>{mappedData.jobTitle}</Text>
          </View>

          {/* Creative Quote */}
          <View style={styles.creativeQuote}>
            <Text>
              "Design is not just what it looks like and feels like. Design is
              how it works."
            </Text>
          </View>

          {/* Contact Information */}
          <View style={styles.creativeSidebarSection}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.contactInfo}>📧 {mappedData.email}</Text>
            <Text style={styles.contactInfo}>📱 {mappedData.phone}</Text>
            <Text style={styles.contactInfo}>📍 {mappedData.address}</Text>
            <Text style={styles.contactInfo}>💼 {mappedData.linkedin}</Text>
            <Text style={styles.contactInfo}>🌐 {mappedData.website}</Text>
            {mappedData.github && (
              <Text style={styles.contactInfo}>🔗 {mappedData.github}</Text>
            )}
          </View>

          {/* Creative Skills */}
          <View style={styles.creativeSidebarSection}>
            <Text style={styles.sectionTitle}>Creative Skills</Text>
            {mappedData.skills.slice(0, 8).map((skill, index) => (
              <View key={index} style={styles.creativeSkillItem}>
                <Text style={styles.skillName}>{skill}</Text>
                <View style={styles.skillBar}>
                  <View
                    style={[
                      styles.skillLevel,
                      { width: `${85 + (index % 3) * 5}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Languages */}
          {mappedData.languages.length > 0 && (
            <View style={styles.creativeSidebarSection}>
              <Text style={styles.sectionTitle}>Languages</Text>
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

          {/* Interests */}
          {mappedData.interests.length > 0 && (
            <View style={styles.creativeSidebarSection}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.interestsGrid}>
                {mappedData.interests.slice(0, 8).map((interest, index) => (
                  <Text key={index} style={styles.creativeInterestTag}>
                    {interest}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Portfolio Highlights */}
          {mappedData.projects.length > 0 && (
            <View style={styles.creativeSidebarSection}>
              <Text style={styles.sectionTitle}>Portfolio</Text>
              {mappedData.projects.slice(0, 3).map((project, index) => (
                <View key={index} style={styles.portfolioItem}>
                  <Text style={styles.portfolioTitle}>
                    {project.split(' - ')[0] || project}
                  </Text>
                  <Text style={styles.portfolioDescription}>
                    {project.split(' - ')[1] || 'Creative project showcase'}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Creative Summary */}
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.rightSectionTitle}>Creative Vision</Text>
            <Text style={styles.creativeSummary}>{mappedData.description}</Text>
          </View>

          {/* Professional Experience */}
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.rightSectionTitle}>
              Professional Experience
            </Text>
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
                          <View style={styles.creativeBullet} />
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
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.rightSectionTitle}>Education</Text>
            {mappedData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
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

          {/* Certifications */}
          {mappedData.certifications.length > 0 && (
            <View style={{ marginBottom: 25 }}>
              <Text style={styles.rightSectionTitle}>Certifications</Text>
              {mappedData.certifications.slice(0, 4).map((cert, index) => (
                <View key={index} style={styles.achievementItem}>
                  <View style={styles.creativeBullet} />
                  <Text style={styles.achievementText}>{cert}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CreativeTemplate;
