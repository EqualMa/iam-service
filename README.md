# iam service

[![CircleCI](https://circleci.com/gh/EqualMa/iam-service.svg?style=svg)](https://circleci.com/gh/EqualMa/iam-service)
[![OpenFaaS](https://img.shields.io/badge/openfaas-cloud-blue.svg)](https://www.openfaas.com)

Working in Progress

> https://github.com/cloudflare/wrangler#%EF%B8%8F--publish

```
wrangler publish
```

To use this command, the following fields are required in your wrangler.toml.

- name
- type
- account_id
- workers_dev: true

> https://github.com/cloudflare/wrangler#using-environment-variables

CF_API_KEY -> your Cloudflare API key
CF_EMAIL -> your Cloudflare account email
