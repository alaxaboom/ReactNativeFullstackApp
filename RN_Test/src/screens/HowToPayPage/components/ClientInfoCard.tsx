import React from "react";
import { View, Text } from "react-native";
import { clientCardStyles as styles } from "../styles";

type ClientInfoCardProps = {
  title: string;
  bankInfo: {
    user: string;
    bank: string;
    billNumber: string;
    referenceNumber: string;
  };
};

const ClientInfoCard: React.FC<ClientInfoCardProps> = ({ title, bankInfo }) => {
  return (
    <View style={styles.grayContainer}>
      <Text style={styles.grayTitle}>{title}</Text>
      <View style={styles.grayRow}>
        <Text style={styles.grayLabel}>User</Text>
        <Text style={styles.grayValue}>{bankInfo.user}</Text>
      </View>
      <View style={styles.grayRow}>
        <Text style={styles.grayLabel}>Bank</Text>
        <Text style={styles.grayValue}>{bankInfo.bank}</Text>
      </View>
      <View style={styles.grayRow}>
        <Text style={styles.grayLabel}>Bill number</Text>
        <Text style={styles.grayValue}>{bankInfo.billNumber}</Text>
      </View>
      <View style={styles.grayRow}>
        <Text style={styles.grayLabel}>Reference number</Text>
        <Text style={styles.grayValue}>{bankInfo.referenceNumber}</Text>
      </View>
    </View>
  );
};

export default ClientInfoCard;