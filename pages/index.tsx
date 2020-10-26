import { Accordion, AccordionSummary, Box, TablePagination } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import AccordionRow from "components/AccordionRow";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
// core components
import GridItem from "components/Grid/GridItem";
import Layout from "components/Layout";
import Profile from "components/Profile";
import { useUserCountQuery, useUsersQuery, UsersQuery, useUserQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import { withApollo } from "../apollo/client";
import { signIn, signout, useSession, getSession } from "next-auth/client";
import * as Apollo from "@apollo/client";
import { GET_SEARCH_STRING } from "generated/clientQueries";

const useStyles = makeStyles((theme: Theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    marginBottom: "3px",
    textDecoration: "none",
  },
  input: {
    "& > div": {
      marginTop: "0",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: "white",
      },
    },
  },
}));

function Index({ session }) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.

  const classes = useStyles();
  const router = useRouter();

  const page = Number(router.query?.page ?? 0);
  const rowsPerPage = Number(router.query?.rowsPerPage ?? 5);

  const { data: searchData } = Apollo.useQuery(GET_SEARCH_STRING);

  const { loading, error, data: usersData, refetch } = useUsersQuery({
    variables: {
      searchString: searchData?.searchString || "",
      skip: rowsPerPage * page,
      take: rowsPerPage,
    },
  });

  const { loading: userLoading, error: userError, data: userData } = useUserQuery({
    variables: { email: session.user.email },
  });

  const { data: userCountData } = useUserCountQuery();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    router.push({ query: { page: newPage, rowsPerPage } });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) =>
    router.push({ query: { page: 0, rowsPerPage: parseInt(event.target.value, 10) } });

  const getTableData = () => {
    if (loading || !usersData || !userData) {
      return Array.from({ length: rowsPerPage }).map((value, i) => (
        <Accordion key={i} expanded={false}>
          <AccordionSummary>
            <Box display="flex" width={300} alignSelf="center">
              <Skeleton variant="circle" width={40} height={40} />
              <Box display="flex" flexDirection="column" ml={1} mr={1}>
                <Skeleton width={100} />
                <Skeleton width={150} />
              </Box>
            </Box>
            <Box display="flex" flexWrap="wrap" flex={1}>
              <Box key={i} display="flex" flexDirection="column" pr={1} pt={0.5} pb={0.5}>
                <Skeleton variant="rect" width={240} />
              </Box>
            </Box>
          </AccordionSummary>
        </Accordion>
      ));
    }

    return usersData.users.map((user, i) => (
      <AccordionRow user={user} key={i} userEntities={userData.user} />
    ));
  };

  return (
    <Layout>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Profile user={userData?.user} />
        </GridItem>

        <GridItem xs={12} sm={12} md={8}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Similar Users</h4>
                  <p className={classes.cardCategoryWhite}>
                    Here is a list of user with similar behaviours or passions
                  </p>
                </CardHeader>
                <CardBody>
                  {getTableData()}
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userCountData?.userCount || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Layout>
  );
}

Index.getInitialProps = async (ctx) => {
  // We check for ctx.res to make sure we're on the server
  const session = await getSession(ctx);

  if (ctx.res && !session) {
    ctx.res.writeHead(302, {
      Location: `/api/auth/signin`,
    });
    ctx.res.end();
  }

  return {
    session,
  };
};

export default withApollo(Index);
