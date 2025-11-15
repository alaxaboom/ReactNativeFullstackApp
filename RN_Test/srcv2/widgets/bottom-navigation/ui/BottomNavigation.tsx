import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../../shared/hooks/useAuth';
import { Screen } from '../../../shared/types/navigation';
import { useSmartNavigation } from '../../../shared/utils/smartNavigation';
import { useNavigation } from '../../../shared/lib/react-navigation/hooks';

type BottomNavigationProps = {
  currentScreen: Screen;
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen }) => {
  const { navigateTo } = useNavigation();
  const { isAuthenticated } = useAuth();
  const { navigateToHomeOrFirst } = useSmartNavigation();

  const isActive = (screen: Screen) => currentScreen === screen;

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateToHomeOrFirst(navigateTo)}
      >
        <Ionicons
          name="home-outline"
          size={28}
          color={isActive("home") || isActive("firstpage") ? "#00C853" : "#999"}
        />
        <Text
          style={[
            styles.navText,
            (isActive("home") || isActive("firstpage")) ? styles.navTextActive : null,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {isAuthenticated && (
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateTo("products", { tab: "loans" })}
        >
          <MaterialIcons
            name="attach-money"
            size={28}
            color={isActive("products") ? "#00C853" : "#999"}
          />
          <Text
            style={[
              styles.navText,
              isActive("products") ? styles.navTextActive : null,
            ]}
          >
            Loans
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo("howtopay")}
      >
        <Ionicons
          name="checkmark-done-circle-outline"
          size={28}
          color={isActive("howtopay") ? "#00C853" : "#999"}
        />
        <Text
          style={[
            styles.navText,
            isActive("howtopay") ? styles.navTextActive : null,
          ]}
        >
          How to pay
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo("locations")}
      >
        <Ionicons
          name="location-outline"
          size={28}
          color={isActive("locations") ? "#00C853" : "#999"}
        />
        <Text
          style={[
            styles.navText,
            isActive("locations") ? styles.navTextActive : null,
          ]}
        >
          Locations
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigateTo("contacts")}
      >
        <Ionicons
          name="chatbubble-outline"
          size={28}
          color={isActive("contacts") ? "#00C853" : "#999"}
        />
        <Text
          style={[
            styles.navText,
            isActive("contacts") ? styles.navTextActive : null,
          ]}
        >
          Contacts
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 5,
  },
  navItem: {
    alignItems: "center",
    paddingTop: 3,
    paddingBottom: 10,
  },
  navText: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    fontWeight: "600",
  },
  navTextActive: {
    fontSize: 10,
    color: "#00C853",
    marginTop: 4,
    fontWeight: "700",
  },
});


