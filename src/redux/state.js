export const userState = {
  is_new: true,
  username: "",
  img_profile: 0,
  notification: {
    is_active: true,
    token: null,
  },
  music: {
    token: "",
  },
  language: "En",
};

export const seriesState = (uid) => {
  return {
    uid,
    seriesName: "",
    lap: "",
    rest: true,
    is_timer: true,
  };
};

export const workoutState = (uid) => {
  return {
    uid,
    title: "",
    round: "",
    rest_time: "",
    final_rest: "",
    difficulty: 1,
    series: [],
    days: [false, false, false, false, false, false, false],
    notification: {
      is_active: false,
      alert_hour: "8",
    },
  };
};
