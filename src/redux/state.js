export const seriesState = (uid) => {
  return {
    uid,
    seriesName: "",
    type: "seconds",
    lap: "",
    rest:true,
    is_timer:true,
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
  };
};
