import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { EmailIcon } from "../components/icons/email-icon";
import { PasswordIcon } from "../components/icons/password-icon";
import { LS_TOKEN } from "../constants";
import { UserRole } from "../__type_graphql__/globalTypes";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__type_graphql__/LoginMutation";
import { MY_PODCASTS_QUERY } from "./creator/my-podcasts";
import { ALLPODCASTS_QUERY } from "./listener/podcasts";

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
      role
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const history = useHistory();
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token, role },
    } = data;

    if (ok && token) {
      localStorage.setItem(LS_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
    history.push("/");
  };
  const variables = {
    loginInput: getValues(),
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    variables,
    onCompleted,
  });

  const _submit = () => {
    if (!loading) loginMutation();
  };

  const backgroundImageUrl = "https://pixy.org/src2/575/thumbs350/5759681.jpg";
  return (
    <div
      className="h-screen flex justify-start items-center bg-gray-50 bg-cover relative"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Helmet>
        <title>Log In | Nuber-podcasts</title>
      </Helmet>
      <div className="bg-white opacity-95 shadow-2xl w-full h-full sm:rounded-lg sm:max-w-md  sm:h-auto sm:absolute sm:left-40 sm:top-30">
        <div className="w-full py-16">
          <h3 className="text-gray-500 text-3xl text-center mb-3 font-medium">
            Eric's Podcasts
          </h3>
          <h4 className="text-green-600 text-3xl text-center mb-20 font-extrabold">
            Log in
          </h4>
          <form
            onSubmit={handleSubmit(_submit)}
            className="w-full flex flex-col px-4 sm:px-10 text-2xl items-center"
          >
            <div className="w-10/12 h-12 border-b-2 border-black-400 py-2 bg-transparent flex">
              <EmailIcon />
              <input
                ref={register({
                  required: "Email is required!",
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                className="focus:outline-none pl-4 w-full"
                name="email"
                type="email"
                placeholder="E-mail"
              ></input>
            </div>
            {errors.email?.type === "pattern" && (
              <FormError errorMessage={"Please enter a valid email"} />
            )}
            {errors.email?.message && (
              <FormError errorMessage={errors.email.message} />
            )}
            <div className="w-10/12 h-12 mt-8 border-b-2 border-black-400 py-2 bg-transparent flex">
              <PasswordIcon />
              <input
                ref={register({
                  required: "Password is required!",
                  minLength: 4,
                })}
                className="focus:outline-none pl-4 w-full"
                name="password"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}
            {errors.password?.type === "minLength" && (
              <FormError errorMessage="Password must be more than 4 characters" />
            )}

            <Button
              className="mt-12 w-1/2 rounded-xl"
              canClick={formState.isValid}
              loading={loading}
              actionText="Login"
            />
            {loginMutationResult?.login.error && (
              <FormError errorMessage={loginMutationResult.login.error} />
            )}
            <span className="w-full text-center mt-3 text-xl text-gray-500 font-semibold">
              Don't have an account?
              <br />
              <Link
                to="/create-account"
                className="text-blue-600 underline font-semibold text-base"
              >
                Create here!
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
