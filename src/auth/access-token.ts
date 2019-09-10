import { fly } from "../fly";
import { GITHUB_APP_CLIENT_ID, GITHUB_APP_CLIENT_SECRET } from "../constant";

const url = "https://github.com/login/oauth/access_token";
export async function getGithubAccessToken(code: string, state: string) {
  const a = await fly.post(url, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_id: GITHUB_APP_CLIENT_ID,
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_secret: GITHUB_APP_CLIENT_SECRET,
    code,
    state,
  });

  return a;
}
