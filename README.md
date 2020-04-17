# discord-alko
Discord bot for fetching info from alko.fi

## Running locally

1. `yarn install`
2. Create a dotenv file with the following variables:
```
DISCORD_BOT_TOKEN=
ALKO_API_BASE_URL=
ALKO_API_KEY=
```
3. `yarn watch`

## Deployment

Deployment is done on master branch push.

Infrastructure can be provisioned with terraform.

1. Setup aws-cli
2. Create the required ssm parametes and subnets
3. Run `terraform plan` and `terraform apply`
