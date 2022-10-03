#!/usr/bin/env node

import chalkTemplate from 'chalk-template';
import { exit } from 'node:process';
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

  let cli_options = {
    config: args['--config'],
    platforms: args['--platforms'],
    tokens: args['--tokens'],
    title: args['--title'],
    content: args['--content'],
    options: args['--options'],
    debug: args['--debug']
  };

  // if debug, then set log level to debug
  if (cli_options.debug) {
    logger.setLevel('debug');
  }
  logger.debug('command options:', JSON.stringify(cli_options));

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
    await configurationFileSetting();
    exit(0);
  }

  const _default_config = await getDefaultConfiguration();

  // log default config string
  logger.debug(
    `default config(${defaultConfigurationFilePath}):`,
    JSON.stringify(_default_config)
  );

  if (cli_options.config) {
    const _config = await getConfiguration(cli_options.config);

    if (_config) {
      cli_options.platforms = cli_options.platforms
        ? cli_options.platforms
        : _config.platforms;

      cli_options.tokens = cli_options.tokens
        ? cli_options.tokens
        : _config.tokens;

      cli_options.title = cli_options.title ? cli_options.title : _config.title;

      cli_options.content = cli_options.content
        ? cli_options.content
        : _config.content;
    }
  } else if (_default_config) {
    cli_options.platforms = cli_options.platforms
      ? cli_options.platforms
      : _default_config.platforms;

    cli_options.tokens = cli_options.tokens
      ? cli_options.tokens
      : _default_config.tokens;

    cli_options.title = cli_options.title
      ? cli_options.title
      : _default_config.title;

    cli_options.content = cli_options.content
      ? cli_options.content
      : _default_config.content;
  }

  if (!cli_options.content && cli_options.content === '' && args._[0]) {
    cli_options.content = args._[0];
  }

  // if content is not set, show help text and exit
  if (!cli_options.content && cli_options.content === '') {
    logger.info(getHelpText());
    exit(0);
  }

  utils.checkRequiredAttributes(cli_options, [
    'platforms',
    'tokens',
    'content'
  ]);

  const platforms = cli_options.platforms.split(/[,，]/).map((p) => p.trim());
  const tokens = cli_options.tokens.split(/[,，]/).map((t) => t.trim());

  utils.checkArrayLength([platforms, tokens]);

  let push_state_list: Array<PushState> = [];

  logger.log(chalkTemplate`{bold pushoo ...}`);

  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    // Hide string parts of the character
    const _options: PushooOptions = {
      token: tokens[i],
      title: cli_options.title,
      content: cli_options.content,
      options: cli_options.options ? JSON.parse(cli_options.options) : {}
    };

    let push_state: PushState = {
      platform: platform as ChannelType,
      options: _options
    };

    const hide_token = tokens[i].replace(/(?<=.{4}).(?=.{4})/g, '*');
    logger.log(
      chalkTemplate`\n\n{bold platform ${i + 1}/${
        platforms.length
      }:} {cyan ${platform}} push options:\n${YAML.stringify({
        ..._options,
        token: hide_token
      })}`
    );

    try {
      push_state.result = await pushoo(platform as ChannelType, _options);
    } catch (e) {
      push_state.error = e;
    }
    push_state_list.push(push_state);

    if (push_state.error) {
      logger.info(
        chalkTemplate`{bold ${push_state.platform}}: {red ${push_state.error.message}}`
      );
    } else {
      logger.log(
        chalkTemplate`{bold ${push_state.platform}}: {green Push done.}`
      );
    }
  }

  const _success_push_count = push_state_list.filter((v) => !v.error).length;
  logger.log(
    chalkTemplate`\n{bold Pushoo done.} success: {green ${_success_push_count}}, failed: {red ${
      push_state_list.length - _success_push_count
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
