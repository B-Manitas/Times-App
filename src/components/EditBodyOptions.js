// Import Librairies.
import React, { useRef, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as Notifications from "expo-notifications";

// Import Customs Components.
import ButtonToggle from "./ButtonToggle";
import ButtonToggleImage from "./ButtonToggleImage";
import LabelContainer from "./LabelContainer";
import RadioList from "./RadioList";
import TextField from "./TextField";
import TextTraduction from "./TextTraduction";

// Import Functions.
import {
  getTradText,
  isEmpty,
  isValidHour,
  registerForPushNotificationsAsync,
} from "../scripts";
import { editWorkoutCreator } from "../redux/actionCreators";
import { workoutState } from "../redux/state";

// Import Constants.
import { COLORS_APP, COLORS_DIFFICULTY } from "../utils/ConstantColors";
import { FONT_FAMILY } from "../utils/ConstantFontFamily";
import { ICON, MUSCLES } from "../utils/ConstantImages";
import { JSB, JSBLB } from "../utils/ConstantKey";

const EditBodyOptions = ({
  alertRemove,
  workout,
  setWorkout,
  user,
  setUser,
  dispatch,
}) => {
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

  // Manage publication.
  const [isPublished, setIsPublished] = useState(workout.publish.is_published);
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      if (req.status === 200) {
        if (!isPublished)
          Alert.alert(
            "Successfully Published",
            "Your workout has been published in the store."
          );
        else
          Alert.alert(
            "Successfully Removing",
            "Your workout has been removed of the store."
          );
      } else Alert.alert("An error occurred, please try again later.");

      let workout_updated = workout;
      if (!isPublished) {
        let json_response = JSON.parse(req.response);
        workout_updated = {
          ...workout,
          publish: {
            ...workout,
            is_published: true,
            published_id: json_response.metadata["id"],
            published_at: json_response.metadata["createAt"],
          },
        };
      } else {
        workout_updated = {
          ...workout,
          publish: {
            ...workout,
            is_published: false,
            published_id: "",
            published_at: "",
          },
        };
      }

      dispatch(editWorkoutCreator(workout.uid, workout_updated));
      setWorkout(workout_updated);
      setIsPublished(!isPublished);
    }
  };

  useEffect(() => {
    // Manage notification.
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
    <ScrollView
      contentContainerStyle={styles.ctn_main}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.ctn_boxes}>
        <LabelContainer size={18} text={"Description"} />
        <TextField
          multiline={true}
          max_len={300}
          txt_placeholder={"Your training advice here."}
          onChange={(v) => setWorkout((p) => ({ ...p, description: v }))}
          value={workout.description}
          autoCorrect={true}
        />
      </View>

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
        <LabelContainer text={"Muscles"} size={label_size} />
        <View style={styles.ctn_flex_boxes}>
          {MUSCLES.slice(0, 4).map((item, id) => {
            return (
              <ButtonToggleImage
                onPress={() => selectMuscles(item.muscle)}
                state={workout.muscles[item.muscle]}
                key={id}
                source={item.source}
                size={48}
              />
            );
          })}
        </View>
        <View style={styles.ctn_flex_boxes}>
          {MUSCLES.slice(4, 8).map((item, id) => {
            return (
              <ButtonToggleImage
                onPress={() => selectMuscles(item.muscle)}
                state={workout.muscles[item.muscle]}
                key={id}
                source={item.source}
                size={48}
              />
            );
          })}
        </View>
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
            !workout.notification.is_active && styles.disabled,
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

      <View>
        <LabelContainer text={"Sharing"} size={label_size} />
        <TouchableOpacity onPress={publish} style={styles.btn_action}>
          <Image style={styles.btn_img_action} source={ICON.black.upload} />
          <Text
            style={styles.btn_txt_action}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {!isPublished
              ? "Publish the workout to the library"
              : "Update the publication in the library"}
          </Text>
        </TouchableOpacity>

        <View style={!isPublished && styles.disabled}>
          <TouchableOpacity
            onPress={removeSharing}
            style={[styles.btn_action, styles.btn_rmv, ,]}
            disabled={!isPublished}
          >
            <Image style={styles.btn_img_action} source={ICON.white.close} />
            <Text
              style={[styles.btn_txt_action, styles.btn_txt_rmv]}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Canceled the sharing
            </Text>
          </TouchableOpacity>
          <View style={[styles.btn_action, styles.ctn_tags]}>
            <Text style={[styles.txt_tags, styles.txt_tags_pre]}>Code:</Text>
            <Text
              selectable={isPublished}
              style={[styles.txt_tags, styles.txt_tags_code]}
            >
              {isPublished
                ? workout.publish.published_id
                : "########################"}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <LabelContainer text={"Workout Actions"} size={label_size} />
        <TouchableOpacity
          onPress={alertRemove}
          style={[styles.btn_action, styles.btn_rmv]}
        >
          <Image style={styles.btn_img_action} source={ICON.white.remove} />
          <Text
            style={[styles.btn_txt_action, styles.btn_txt_rmv]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Remove the workout
          </Text>
        </TouchableOpacity>
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

  function selectMuscles(muscle) {
    const muscles = Object.fromEntries(
      Object.entries(workout.muscles).map(([key, value]) => {
        if (key == muscle) return [key, !value];
        else return [key, value];
      })
    );

    setWorkout({ ...workout, muscles });
  }

  function publish() {
    const init_workout_state = workoutState("");

    if (isEmpty(workout)) {
      Alert.alert(
        "Incomplete workout",
        "You must complete your profile before you can publish it."
      );
    } else {
      if (!workout.is_published) {
        req.open("POST", "https://api.jsonbin.io/v3/b", true);
        req.setRequestHeader("X-Bin-Name", workout.uid);
        req.setRequestHeader("X-Collection-Id", JSBLB);
      } else
        req.open(
          "PUT",
          `https://api.jsonbin.io/v3/b/${workout.publish.published_id}`,
          true
        );

      req.setRequestHeader("Content-type", "application/json");
      req.setRequestHeader("X-Master-Key", JSB);
      req.send(
        JSON.stringify({
          ...workout,
          days: init_workout_state.days,
          notification: init_workout_state.notification,
          publish: init_workout_state.publish,
        })
      );
    }
  }

  function removeSharing() {
    if (isPublished) {
      req.open(
        "DELETE",
        `https://api.jsonbin.io/v3/b/${workout.publish.published_id}`,
        true
      );
      req.setRequestHeader("X-Master-Key", JSB);
      req.send();
    }
  }
};

export default EditBodyOptions;

const styles = StyleSheet.create({
  ctn_main: {
    paddingBottom: 100,
  },

  ctn_flex_boxes: {
    flexDirection: "row",
    alignItems: "center",
  },

  ctn_boxes: {
    marginTop: 15,
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

  btn_action: {
    backgroundColor: COLORS_APP.background_secs,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  btn_img_action: {
    width: 24,
    height: 24,
  },

  btn_txt_action: {
    marginLeft: 5,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_third,
    flex: 1,
    fontSize: 15,
  },

  ctn_tags: {
    backgroundColor: COLORS_APP.background,
    paddingHorizontal: 7,
    paddingVertical: 12,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS_APP.outline_main,
  },

  txt_tags: {
    flex: 1,
    marginLeft: 5,
    fontFamily: FONT_FAMILY.main,
    color: COLORS_APP.font_forth,
    fontSize: 12,
    textTransform: "uppercase",
  },

  txt_tags_pre: {
    flex: 1 / 4,
  },

  btn_rmv: {
    backgroundColor: COLORS_APP.background_destructible,
  },

  btn_txt_rmv: {
    color: COLORS_APP.font_main,
  },

  disabled: {
    opacity: 0.3,
  },
});
