// CLI-related utility functions.

import parseArgv from 'arg';
import chalk from 'chalk';
import chalkTemplate from 'chalk-template';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { env } from 'node:process';
import prompt from 'prompt';
import checkForUpdate from 'update-check';
import { readYamlFile, writeYamlFile } from '.';
import type { Arguments } from '../types';
import { Prompts } from '../types';
import { logger } from './logger';
import { resolve } from './promise';

// The help text for the CLI.
const helpText = chalkTemplate`
{bold.cyan pushoo-cli} - a command line tool with Pushoo.js pushes multiple platform messages.

{bold Usage:}
  {cyan pushoo} [options]
  {cyan pushoo} --help
  {cyan pushoo} --version
  {cyan pushoo} "hello world"
  {cyan pushoo} -C "hello world"
  {cyan pushoo} -c ./pushoo.yml -C "hello world"
  {cyan pushoo} -P wecom -K wecom_token -C "hello world"

{bold Options:}
  {cyan -h, --help}                          Shows help.
  {cyan -d, --debug}                         Show debugging information.
  {cyan -v, --version}                       Print version of pushoo-cli.
  {cyan -c, --config}                        Optional, Specify the configuration file path.
  {cyan -C, --content}                       Required, The push content of the Markdown format.
  {cyan -P, --platforms}                     Optional, List of platform name( more: https://github.com/imaegoo/pushoo), such as: {underline wecom, dingtalk,feishu}.
 {cyan -K, --tokens}                        Optional, List of token( more: https://github.com/imaegoo/pushoo), such as: {underline wecom_token, dingtalk_token,feishu_token}.
  {cyan -T, --title}                         Optional, message title.
  {cyan -O, --options}                       Optional, For some additional configuration when pushing, Json string.

  By default, {cyan pushoo} If there is no corresponding parameter, read the configuration from the local configuration file to send.

{bold Commands:}
  {cyan config}                              Create configuration files to store the default configuration。
`;

/**
 * Returns the help text.
 *
 * @returns The help text shown when the `--help` option is used.
 */
export const getHelpText = (): string => helpText;

// The options the CLI accepts, and how to parse them.
const options = {
  '--help': Boolean,
  '--debug': Boolean,
  '--version': Boolean,
  '--config': String,
  '--content': String,
  '--platforms': String,
  '--tokens': String,
  '--title': String,
  '--options': String,

  // A list of aliases for the above options.
  '-h': '--help',
  '-d': '--debug',
  '-v': '--version',
  '-c': '--config',
  '-C': '--content',
  '-P': '--platforms',
  '-K': '--tokens',
  '-T': '--title',
  '-O': '--options'
};

/**
 * Parses the program's `process.argv` and returns the options and arguments.
 *
 * @returns The parsed options and arguments.
 */
export const parseArguments = (): Arguments => parseArgv(options);

/**
 * Checks for updates to this package. If an update is available, it brings it
 * to the user's notice by printing a message to the console.
 */
export const checkForUpdates = async (manifest: object): Promise<void> => {
  // Do not check for updates if the `NO_UPDATE_CHECK` variable is set.
  if (env.NO_UPDATE_CHECK) return;

  // Check for a newer version of the package.
  const [error, update] = await resolve(checkForUpdate(manifest));

  // If there is an error, throw it; and if there is no update, return.
  if (error) throw error;
  if (!update) return;

  // If a newer version is available, tell the user.
  logger.log(
    chalk.bgRed.white(' UPDATE '),
    `The latest version of \`pushoo-cli\` is ${update.latest}`
  );
};

// The default configuration file path.
export const defaultConfigurationFilePath = path.join(
  os.homedir(),
  '.pushoo.yml'
);


export const getConfiguration = (filepath: string) =>
  readYamlFile<Prompts.Configuration>(filepath);


// get default configuration json
export const getDefaultConfiguration = () =>
  getConfiguration(defaultConfigurationFilePath);

export const configurationFileSetting = async (): Promise<void> => {
  let _configuration = await readYamlFile<Prompts.Configuration>(
    defaultConfigurationFilePath
  );
  if (_configuration) {
    logger.log(
      chalkTemplate`The following is the current configuration: \n\n{cyan ${await fs.readFileSync(
        defaultConfigurationFilePath,
        'utf8'
      )}}`
    );

    const { confirm } = await prompt.get({
      properties: {
        confirm: {
          message: 'Reconfigure? (y/n)',
          required: false
        }
      }
    });

    if (confirm !== 'y') {
      return;
    }
  }

  _configuration = await prompt.get<Prompts.Configuration>({
    properties: {
      platforms: {
        message:
          'List of platform name( more: https://github.com/imaegoo/pushoo), such as: wecom, dingtalk, feishu',
        required: true,
        default: _configuration?.platforms
      },
      tokens: {
        message:
          'List of token( more: https://github.com/imaegoo/pushoo), such as: wecom_token, dingtalk_token, feishu_token',
        required: true,
        default: _configuration?.tokens
      },
      title: {
        message: 'Optional，Default message title',
        required: false,
        default: undefined
      },
      content: {
        message: 'optional, Default message content',
        required: false,
        default: undefined
      }
    }
  });

  if (
    _configuration.platforms.split(/[,，]/).length !==
    _configuration.tokens.split(/[,，]/).length
  ) {
    logger.error('The number of platforms and tokens must be the same');
    return;
  }

  const _yaml = await writeYamlFile(defaultConfigurationFilePath, _configuration);

  logger.log(
    chalkTemplate`The configuration content as follows：\n\n{cyan ${_yaml}}\nAnd configuration file has been stored：{cyan ${defaultConfigurationFilePath}}，You can modify the configuration through {cyan pushoo config}。`
  );
};
