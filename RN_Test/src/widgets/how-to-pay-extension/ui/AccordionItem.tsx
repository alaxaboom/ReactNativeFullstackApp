import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type AccordionItemProps = {
  question: string;
  answer: string;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleOpen}
        activeOpacity={0.8}
      >
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.toggleIcon}>{isOpen ? '−' : '+'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

