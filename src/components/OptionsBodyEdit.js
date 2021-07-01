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
import { isValidHour, registerForPushNotificationsAsync } from "../scripts";

// Import Constants.
import { COLORS_APP, COLORS_DIFFICULTY } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";

const OptionsBodyEdit = ({ workout, setWorkout, user, setUser }) => {
  const label_size = 18;
  const states_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const states_difficulty = [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
  ];

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (!isValidHour(workout.alert_hour))
      setWorkout((p) => ({ ...p, alert_hour: "8" }));

    registerForPushNotificationsAsync(setUser).then((token) => {
      setUser((p) => ({ ...p, notification: token }));
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
        <LabelContainer text={"Difficulty"} size={label_size} />
        <RadioList
          items={states_difficulty}
          current_checked={states_difficulty[workout.difficulty - 1].key}
          onChange={(v) => setWorkout({ ...workout, difficulty: v })}
          bd_colors={COLORS_DIFFICULTY}
        />
      </View>

      <View style={styles.ctn_boxes}>
        <LabelContainer text={"Schedule"} size={label_size} />
        <View style={styles.ctn_flex_boxes}>
          {states_days.map((day, id) => {
            return (
              <ButtonToggle
                key={id}
                text={day}
                txt_colors={COLORS_APP.font_third}
                state={workout.days[id]}
                onChange={()=>scheduleDays(id)}
                style_active={styles.btn_tgl_active}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.ctn_boxes}>
        <LabelContainer text={"Notification"} size={label_size} />
        <View style={styles.ctn_flex_boxes}>
          <Text style={styles.txt_notif}>Receive a notification</Text>
          <Switch
            value={workout.notification}
            onValueChange={(v) =>
              setWorkout((p) => ({ ...p, notification: v }))
            }
          />
        </View>

        <View
          style={[
            styles.ctn_flex_boxes,
            styles.ctn_hours,
            !workout.notification && styles.ctn_disable,
          ]}
        >
          <Text style={styles.txt_notif}>The hour of training</Text>
          <View>
            <TextInput
              placeholderTextColor={COLORS_APP.font_secs}
              keyboardType={"number-pad"}
              maxLength={2}
              placeholder={"8"}
              style={styles.input}
              editable={workout.notification}
              value={workout.alert_hour}
              onChangeText={(t) => setWorkout((p) => ({ ...p, alert_hour: t }))}
            />
            <Text style={styles.txt_suffix_h}>h</Text>
          </View>
          {user.notification === undefined && (
            <Text style={styles.txt_error} numberOfLines={2}>
              Please allow notifications to be sent in your phone settings.
            </Text>
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

  btn_tgl_active: {
    borderColor: COLORS_APP.cta,
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

  txt_error: {
    position: "absolute",
    bottom: -20,
    color: COLORS_APP.destructible,
    width: "80%",
  },
});
