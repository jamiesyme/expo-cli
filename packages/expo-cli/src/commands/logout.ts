import { UserManager } from '@expo/xdl';
import { Command } from 'commander';

import CommandError from '../CommandError';
import log from '../log';

async function action() {
  const user = await UserManager.getCurrentUserAsync();
  if (user?.accessToken) {
    throw new CommandError(
      'ACCESS_TOKEN_ERROR',
      'Please remove the EXPO_TOKEN environment var to logout.'
    );
  }

  try {
    await UserManager.logoutAsync();
    log('Logged out');
  } catch (e) {
    throw new CommandError(`Couldn't logout: ${e.message}`);
  }
}

export default function (program: Command) {
  program
    .command('logout')
    .description('Logout of an Expo account')
    .helpGroup('auth')
    .asyncAction(action);
}
