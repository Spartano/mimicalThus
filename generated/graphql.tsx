import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  DateTime: any;
};


export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  userCount?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  email?: Maybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  searchString?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneUser: User;
  signupUser?: Maybe<User>;
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationSignupUserArgs = {
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  userPassions?: Maybe<Array<Maybe<UserPassionCreateWithoutUserInput>>>;
  userBehaviors?: Maybe<Array<Maybe<UserBehaviorCreateWithoutUserInput>>>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  UserPassion?: Maybe<Array<Maybe<UserPassion>>>;
  UserBehavior?: Maybe<Array<Maybe<UserBehavior>>>;
};

export type Passion = {
  __typename?: 'Passion';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  UserPassion?: Maybe<Array<Maybe<UserPassion>>>;
};

export type Behavior = {
  __typename?: 'Behavior';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  UserBehavior?: Maybe<Array<Maybe<UserBehavior>>>;
};

export type UserPassion = {
  __typename?: 'UserPassion';
  id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  passionId?: Maybe<Scalars['Int']>;
  User?: Maybe<User>;
  Passion?: Maybe<Passion>;
};

export type UserBehavior = {
  __typename?: 'UserBehavior';
  id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  behaviorId?: Maybe<Scalars['Int']>;
  User?: Maybe<User>;
  Behavior?: Maybe<Behavior>;
};

export type UserCreateInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  image?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  UserPassion?: Maybe<UserPassionCreateManyWithoutUserInput>;
  UserBehavior?: Maybe<UserBehaviorCreateManyWithoutUserInput>;
};


export type UserPassionCreateManyWithoutUserInput = {
  create?: Maybe<Array<UserPassionCreateWithoutUserInput>>;
  connect?: Maybe<Array<UserPassionWhereUniqueInput>>;
};

export type UserBehaviorCreateManyWithoutUserInput = {
  create?: Maybe<Array<UserBehaviorCreateWithoutUserInput>>;
  connect?: Maybe<Array<UserBehaviorWhereUniqueInput>>;
};

export type UserPassionCreateWithoutUserInput = {
  value: Scalars['Int'];
  Passion: PassionCreateOneWithoutUserPassionInput;
};

export type UserPassionWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type UserBehaviorCreateWithoutUserInput = {
  value: Scalars['Int'];
  Behavior: BehaviorCreateOneWithoutUserBehaviorInput;
};

export type UserBehaviorWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type PassionCreateOneWithoutUserPassionInput = {
  create?: Maybe<PassionCreateWithoutUserPassionInput>;
  connect?: Maybe<PassionWhereUniqueInput>;
};

export type BehaviorCreateOneWithoutUserBehaviorInput = {
  create?: Maybe<BehaviorCreateWithoutUserBehaviorInput>;
  connect?: Maybe<BehaviorWhereUniqueInput>;
};

export type PassionCreateWithoutUserPassionInput = {
  name: Scalars['String'];
};

export type PassionWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type BehaviorCreateWithoutUserBehaviorInput = {
  name: Scalars['String'];
};

export type BehaviorWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type UserPartsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'image'>
  & { UserPassion?: Maybe<Array<Maybe<(
    { __typename?: 'UserPassion' }
    & Pick<UserPassion, 'id' | 'value'>
    & { Passion?: Maybe<(
      { __typename?: 'Passion' }
      & Pick<Passion, 'id' | 'name'>
    )> }
  )>>>, UserBehavior?: Maybe<Array<Maybe<(
    { __typename?: 'UserBehavior' }
    & Pick<UserBehavior, 'id' | 'value'>
    & { Behavior?: Maybe<(
      { __typename?: 'Behavior' }
      & Pick<Behavior, 'id' | 'name'>
    )> }
  )>>> }
);

export type UsersQueryVariables = Exact<{
  searchString?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & UserPartsFragment
  )>>> }
);

export type UserQueryVariables = Exact<{
  email?: Maybe<Scalars['String']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserPartsFragment
  )> }
);

export type UserCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'userCount'>
);

export type SignupUserMutationVariables = Exact<{
  userBehaviors?: Maybe<Array<Maybe<UserBehaviorCreateWithoutUserInput>>>;
  image?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  userPassions?: Maybe<Array<Maybe<UserPassionCreateWithoutUserInput>>>;
}>;


export type SignupUserMutation = (
  { __typename?: 'Mutation' }
  & { signupUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export const UserPartsFragmentDoc = gql`
    fragment UserParts on User {
  id
  name
  email
  image
  UserPassion {
    id
    value
    Passion {
      id
      name
    }
  }
  UserBehavior {
    id
    value
    Behavior {
      id
      name
    }
  }
}
    `;
export const UsersDocument = gql`
    query Users($searchString: String, $skip: Int, $take: Int) {
  users(searchString: $searchString, skip: $skip, take: $take) {
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export function refetchUsersQuery(variables?: UsersQueryVariables) {
      return { query: UsersDocument, variables: variables }
    }
export const UserDocument = gql`
    query User($email: String) {
  user(email: $email) {
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export function refetchUserQuery(variables?: UserQueryVariables) {
      return { query: UserDocument, variables: variables }
    }
export const UserCountDocument = gql`
    query userCount {
  userCount
}
    `;

/**
 * __useUserCountQuery__
 *
 * To run a query within a React component, call `useUserCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCountQuery(baseOptions?: Apollo.QueryHookOptions<UserCountQuery, UserCountQueryVariables>) {
        return Apollo.useQuery<UserCountQuery, UserCountQueryVariables>(UserCountDocument, baseOptions);
      }
export function useUserCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCountQuery, UserCountQueryVariables>) {
          return Apollo.useLazyQuery<UserCountQuery, UserCountQueryVariables>(UserCountDocument, baseOptions);
        }
export type UserCountQueryHookResult = ReturnType<typeof useUserCountQuery>;
export type UserCountLazyQueryHookResult = ReturnType<typeof useUserCountLazyQuery>;
export type UserCountQueryResult = Apollo.QueryResult<UserCountQuery, UserCountQueryVariables>;
export function refetchUserCountQuery(variables?: UserCountQueryVariables) {
      return { query: UserCountDocument, variables: variables }
    }
export const SignupUserDocument = gql`
    mutation signupUser($userBehaviors: [UserBehaviorCreateWithoutUserInput], $image: String, $email: String!, $name: String!, $userPassions: [UserPassionCreateWithoutUserInput]) {
  signupUser(name: $name, email: $email, userBehaviors: $userBehaviors, userPassions: $userPassions, image: $image) {
    id
  }
}
    `;
export type SignupUserMutationFn = Apollo.MutationFunction<SignupUserMutation, SignupUserMutationVariables>;

/**
 * __useSignupUserMutation__
 *
 * To run a mutation, you first call `useSignupUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserMutation, { data, loading, error }] = useSignupUserMutation({
 *   variables: {
 *      userBehaviors: // value for 'userBehaviors'
 *      image: // value for 'image'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      userPassions: // value for 'userPassions'
 *   },
 * });
 */
export function useSignupUserMutation(baseOptions?: Apollo.MutationHookOptions<SignupUserMutation, SignupUserMutationVariables>) {
        return Apollo.useMutation<SignupUserMutation, SignupUserMutationVariables>(SignupUserDocument, baseOptions);
      }
export type SignupUserMutationHookResult = ReturnType<typeof useSignupUserMutation>;
export type SignupUserMutationResult = Apollo.MutationResult<SignupUserMutation>;
export type SignupUserMutationOptions = Apollo.BaseMutationOptions<SignupUserMutation, SignupUserMutationVariables>;