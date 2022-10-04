// Tests for the CLI part of the project.

import { tmpdir } from 'os';
import { env } from 'process';
import prompt from 'prompt';

import path from 'path';
import { afterEach, describe, expect, test, vi } from 'vitest';

import manifest from '../package.json';
import {
checkForUpdates, configurationFileSetting, defaultConfigurationFilePath, getHelpText
} from '../src/utils/cli';
import { logger } from '../src/utils/logger';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('utils/cli', () => {
  // Make sure the help message remains the same. If we are changing the help
  // message, then make sure to run `vitest` with the `--update-snapshot` flag.
  test('render help text', () => expect(getHelpText()).toMatchSnapshot());

  test('default configuration path endwith yml', () =>
    expect(defaultConfigurationFilePath).toContain('pushoo.yml'));

  test.skip(
    'configuation file setting',
    async () => {
      const promptSpy = vi.spyOn(prompt, 'get');

      prompt.start();

      expect(promptSpy).not.toHaveBeenCalled();

      await configurationFileSetting(
        path.join(tmpdir(), `.pushoo_${new Date().getTime()}.yml`)
      );

      expect(promptSpy).toHaveBeenCalledOnce();
    },
    { timeout: 1000 }
  );
  // Make sure the update message is shown when the current version is not
  // the latest version.
  test('print update message when newer version exists', async () => {
    const consoleSpy = vi.spyOn(logger, 'log');

    await checkForUpdates({
      ...manifest,
      version: '0.0.0'
    });

    expect(consoleSpy).toHaveBeenCalledOnce();
    expect(consoleSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('UPDATE'),
      expect.stringContaining('latest')
    );
  });

  // Make sure the update message is not shown when the latest version is
  // running.
  test('do not print update message when on latest version', async () => {
    const consoleSpy = vi.spyOn(logger, 'log');

    await checkForUpdates({
      ...manifest,
      version: '99.99.99'
    });

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  // Make sure an update check does not occur when the NO_UPDATE_CHECK env var
  // is set.
  test('do not check for updates when NO_UPDATE_CHECK is set', async () => {
    const consoleSpy = vi.spyOn(logger, 'log');

    env.NO_UPDATE_CHECK = 'true';
    await checkForUpdates({
      ...manifest,
      version: '0.0.0'
    });
    env.NO_UPDATE_CHECK = undefined;

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
