export const seriesState = (id) => {
  return {
    id,
    seriesName: "",
    type: "seconds",
    lap: ""
  };
};

export const workoutState = (id) => {
  return {
    id,
    title: "",
    round: "",
    rest_time: "",
    final_rest: "",
    difficulty: 1,
    series: [],
    days: [false, false, false, false, false, false, false],
  };
};
