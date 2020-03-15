import * as React from "react";
import { RouteComponentProps } from "react-router";

import { useLogin } from "@/services/webapi/hooks/useLogin";
import { LoginPayload } from "@/services/webapi/payloads";
import { getDevices } from "@/services/webapi/api";

type Props = RouteComponentProps;

const LoginPage: React.FC<Props> = ({ location: { search } }) => {
  const [user, setUser] = React.useState<LoginPayload | null>(null);
  const [test, setTest] = React.useState<string | null>(null);
  const onLogin = React.useCallback(
    (payload: LoginPayload | null, error?: Error) => {
      setUser(payload);

      async function test() {
        try {
          const devices = await getDevices(
            "http://localhost:4444",
            payload?.authorization || ""
          );
          setTest(JSON.stringify(devices, null, 2));
        } catch (e) {
          setTest(e.message);
        }
      }

      test();

      if (error) console.error(error);
    },
    []
  );
  const { login, loginStatus } = useLogin(search, onLogin);
  return (
    <div>
      <div>{loginStatus}</div>
      <div>
        <button onClick={login}>Login</button>
      </div>
      <div>{JSON.stringify(user, null, 2)}</div>
      <div>{test}</div>
    </div>
  );
};

export default LoginPage;
