import differenceInWeeks from 'date-fns/differenceInWeeks';

// eslint-disable-next-line import/prefer-default-export
export const calculateDurationInWeeks = (startDate: string | Date, endDate: string | Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const durationInWeeks = differenceInWeeks(end, start, { roundingMethod: 'ceil' });
  return durationInWeeks;
};
