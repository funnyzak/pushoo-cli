# pushoo-cli

[![NPM](https://nodei.co/npm/pushoo-cli.png?downloads=true&compact=true)](https://www.npmjs.com/package/pushoo-cli)

A command line tool with [Pushoo.js](https://github.com/imaegoo/pushoo) pushes multiple platform messages.

[![Build Status][build-status-image]][build-status]
[![license][license-image]][repository-url]
[![node](https://img.shields.io/node/v/pushoo-cli.svg)](https://nodejs.org/)
[![NPM version][npm-image]][npm-url]
[![Release Date][rle-image]][rle-url]
[![npm download][download-image]][download-url]
<!--[![GitHub repo size][repo-size-image]][repository-url]-->
<!-- [![Sourcegraph][sg-image]][sg-url] -->

[repo-size-image]: https://img.shields.io/github/repo-size/funnyzak/pushoo-cli
[build-status-image]: https://github.com/funnyzak/pushoo-cli/actions/workflows/ci.yml/badge.svg
[build-status]: https://github.com/funnyzak/pushoo-cli/actions
[license-image]: https://img.shields.io/github/license/funnyzak/pushoo-cli.svg?style=flat-square
[repository-url]: https://github.com/funnyzak/pushoo-cli
[npm-image]: https://img.shields.io/npm/v/pushoo-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/pushoo-cli
[download-image]: https://img.shields.io/npm/dm/pushoo-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/pushoo-cli
[sg-image]: https://img.shields.io/badge/view%20on-Sourcegraph-brightgreen.svg?style=flat-square
[sg-url]: https://sourcegraph.com/github.com/funnyzak/pushoo-cli
[rle-image]: https://img.shields.io/github/release-date/funnyzak/pushoo-cli.svg
[rle-url]: https://github.com/funnyzak/pushoo-cli/releases/latest

## Prerequisite

* [node >= 14.x](http://nodejs.cn/download/)

## Installation

```sh
npm i pushoo-cli -g
```

## Usage

```sh
# Show help
pushoo -h

# Read the configuration from the default configuration file and push the message
pushoo "This is the content"

# Read the configuration from the default configuration file, and push the message
pushoo -C "This is the content"

# Specify the config file, and push the message
pushoo -c ./pushoo.yml -C "This is the content"

# Specify the platform and token, and push the message
pushoo -P wecom -K wecom_token -C "This is the content"

# Specify the platform and token, and push the message
pushoo -P wecom -K wecom_token -C "This is the content" -T "This is the title"
#
```

After installing it, run `pushoo --help` without arguments to see list of options:

```plain
pushoo-cli - a command line tool with Pushoo.js pushes multiple platform messages.

Usage:
  pushoo [options]
  pushoo --help
  pushoo --version
  pushoo "hello world"
  pushoo -C "hello world"
  pushoo -c ./pushoo.yml -C "hello world"
  pushoo -P wecom -K wecom_token -C "hello world"

Commands:
  config                              Create default configuration file.

Options:
  -h, --help                          Shows help.
  -d, --debug                         Show debugging information.
  -v, --version                       Print version of pushoo-cli.
  -c, --config                        Optional, Specify the configuration file path.
  -C, --content                       Required, The push content of the Markdown format.
  -P, --platforms                     Optional, List of platform name(more: https://github.com/imaegoo/pushoo), such as: wecom, dingtalk,feishu.
  -K, --tokens                        Optional, List of token(more: https://github.com/imaegoo/pushoo), such as: wecom_token, dingtalk_token,feishu_token.
  -T, --title                         Optional, message title.
  -O, --options                       Optional, For some additional configuration when pushing, Json string.

  By default, pushoo If there is no corresponding parameter, read the configuration from the local configuration file to send.

  More information about the pushoo-cli can be found at: https://github.com/funnyzak/pushoo-cli, and the pushoo can be found at: https://github.com/imaegoo/pushoo.
```

## Preview

![show help](https://raw.githubusercontent.com/funnyzak/pushoo-cli/main/public/assets/help.png)
![push](https://raw.githubusercontent.com/funnyzak/pushoo-cli/main/public/assets/push.png)

## Configuration

Create default configuration file, run:

```sh
pushoo config
```

or you can create a configuration file yourself, the configuration file is a yaml file, the configuration file is as follows:

```yaml
platforms: ifttt, bark
tokens: hello-QUp#push_origin,3TuQzNFJVL7G
title: ""
content: ""

```

## Reference

- [Pushoo.js](https://github.com/imaegoo/pushoo) is a push library with multiple platforms.
- [Pushoo GitHub Action](https://github.com/funnyzak/pushoo-action) is a github action with pushoo.js pushes multiple platform messages.

## Contribution

If you have any questions or suggestions, please feel free to open an issue or pull request.

<a href="https://github.com/funnyzak/pushoo-cli/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=funnyzak/pushoo-cli" />
</a>

## License

MIT License © 2022 [funnyzak](https://github.com/funnyzak)
