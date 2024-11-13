import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const faqData = [
  { question: 'How does the AI recommender system work for freelancers?', answer: 'Our AI recommender system matches you with relevant projects based on your skills, experience, portfolio, and past work. It analyses your profile data, work preferences, and project history to suggest projects that align with your expertise and interests.' },
  { question: 'Do freelancers need to manually apply to projects, or does the AI do that for me?', answer: 'The AI does not apply to projects on your behalf. However, it suggests projects that are a good match for you. You can review these suggestions and apply manually or use the "Auto-Apply" feature, if available, to streamline the process.' },
  { question: 'How can I improve my recommendations?', answer: 'To get better recommendations, ensure that your profile is up to date. Add detailed descriptions of your skills, portfolio, and past projects. The more information the AI has, the more accurate and relevant the recommendations will be.' },
  { question: 'Will the AI suggest only projects within my primary skill set?', answer: 'While the AI focuses on your primary skills, it also suggests projects that may be a good fit based on secondary or related skills. If you are interested in expanding into new areas, the AI will adapt to show opportunities that fit those interests as well.' },
  { question: 'Can I trust suggestions from the AI?', answer: 'Yes, the AI is built to analyse thousands of data points, ensuring it provides highly relevant and personalized recommendations. However, you should always review the suggested projects to make sure they align with your career goals.' },
  { question: 'Can I filter the project recommendations?', answer: 'Yes! You can set filters based on factors like project budget, duration, type of work (full-time, part-time, contract), industry, or location. This allows you to fine-tune the recommendations and focus on the projects that matter most to you.' },
  { question: 'How do I know if a project is a good fit for me?', answer: 'The AI will provide a compatibility score or match percentage based on how well your skills and experience align with the project. You can review this score and assess the project’s details to make an informed decision.' },
];
const FAQScreen = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle the visibility of the answer and ensure only one question is active at a time
  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ScrollView style={styles.container}>
      {faqData.map((item, index) => (
        <View
          key={index}
          style={[styles.faqItem, activeIndex === index && styles.activeFaqItem]} // Apply background change when active
        >
          <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.questionContainer}>
            <Text
              style={[
                styles.question,
                activeIndex === index && { color: '#1d6b6b' }, // Change color to orange when active
              ]}
            >
              {item.question}
            </Text>
            <Icon
              name={activeIndex === index ? 'chevron-up' : 'chevron-down'} // Toggle between up and down arrow
              size={24}s
              style={[
                styles.icon,
                activeIndex === index && { color: '#1d6b6b' }, // Change icon color to orange when active
              ]}
            />
          </TouchableOpacity>
          {activeIndex === index && <Text style={styles.answer}>{item.answer}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1d6b6b',
  },
  faqItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',  // Default line color
    padding: 10,
  },
  activeFaqItem: {
    backgroundColor: '#81cdc6',  // Light background color when active
    borderRadius: 10,            // Slight rounding of corners
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    maxWidth: 300,
  },
  answer: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    textAlign: "justify"
  },
  icon:{
    alignSelf: 'flex-end',
    color: 'white'
  },
});

export default FAQScreen;
