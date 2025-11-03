import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { accordionItemStyles } from "../styles";

type AccordionItemProps = {
  question: string;
  answer: string;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={accordionItemStyles.container}>
      <TouchableOpacity
        style={accordionItemStyles.header}
        onPress={toggleOpen}
        activeOpacity={0.8}
      >
        <Text style={accordionItemStyles.question}>{question}</Text>
        <Text style={accordionItemStyles.toggleIcon}>{isOpen ? "−" : "+"}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={accordionItemStyles.content}>
          <Text style={accordionItemStyles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default AccordionItem;