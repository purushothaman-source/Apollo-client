import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  split
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new RestLink({
  uri: "/",
  fetchOptions: {
    mode: "no-cors"
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("auth_token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: true
        ? `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWVjZjQyNzQ5ZTk1YTNhYmE3MWQxMmUiLCJpYXQiOjE2NDI5MjczMDl9.czzh8HWx30xZ5D_PqTiZTvYBqIuAyyEVXUGW9jch7nM
      `
        : ""
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

// chain links
const apolloLink = ApolloLink.from([errorLink, httpLink]);

// split links for efficiency and scalability
const splitLink = split(({ query }) => {
  const { kind } = getMainDefinition(query);
  return kind === "OperationDefinition";
}, apolloLink);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export const ApolloDiv = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
