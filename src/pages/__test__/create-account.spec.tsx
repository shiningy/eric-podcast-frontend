import { render, waitFor } from "../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { UserRole } from "../../__type_graphql__/globalTypes";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() =>
      expect(document.title).toBe("Create Account | Nuber-podcasts")
    );
  });
  it("renders validation errors", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/e-mail/i);
    const password = getByPlaceholderText(/password/i);
    const confirm = getByPlaceholderText(/Confirm/i);
    const button = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "wont@work");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email address invalid/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email is required!/i);
    await waitFor(() => {
      userEvent.type(email, "working@email.com");
      userEvent.type(password, "xxx");
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(
      /Password must be more than 10 characters/i
    );
    await waitFor(() => {
      userEvent.clear(email);
      userEvent.clear(password);
      userEvent.type(email, "working@email.com");
      userEvent.type(password, "asdfasdfasdf");
      userEvent.type(confirm, "asdf");
      userEvent.clear(confirm);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Password not matched/i);
  });
  it("submits mutation with form values", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/e-mail/i);
    const password = getByPlaceholderText(/password/i);
    const confirm = getByPlaceholderText(/Confirm/i);
    const button = getByRole("button");
    const formData = {
      email: "working@mail.com",
      password: "asdfasdfasdf",
      confirm: "asdfasdfasdf",
      role: UserRole.Host,
    };
    const mockedCreateAccountMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedCreateAccountMutationResponse
    );
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.type(confirm, formData.confirm);
      userEvent.click(button);
    });
    expect(mockedCreateAccountMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedCreateAccountMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledWith("Account Created! Log in now!");
    const mutationError = getByRole("alert");
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mutationError).toHaveTextContent("mutation-error");
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
