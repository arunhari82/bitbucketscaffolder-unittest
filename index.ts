
import { createPublishBitbucketServerAction } from "./bitbucketserver";
import {
    ScmIntegrations
  } from '@backstage/integration';
import { ConfigReader } from '@backstage/config';
import { mockContext } from './mockContext';


export var token = "<<BBTOKEN>>";
var reponame = "test-repo-5"
export var repourl = "<<BBHOST>>?project=AN&"+"repo="+reponame;


const config = new ConfigReader({
    integrations: {
        bitbucketServer: [
        {
          host: '<<BBHOST>>',
          token: token,
          apiBaseUrl: 'https://<<BBHOST>>/rest/api/1.0',
        }
      ],
    },
  });

  const integrations = ScmIntegrations.fromConfig(config);
  console.log(integrations)
  const action = createPublishBitbucketServerAction({ integrations, config });

  action.handler(mockContext({input :{
    repoUrl: repourl,
    description: "New repo description test",
    defaultBranch: "master",
    sourcePath: "./repo",
    enableLFS: false,
    token: token,
    gitCommitMessage: "Initial Commit",
    gitAuthorName: "Arun Hariharan",
    gitAuthorEmail: "anattama@redhat.com",
}}));
