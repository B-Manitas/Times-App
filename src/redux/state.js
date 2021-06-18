export const seriesState = (id) => {
  return {
    id,
    seriesName: "",
    type: "seconds",
    lap: "",
  };
};

export const workoutState = (id) => {
  return {
    id,
    title: "",
    round: "",
    series: [],
    days: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    },
  };
};
