import { Logger } from 'winston';
import { Git } from './scm/git';

export async function initRepoAndPush(input: {
    dir: string;
    remoteUrl: string;
    auth: { username: string; password: string } | { token: string };
    logger: Logger;
    defaultBranch?: string;
    commitMessage?: string;
    gitAuthorInfo?: { name?: string; email?: string };
  }): Promise<{ commitHash: string }> {
    const {
      dir,
      remoteUrl,
      auth,
      logger,
      defaultBranch = 'master',
      commitMessage = 'Initial commit',
      gitAuthorInfo,
    } = input;
    const git = Git.fromAuth({
      ...auth,
      logger,
    });
  
    await git.init({
      dir,
      defaultBranch,
    });
  
    await git.add({ dir, filepath: '.' });
  
    // use provided info if possible, otherwise use fallbacks
    const authorInfo = {
      name: gitAuthorInfo?.name ?? 'Scaffolder',
      email: gitAuthorInfo?.email ?? 'scaffolder@backstage.io',
    };
  
    const commitHash = await git.commit({
      dir,
      message: commitMessage,
      author: authorInfo,
      committer: authorInfo,
    });
    await git.addRemote({
      dir,
      url: remoteUrl,
      remote: 'origin',
      force: true
    });
  
    await git.push({
      dir,
      remote: 'origin',
    });
  
    return { commitHash };
  }