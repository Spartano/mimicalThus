import { Box, Chip, TextField, Typography } from "@material-ui/core";
import Card from "components/Card/Card";
import CardAvatar from "components/Card/CardAvatar";
import CardBody from "components/Card/CardBody";
import Button from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer";
import faker from "faker";
import random from "lodash/random";
import take from "lodash/take";
// core components
import GridItem from "components/Grid/GridItem";
import { UserQuery, useSignupUserMutation } from "generated/graphql";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import LinearWithValueLabel from "./LinearWithValueLabel";

interface Props {
  user?: UserQuery["user"];
}
export default function Profile({ user }: Props) {
  const [createUser] = useSignupUserMutation();

  const seed = async () => {
    let t = 0;

    for (let i = 0; i < 350; i++) {
      var randomName = faker.name.findName(); // Rowan Nikolaus
      var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
      var randomImage = faker.image.avatar(); // Kassandra.Haley@erich.biz

      let randomPassions = Array.from({ length: 5 }, () => ({
        value: random(-10, 10),
        Passion: { connect: { id: random(1, 50) } },
      }));
      let randomBehaviors = Array.from({ length: 5 }, () => ({
        value: random(-10, 10),
        Behavior: { connect: { id: random(1, 25) } },
      }));

      await createUser({
        variables: {
          image: randomImage,
          name: randomName,
          email: randomEmail,
          userBehaviors: randomBehaviors,
          userPassions: randomPassions,
        },
      });
    }
  };

  return (
    <Card profile>
      <CardAvatar profile>
        {user ? (
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img src={user.image} alt="..." />
          </a>
        ) : (
          <Skeleton variant="circle" height={128} width={128} />
        )}
      </CardAvatar>
      <CardBody profile>
        {user ? <Typography variant="h6">{user.email}</Typography> : <Skeleton width={40} />}
        {user ? <Typography variant="h4">{user.name}</Typography> : <Skeleton width={40} />}

        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h6>Behaviors</h6>

            {user ? (
              user.UserBehavior.map(({ Behavior, value }, i) => (
                <Box key={i} display="flex" flexDirection="column">
                  <Chip label={Behavior.name} size="small" />
                  <Box pl={0.5} pr={1}>
                    <LinearWithValueLabel progress={value} />
                  </Box>
                </Box>
              ))
            ) : (
              <Skeleton height={250} />
            )}
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h6>Passions</h6>

            {user ? (
              user.UserPassion.map(({ Passion, value }, i) => (
                <Box key={i} display="flex" flexDirection="column" pr={1}>
                  <Chip label={Passion.name} size="small" />
                  <Box pl={0.5} pr={1}>
                    <LinearWithValueLabel progress={value} />
                  </Box>
                </Box>
              ))
            ) : (
              <Skeleton height={250} />
            )}
          </GridItem>
        </GridContainer>
        <Box mt={2.5}>
          <Button color="primary" round>
            Update
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
}
