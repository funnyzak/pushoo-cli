#!/usr/bin/env node

import chalkTemplate from 'chalk-template';
import { exit } from 'process';
import pushoo, { ChannelType, CommonOptions as PushooOptions } from 'pushoo';
import YAML from 'yaml';
import manifest from '../package.json';
import * as utils from './utils';
import {
  checkForUpdates,
  configurationFileSetting,
  defaultConfigurationFilePath,
  getConfiguration,
  getDefaultConfiguration,
  getHelpText,
  parseArguments
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

  const cliOptions = {
    config: args['--config'],
    platforms: args['--platforms'],
    tokens: args['--tokens'],
    title: args['--title'],
    content: args['--content'],
    options: args['--options'],
    debug: args['--debug']
  };

  // if debug, then set log level to debug
  if (cliOptions.debug) {
    logger.setLevel('debug');
  }
  logger.debug('command options:', JSON.stringify(cliOptions));

  // Check for updates to the paØckage unless the user sets the `NO_UPDATE_CHECK`
  // variable.
  const [updateError] = await resolve(checkForUpdates(manifest));
  if (updateError) {
    const suffix = args['--debug'] ? ':' : ' (use `--debug` to see full error)';
    logger.warn(`Checking for updates failed${suffix}`);

    logger.error(updateError.message);
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
    await configurationFileSetting(defaultConfigurationFilePath);
    exit(0);
  }

  const defaultConfig = await getDefaultConfiguration();

  // log default config string
  logger.debug(
    `default config(${defaultConfigurationFilePath}):`,
    JSON.stringify(defaultConfig)
  );

  if (cliOptions.config) {
    const tmpConfig = await getConfiguration(cliOptions.config);

    if (tmpConfig) {
      cliOptions.platforms = cliOptions.platforms
        ? cliOptions.platforms
        : tmpConfig.platforms;

      cliOptions.tokens = cliOptions.tokens
        ? cliOptions.tokens
        : tmpConfig.tokens;

      cliOptions.title = cliOptions.title ? cliOptions.title : tmpConfig.title;

      cliOptions.content = cliOptions.content
        ? cliOptions.content
        : tmpConfig.content;
    }
  } else if (defaultConfig) {
    cliOptions.platforms = cliOptions.platforms
      ? cliOptions.platforms
      : defaultConfig.platforms;

    cliOptions.tokens = cliOptions.tokens
      ? cliOptions.tokens
      : defaultConfig.tokens;

    cliOptions.title = cliOptions.title
      ? cliOptions.title
      : defaultConfig.title;

    cliOptions.content = cliOptions.content
      ? cliOptions.content
      : defaultConfig.content;
  }

  if (!cliOptions.content && cliOptions.content === '' && args._[0]) {
    cliOptions.content = args._[0];
  }

  // if content is not set, show help text and exit
  if (!cliOptions.content && cliOptions.content === '') {
    logger.info(getHelpText());
    exit(0);
  }

  utils.checkRequiredAttributes(cliOptions, ['platforms', 'tokens', 'content']);

  const platforms = cliOptions.platforms.split(/[,，]/).map((p) => p.trim());
  const tokens = cliOptions.tokens.split(/[,，]/).map((t) => t.trim());

  utils.checkArrayLength([platforms, tokens]);

  const pushStateList: Array<PushState> = [];

  logger.log(chalkTemplate`{bold pushoo ...}`);

  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    // Hide string parts of the character
    const pushooOptions: PushooOptions = {
      token: tokens[i],
      title: cliOptions.title,
      content: cliOptions.content,
      options: cliOptions.options ? JSON.parse(cliOptions.options) : {}
    };

    const pushState: PushState = {
      platform: platform as ChannelType,
      options: pushooOptions
    };

    const hideToken = tokens[i].replace(/(?<=.{4}).(?=.{4})/g, '*');
    logger.log(
      chalkTemplate`\n\n{bold platform ${i + 1}/${
        platforms.length
      }:} {cyan ${platform}} push options:\n${YAML.stringify({
        ...pushooOptions,
        token: hideToken
      })}`
    );

    try {
      pushState.result = await pushoo(platform as ChannelType, pushooOptions);
    } catch (e) {
      pushState.error = e;
    }
    pushStateList.push(pushState);

    if (pushState.error) {
      logger.info(
        chalkTemplate`{bold ${pushState.platform}}: {red ${pushState.error.message}}`
      );
    } else {
      logger.log(
        chalkTemplate`{bold ${pushState.platform}}: {green Push done.}`
      );
    }
  }

  const successPushCount = pushStateList.filter((v) => !v.error).length;
  logger.log(
    chalkTemplate`\n{bold Pushoo done.} success: {green ${successPushCount}}, failed: {red ${
      pushStateList.length - successPushCount
    }}.`
  );
};

interface PushState {
  platform: ChannelType;
  options: PushooOptions;
  error?: Error;
  result?: any;
}

run();
