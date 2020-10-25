import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, Box, Chip } from "@material-ui/core";
import { UserQuery } from "generated/graphql";
import LinearWithValueLabel from "./LinearWithValueLabel";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    accordionRoot: {
      background: "",
    },
  })
);

type User = UserQuery["user"];

interface Props {
  user: User;
  userEntities: User;
}

export default function AccordionRow({ user, userEntities }: Props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { id, email, name, image, UserPassion, UserBehavior } = user;

  const similarPassions = UserPassion.filter(({ id, Passion }) => {
    return userEntities.UserPassion.some(
      ({ Passion: entityPassion }) => entityPassion.id === Passion.id
    );
  });

  const notSimilarPassions = UserPassion.filter(({ id, Passion }) => {
    return userEntities.UserPassion.every(
      ({ Passion: entityPassion }) => entityPassion.id !== Passion.id
    );
  });

  const similarBehaviors = UserBehavior.filter(({ id, Behavior }) => {
    return userEntities.UserBehavior.some(
      ({ Behavior: UserBehavior }) => UserBehavior.id === Behavior.id
    );
  });

  const notSimilarBehaviors = UserBehavior.filter(({ id, Behavior }) => {
    return userEntities.UserBehavior.every(
      ({ Behavior: UserBehavior }) => UserBehavior.id !== Behavior.id
    );
  });

  return (
    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        classes={{ root: classes.accordionRoot }}
      >
        <Box display="flex" width={300} alignSelf="center">
          <Avatar alt="name" src={image} />
          <Box display="flex" flexDirection="column" ml={1} mr={1}>
            <Box>{name}</Box>
            <Box>{email}</Box>
          </Box>
        </Box>

        <Box display="flex" flexWrap="wrap" flex={1}>
          {similarPassions.map(({ Passion, value }, i) => (
            <Box key={i} display="flex" flexDirection="column" pr={1} pt={0.5} pb={0.5}>
              <Chip
                label={Passion.name}
                size="small"
                variant="default"
                avatar={<Avatar>P</Avatar>}
              />
            </Box>
          ))}
          {similarBehaviors.map(({ Behavior, value }, i) => (
            <Box key={i} display="flex" flexDirection="column" pr={1} pt={0.5} pb={0.5}>
              <Chip
                label={Behavior.name}
                size="small"
                variant="default"
                avatar={<Avatar>B</Avatar>}
              />
            </Box>
          ))}
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box flex={1}>
          {similarBehaviors.map(({ Behavior, value }, i) => (
            <Box key={i} display="flex" flexDirection="column" pr={1}>
              <Chip label={Behavior.name} size="small" />
              <Box pl={0.5} pr={1}>
                <LinearWithValueLabel progress={value} />
              </Box>
            </Box>
          ))}

          {notSimilarBehaviors.map(({ Behavior, value }, i) => (
            <Box key={i} display="flex" flexDirection="column" pr={1}>
              <Chip label={Behavior.name} size="small" variant="outlined" />
              <Box pl={0.5} pr={1}>
                <LinearWithValueLabel progress={value} />
              </Box>
            </Box>
          ))}
        </Box>
        <Box flex={1}>
          {similarPassions.map(({ Passion, value }, i) => (
            <Box key={i} display="flex" flexDirection="column" pr={1}>
              <Chip label={Passion.name} size="small" />
              <Box pl={0.5} pr={1}>
                <LinearWithValueLabel progress={value} />
              </Box>
            </Box>
          ))}
          {notSimilarPassions.map(({ Passion, value }, i) => (
            <Box key={i} display="flex" flexDirection="column" pr={1}>
              <Chip label={Passion.name} size="small" variant="outlined" />
              <Box pl={0.5} pr={1}>
                <LinearWithValueLabel progress={value} />
              </Box>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
