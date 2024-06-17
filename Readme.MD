Unit Test Component that uses backstage integrations to create and push bitbucket repo

`npm install`

update `<<BBTOKEN>>` and `<<BBHOST>>` values in [index.ts](index.ts)

please recall it is just the host, does not include the protocol. 
EX: `bitbucket-bitbucket.apps.cluster-8t5tx.sandbox1911.opentlc.com`

Validate the default repo in [index.ts](index.ts)
var reponame = "dev-hub-test"

Install ts-node
`npm install -g ts-node`

Execute Test
`npx ts-node index.ts`

To retest, either delete the created repo in bitbucket or update repo value in the [index.ts](index.ts) 

run rm -rf .git to generated remove git config

`rm -rf ./repo/.git`

If you receive the following error, be sure you have run `rm -rf ./repo/.git`

`AlreadyExistsError: Failed to create remote at origin because it already exists. (Hint: use 'force: true' parameter to overwrite existing remote.)`
    