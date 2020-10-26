import gql from "graphql-tag";

const UserParts = gql`
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

 gql`
  query Users($searchString:String  $skip:Int  $take:Int  ) {
    users(searchString: $searchString, skip:$skip, take:$take) {
      ...UserParts
    }
  }
  ${UserParts}
`;

 gql`
  query User($email:String  ) {
    user(email: $email) {
      ...UserParts
    }
  }
  ${UserParts}
`;

gql`
 query userCount {
  userCount
}
`;

gql`
  mutation signupUser($userBehaviors: [UserBehaviorCreateWithoutUserInput] $image: String $email: String! $name: String! $userPassions: [UserPassionCreateWithoutUserInput]) {
    signupUser(name: $name, email:$email, userBehaviors:$userBehaviors, userPassions:$userPassions, image:$image) {
      id
    }
  }
`;






