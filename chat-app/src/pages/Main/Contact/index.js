import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { Divider } from "@material-ui/core";
import { useRecoilState } from "recoil";
import ContactList from "../../../components/ContactList";
import { selectedUserState } from "../../../recoil";

const GET_USERS = gql`
  query MyQuery(
    $order_by: [users_order_by!] = { name: desc }
    $_neq: String = ""
  ) {
    users(order_by: $order_by, where: { id: { _neq: $_neq } }) {
      id
      name
      picture
    }
  }
`;

const Contact = () => {
  const { user } = useAuth0();
  const { data } = useQuery(GET_USERS, {
    variables: { order_by: { name: "asc" }, _neq: user.sub },
  });
  const setSelectedUser = useRecoilState(selectedUserState)[1];
  const users = [
    {
      id: null,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLZZXmhq79AvZjTpsObsD61I9Z__0VRMLV4g&usqp=CAU",
      name: "BENEFITS FORUM",
    },
  ];
  if (data && data.users) {
    users.push(...data.users);
  }
  return (
    <div>
      {users.map((u) => {
        return (
          <div key={u.id} onClick={() => setSelectedUser(u)}>
            <ContactList user={u}></ContactList>
            <Divider></Divider>
          </div>
        );
      })}
    </div>
  );
};

export default Contact;
