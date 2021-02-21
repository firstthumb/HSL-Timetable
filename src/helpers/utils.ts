export const getMinuteLeft = (timeInSeconds: number): number => Math.floor((timeInSeconds - getSecondsToday()) / 60);

export const getSecondsToday = (): number => {
  const d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
};

export const getSecondsMidnight = (): number => {
  const d = new Date();
  return Math.floor(d.getTime() / 1000) - getSecondsToday();
};

export const formatTime = (arrival: number): string => {
  const departureAt = new Date((getSecondsMidnight() + arrival) * 1000);
  return `${departureAt.getHours().toString().padStart(2, '0')}:${departureAt
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};
