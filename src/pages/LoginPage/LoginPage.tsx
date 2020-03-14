import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useLogin } from "@/services/webapi/hooks/useLogin";
import { LoginPayload } from "@/services/webapi/payloads";

type Props = RouteComponentProps;

const LoginPage: React.FC<Props> = ({ location: { search } }) => {
  const [user, setUser] = React.useState<LoginPayload | null>(null);
  const onLogin = React.useCallback(
    (payload: LoginPayload | null, error?: Error) => {
      setUser(payload);
      if (error) console.error(error);
    },
    []
  );
  const { login, loginStatus } = useLogin(search, onLogin);
  return (
    <div>
      {loginStatus}
      <button onClick={login}>Login</button>
      {JSON.stringify(user, null, 2)}
    </div>
  );
};

export default LoginPage;
