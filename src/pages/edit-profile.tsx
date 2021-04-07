import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { client } from "../apollo";
import { Button } from "../components/button";
import { useMe } from "../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../__type_graphql__/editProfile";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
  identity?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const history = useHistory();
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
      password: userData?.me.password,
      identity: userData?.me.identity,
    },
  });
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    // if (ok && userData) {
    //   const {
    //     me: { email: prevEmail, id },
    //   } = userData;
    //   const { email: newEmail } = getValues();
    //   if (prevEmail !== newEmail) {
    //     client.writeFragment({
    //       id: `User:${id}`,
    //       fragment: gql`
    //         fragment EditedUser on User {
    //           verified
    //           email
    //         }
    //       `,
    //       data: {
    //         email: newEmail,
    //         verified: false,
    //       },
    //     });
    //   }
    // }
    if (ok && userData) {
      alert("Episode Created! Check it now!");
      history.goBack();
    }
  };
  const [editProfileMutation, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const onSubmit = () => {
    const { email, password, identity } = getValues();
    editProfileMutation({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
          ...(identity !== "" && { identity }),
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Nuber Podcast</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          ref={register({
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          ref={register}
          name="password"
          className="input"
          type="password"
          placeholder="Password"
        />
        <input
          ref={register}
          name="identity"
          className="input"
          type="text"
          placeholder="Identity"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
