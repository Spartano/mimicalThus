//convert a number range to another range, maintaining ratio
export const convertRange = ({
  old_value,
  old_min,
  old_max,
  new_min,
  new_max,
}: {
  old_value: number;
  old_min: number;
  old_max: number;
  new_min: number;
  new_max: number;
}) => {
  return ((old_value - old_min) * (new_max - new_min)) / (old_max - old_min) + new_min;
};
