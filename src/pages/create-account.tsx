import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { EmailIcon } from "../components/icons/email-icon";
import { PasswordIcon } from "../components/icons/password-icon";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__type_graphql__/CreateAccountMutation";
import { UserRole } from "../__type_graphql__/globalTypes";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountFrom {
  email: string;
  password: string;
  confirm_password: string;
  role: UserRole;
}
const backgroundImageUrl = "https://pixy.org/src2/575/thumbs350/5759681.jpg";
export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    formState,
  } = useForm<ICreateAccountFrom>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Host,
    },
  });
  const history = useHistory();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;

    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/");
    }
  };
  const { email, password, role } = getValues();
  const [
    createAccountMutation,
    { data: createAccountResult, loading },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      variables: {
        createAccountInput: { email, password, role },
      },
      onCompleted,
    }
  );
  const _submit = () => {
    if (!loading) createAccountMutation();
  };
  return (
    <div
      className="w-screen h-screen flex justify-start items-center bg-gray-50 bg-cover relative"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Helmet>
        <title>Create Account | Nuber-podcasts</title>
      </Helmet>
      <div className="bg-white opacity-95 shadow-2xl w-full h-full sm:rounded-lg sm:max-w-md  sm:h-auto sm:absolute sm:left-40 sm:top-30">
        <div className="w-full py-16">
          <h3 className="text-gray-500 text-3xl text-center mb-3 font-medium">
            Eric's Podcasts
          </h3>
          <h4 className="text-blue-600 text-3xl text-center mb-20 font-extrabold">
            Create Account
          </h4>
          <form
            onSubmit={handleSubmit(_submit)}
            className="w-full flex flex-col px-4 sm:px-10 text-2xl items-center"
          >
            <div className="w-10/12 h-12 border-b-2 border-black-400 py-2 bg-transparent flex">
              <EmailIcon />
              <input
                ref={register({
                  required: {
                    value: true,
                    message: "Email is required!",
                  },
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email address invalid",
                  },
                })}
                className="focus:outline-none pl-4 w-full"
                name="email"
                type="email"
                placeholder="E-mail"
              ></input>
            </div>
            {errors.email?.message && (
              <FormError errorMessage={errors.email.message} />
            )}
            <div className="w-10/12 h-12 mt-8 border-b-2 border-black-400 py-2 bg-transparent flex flex-row">
              <PasswordIcon />
              <input
                ref={register({
                  required: {
                    value: true,
                    message: "Password is required!",
                  },
                  minLength: {
                    value: 4,
                    message: "Password must be more than 4 characters",
                  },
                })}
                className="focus:outline-none pl-4 w-full"
                name="password"
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <div className="w-10/12 h-12 mt-8 border-b-2 border-black-400 py-2 bg-transparent flex flex-row">
              <PasswordIcon />
              <input
                ref={register({
                  required: "Password is required!",
                  validate: (value) => value === getValues().password,
                })}
                className="focus:outline-none pl-4 w-full"
                name="confirm_password"
                type="password"
                placeholder="Confirm"
              ></input>
            </div>

            {errors.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}
            {errors.confirm_password && (
              <FormError errorMessage="Password not matched" />
            )}
            <div className="flex flex-row justify-center items-center mt-5">
              <div className="m-2 flex flex-row text-blue-400">
                <div>
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <label className="text-sm pl-1">Role</label>
              </div>
              <div className="relative inline-flex">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fill-rule="nonzero"
                  />
                </svg>
                <select
                  ref={register}
                  name="role"
                  className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                >
                  {Object.keys(UserRole).map((role, idx) => (
                    <option key={idx}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              className="mt-4 px-4 rounded-lg"
              canClick={formState.isValid}
              loading={loading}
              actionText="Create Account"
            />
            {createAccountResult?.createAccount.error && (
              <FormError
                errorMessage={createAccountResult.createAccount.error}
              />
            )}
            <span className="w-full text-center mt-3 text-xl text-gray-500 font-semibold">
              Already have an account? <br />
              <Link
                to="/"
                className="text-green-600 underline font-semibold text-base"
              >
                Log in!
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
