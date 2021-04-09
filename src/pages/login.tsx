import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
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
  const history = useHistory();
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
      <div className="bg-white opacity-95 shadow-2xl rounded-lg w-full h-full md:h-auto max-w-md md:mx-5 md:my-5 flex justify-between md:absolute md:left-40 md:top-10">
        <div className="w-full py-16">
          {" "}
          {/*Left Side*/}
          <h3 className="text-gray-500 text-3xl text-center mb-3 font-medium">
            Nuber-Podcasts
          </h3>
          <h4 className="text-black-400 text-3xl text-center mb-20 font-extrabold">
            Log in
          </h4>
          <form
            onSubmit={handleSubmit(_submit)}
            className="w-full flex flex-col px-4 sm:px-10 text-2xl"
          >
            <div className="border-b-2 border-black-400 py-2 bg-transparent flex">
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                ref={register({
                  required: "Email is required!",
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                className="focus:outline-none pl-2 w-full"
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
            <div className="mt-8 border-b-2 border-black-400 py-2 bg-transparent flex">
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <input
                ref={register({
                  required: "Password is required!",
                  minLength: 4,
                })}
                className="focus:outline-none pl-2 w-full"
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
              className="mt-12"
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
                className="text-blue-400 underline font-semibold text-base"
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
