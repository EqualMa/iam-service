import { GITHUB_APP_CLIENT_ID, GITHUB_APP_CLIENT_SECRET } from "../constants";
import { createOAuthAppAuth } from "@octokit/auth-oauth-app";
import { HandlerError } from "../handler-error";

export interface GithubAccessTokenInputData {
  code: string;
  state: string;
}

export interface GithubAccessTokenPayload {
  type: string;
  tokenType: string;
  token: string;
  scopes: string[];
}

export async function getGithubAccessToken({
  code,
  state,
}: GithubAccessTokenInputData): Promise<GithubAccessTokenPayload> {
  try {
    const auth = createOAuthAppAuth({
      clientId: GITHUB_APP_CLIENT_ID,
      clientSecret: GITHUB_APP_CLIENT_SECRET,
      code,
      state,
    });

    const res = await auth({
      type: "token",
    });

    return {
      type: res.type,
      tokenType: res.tokenType || "",
      token: res.token || "",
      scopes: res.scopes || [],
    };
  } catch (err) {
    throw new HandlerError(err.message, {
      payload: { message: err.message },
    });
  }
}
