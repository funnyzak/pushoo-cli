#!/usr/bin/env node

// scr/main.ts

import { exit } from 'node:process';

import manifest from '../package.json';
import {
checkForUpdates, configurationFileSetting, getHelpText, parseArguments
} from './utils/cli';
import { logger } from './utils/logger';
import { resolve } from './utils/promise';

const run = async (): Promise<void> => {
  // Parse the options passed by the user.
  const [parseError, args] = await resolve(parseArguments());
  if (parseError || !args) {
    logger.error(parseError.message);
    exit(1);
  }

  // Check for updates to the package unless the user sets the `NO_UPDATE_CHECK`
  // variable.
  const [updateError] = await resolve(checkForUpdates(manifest));
  if (updateError) {
    const suffix = args['--debug'] ? ':' : ' (use `--debug` to see full error)';
    logger.warn(`Checking for updates failed${suffix}`);

    if (args['--debug']) logger.error(updateError.message);
  }

  // If the `version` or `help` arguments are passed, print the version or the
  // help text and exit.
  if (args['--version']) {
    logger.log(manifest.version);
    exit(0);
  }
  if (args['--help']) {
    logger.log(getHelpText());
    exit(0);
  }

  const commandArray = args._;

  if (commandArray.includes('config')) {
    await configurationFileSetting();
    exit(0);
  }
}

run()
