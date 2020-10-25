import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress, { LinearProgressProps } from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { convertRange } from "util/clampRange";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number; oldvalue: number }) {
  return (
    <Box display="flex" alignItems="center">
      <Box flex={1} mr={1}>
        <LinearProgress variant="determinate" {...props} color="secondary" />
      </Box>
      <Box>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(props.oldvalue)}`}
        </Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function LinearWithValueLabel(props: { progress: number }) {
  const old_value = props.progress;
  const old_min = -10;
  const old_max = 10;
  const new_min = 0;
  const new_max = 100;

  const newValue = convertRange({
    old_max,
    old_min,
    new_max,
    new_min,
    old_value,
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={newValue} oldvalue={old_value} />
    </div>
  );
}
