// Import Librairies.
import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";

// Import Customs Components.
import ButtonToggle from "./ButtonToggle";
import LabelContainer from "./LabelContainer";
import RadioList from "./RadioList";

// Import Functions.
import {
  getTradText,
  isValidHour,
  registerForPushNotificationsAsync,
} from "../scripts";

// Import Constants.
import { COLORS_APP, COLORS_DIFFICULTY } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import TextTraduction from "./TextTraduction";

const OptionsBodyEdit = ({ workout, setWorkout, user, setUser }) => {
  const label_size = 18;
  const states_days = [
    getTradText(user.language, "monday_short"),
    getTradText(user.language, "thuesday_short"),
    getTradText(user.language, "wednesday_short"),
    getTradText(user.language, "thursday_short"),
    getTradText(user.language, "friday_short"),
    getTradText(user.language, "saturday_short"),
    getTradText(user.language, "sunday_short"),
  ];
  const states_difficulty = [1, 2, 3, 4, 5];

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (!isValidHour(workout.notification.alert_hour))
      setWorkout((p) => ({
        ...p,
        notification: { ...p.notification, alert_hour: "8" },
      }));

    registerForPushNotificationsAsync(setUser).then((token) => {
      setUser((p) => ({ ...p, notification: { ...p.notification, token } }));
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [workout]);

  return (
    <ScrollView>
      <View style={styles.ctn_boxes}>
        <LabelContainer key_text={"difficulty"} size={label_size} />
        <RadioList
          items={states_difficulty}
          current_checked={states_difficulty[workout.difficulty - 1]}
          onChange={(v) => setWorkout({ ...workout, difficulty: v })}
          bd_colors={COLORS_DIFFICULTY}
        />
      </View>

      <View style={styles.ctn_boxes}>
        <LabelContainer key_text={"schedule"} size={label_size} />
        <View style={styles.ctn_flex_boxes}>
          {states_days.map((day, id) => {
            return (
              <ButtonToggle
                key={id}
                text={day}
                txt_colors={COLORS_APP.font_third}
                txt_colors_active={COLORS_APP.font_main}
                state={workout.days[id]}
                onPress={() => scheduleDays(id)}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.ctn_boxes}>
        <LabelContainer key_text={"notification"} size={label_size} />
        <View style={styles.ctn_flex_boxes}>
          <TextTraduction style={styles.txt_notif} key_text={"recv_notif"} />
          <Switch
            value={workout.notification.is_active}
            onValueChange={(bool) =>
              setWorkout((p) => ({
                ...p,
                notification: { ...p.notification, is_active: bool },
              }))
            }
          />
        </View>

        <View
          style={[
            styles.ctn_flex_boxes,
            styles.ctn_hours,
            !workout.notification.is_active && styles.ctn_disable,
          ]}
        >
          <TextTraduction style={styles.txt_notif} key_text={"training_hour"} />
          <View>
            <TextInput
              placeholderTextColor={COLORS_APP.font_secs}
              keyboardType={"number-pad"}
              maxLength={2}
              placeholder={"8"}
              style={styles.input}
              editable={workout.notification.is_active}
              value={workout.notification.alert_hour}
              onChangeText={(t) =>
                setWorkout((p) => ({
                  ...p,
                  notification: { ...p.notification, alert_hour: t },
                }))
              }
            />
            <Text style={styles.txt_suffix_h}>h</Text>
          </View>
        </View>
        <View>
          {!user.notification.is_active && (
            <TextTraduction
              key_text={"warning_notif"}
              style={styles.txt_warning}
              numberOfLines={2}
            />
          )}
          {user.notification.token == undefined && (
            <TextTraduction
              key_text={"error_notif"}
              style={styles.txt_error}
              numberOfLines={2}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );

  // Define onPress functions.
  /** Schedule workout days */
  function scheduleDays(id_days) {
    const days = workout.days.map((item, index) => {
      if (index === id_days) return !item;
      return item;
    });

    setWorkout({ ...workout, days });
  }
};

export default OptionsBodyEdit;

const styles = StyleSheet.create({
  ctn_flex_boxes: {
    flexDirection: "row",
    alignItems: "center",
  },

  ctn_boxes: {
    marginTop: 15,
  },

  ctn_disable: {
    opacity: 0.3,
  },

  btn_notification: {
    borderWidth: 3,
    height: 8,
    borderColor: COLORS_APP.cta,
  },

  btn_notification_active: {
    backgroundColor: COLORS_APP.cta,
  },

  txt_notif: {
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_main,
    flex: 6,
    fontSize: 15,
  },

  ctn_hours: {
    marginTop: 25,
  },

  input: {
    backgroundColor: COLORS_APP.background_secs,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 70,
    textAlign: "right",
    paddingRight: 18,
    fontFamily: FONT_FAMILY.main,
    fontSize: 15,
    color: COLORS_APP.font_third,
  },

  txt_suffix_h: {
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_third,
    position: "absolute",
    right: 5,
    top: 17,
    fontSize: 18,
  },

  txt_warning: {
    color: COLORS_APP.warning,
    marginBottom: 5,
  },

  txt_error: {
    color: COLORS_APP.destructible,
  },
});
