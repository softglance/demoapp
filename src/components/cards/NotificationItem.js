/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from "color";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Swipeout from 'react-native-swipeout';

// import components
import { Caption, Subtitle1, Subtitle2 } from '../text/CustomText';
import TouchableItem from '../TouchableItem';

// import colors. layout
import Colors from '../../theme/colors';

// NotificationItem Config
const NOTIFICATIONS_ICON = "bell-ring-outline";

const ON_THE_WAY_ICON = "cube-send";
const READY_FOR_DELIVERY_ICON = "map-marker-radius";
const FAILED_DELIVERY_ICON = "flash";
const DELIVERED_ICON = "check";
const EXCEPTION_ICON = "close";

const DELETE_ICON = "trash-can-outline";

const DEFAULT_ICON_COLOR = Colors.primaryColor;
const ON_THE_WAY_ICON_COLOR = "#1781fe";
const READY_FOR_DELIVERY_ICON_COLOR = "#e5910c";
const FAILED_DELIVERY_ICON_COLOR = "#924dae";
const DELIVERED_ICON_COLOR = "#2ab77c";
const EXCEPTION_ICON_COLOR = "#e75674";

const READOUT_ICON_COLOR = "rgba(35, 47, 52, 0.56)";
const READOUT_ICON_BACKGROUND = "rgba(35, 47, 52, 0.12)";

// NotificationItem Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    backgroundColor: Colors.background
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    height: 92
  },
  primaryArea: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  textContainer: {
    flex: 1
  },
  firstLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  firstLine: {
    flex: 1
  },
  unreadFirstLine: {
    fontWeight: "700"
  },
  unreadText: {
    color: Colors.primaryText,
    fontWeight: "500"
  },
  meta: {
    marginLeft: 4,
    minWidth: 24,
    height: 24
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 92
  }
});

// NotificationItem Props
type Props = {
  activeOpacity: number,
  type: "on_the_way" | "ready_for_delivery" | "failed_delivery" | "delivered" | "exception",
  title: string,
  text: string,
  meta: string,
  onPress: () => {},
  readOut: boolean,
  swipeoutOnPressRemove: () => {}
};

// NotificationItem Functions & Components
renderIcon = (type, readOut) => {

  let ICON_NAME, ICON_COLOR, ICON_BACKGROUND;
  
  switch (type) {
    case "on_the_way":
      ICON_NAME = ON_THE_WAY_ICON;
      ICON_COLOR = ON_THE_WAY_ICON_COLOR;
      ICON_BACKGROUND = Color(ON_THE_WAY_ICON_COLOR).alpha(0.16);
      break;
    case "ready_for_delivery":
      ICON_NAME = READY_FOR_DELIVERY_ICON;
      ICON_COLOR = READY_FOR_DELIVERY_ICON_COLOR;
      ICON_BACKGROUND = Color(READY_FOR_DELIVERY_ICON_COLOR).alpha(0.16);
      break;
    case "failed_delivery": 
      ICON_NAME = FAILED_DELIVERY_ICON;
      ICON_COLOR = FAILED_DELIVERY_ICON_COLOR;
      ICON_BACKGROUND = Color(FAILED_DELIVERY_ICON_COLOR).alpha(0.16);
      break;
    case "delivered": 
      ICON_NAME = DELIVERED_ICON;
      ICON_COLOR = DELIVERED_ICON_COLOR;
      ICON_BACKGROUND = Color(DELIVERED_ICON_COLOR).alpha(0.16);
      break;
    case "exception":
      ICON_NAME = EXCEPTION_ICON;
      ICON_COLOR = EXCEPTION_ICON_COLOR;
      ICON_BACKGROUND = Color(EXCEPTION_ICON_COLOR).alpha(0.16);
      break;
    default:
      ICON_NAME = NOTIFICATIONS_ICON;
      ICON_COLOR = DEFAULT_ICON_COLOR;
      ICON_BACKGROUND = Color(Colors.primaryColor).alpha(0.12);
  }

  if (readOut) {
    ICON_BACKGROUND = READOUT_ICON_BACKGROUND;
    ICON_COLOR = READOUT_ICON_COLOR;
  }

  return (
    <View style={[styles.iconContainer, { backgroundColor: ICON_BACKGROUND }]}>
      <Icon
        name={ICON_NAME}
        size={23}
        color={ICON_COLOR}
      />
    </View>
  );
}

const DeleteButton = () => (
  <View style={styles.deleteButton}>
    <Icon
      name={DELETE_ICON}
      size={22}
      color={Colors.error}
    />
  </View>
);

// NotificationItem
const NotificationItem = ({
  activeOpacity = 0.85,
  type,
  title,
  text,
  meta,
  onPress,
  readOut = true,
  swipeoutOnPressRemove
}: Props) => {

  var swipeoutBtns = [
    {
      backgroundColor: Color(Colors.error).alpha(0.12).string(),
      onPress: swipeoutOnPressRemove,
      component: <DeleteButton />
    }
  ];

  return (
    <Swipeout style={styles.container} right={swipeoutBtns}>
      <TouchableItem
        onPress={onPress}
        activeOpacity={activeOpacity}
        useForeground
      >
        <View style={styles.content}>
          <View style={styles.primaryArea}>
            { renderIcon(type, readOut) }

            <View style={styles.textContainer}>
              <View style={styles.firstLineContainer}>
                <Subtitle1 numberOfLines={1} style={[styles.firstLine, !readOut && styles.unreadFirstLine]}>
                  {title}
                </Subtitle1>

                <View style={styles.meta}>
                  <Caption style={!readOut && styles.unreadText}>{meta}</Caption>
                </View>
              </View>

              <View style={styles.secondLineContainer}>
                <Subtitle2 numberOfLines={2} style={!readOut && styles.unreadText}>
                  {text}
                </Subtitle2>
              </View>
            </View>
          </View>
        </View>
      </TouchableItem>
    </Swipeout>
  );
};

export default NotificationItem;
