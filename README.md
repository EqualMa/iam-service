# iam service

[![CircleCI](https://circleci.com/gh/EqualMa/iam-service.svg?style=svg)](https://circleci.com/gh/EqualMa/iam-service)

Working in Progress

```sh
export CF_EMAIL=$(sed '1q;d' .apikey.ign)
export CF_API_KEY=$(sed '2q;d' .apikey.ign)
npx wrangler whoami

```

## Deploy

To deploy with ci, you should configure the following env vars:

- `!` : required
- `?` : optional
- `deprecated` : deprecated

| env var name             | description                        |
| ------------------------ | ---------------------------------- |
| CF_API_KEY               | `!` cloudflare global api key      |
| CF_EMAIL                 | `!` cloudflare email               |
| MY_CF_ACCOUNT_ID         | `!` `account_id` in wrangler.toml  |
| GITHUB_APP_CLIENT_ID     | `!`                                |
| GITHUB_APP_CLIENT_SECRET | `!`                                |
| CORS_ORIGIN              | `?` This can be `*` or some orgins |
| publish_branch           | `deprecated`                       |
| publish_repo_url         | `deprecated`                       |
| publish_user_email       | `deprecated`                       |
| publish_user_name        | `deprecated`                       |
