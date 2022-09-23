# pushoo-cli

[![license][license-image]][repository-url]
[![Build Status][build-status-image]][build-status]
[![Sourcegraph][sg-image]][sg-url]
[![node](https://img.shields.io/node/v/pushoo-cli.svg)](https://nodejs.org/)
[![NPM version][npm-image]][npm-url]
[![Release Date][rle-image]][rle-url]
[![npm download][download-image]][download-url]
<!--[![GitHub repo size][repo-size-image]][repository-url]-->

[repo-size-image]: https://img.shields.io/github/repo-size/funnyzak/pushoo-cli
[build-status-image]: https://img.shields.io/github/workflow/status/funnyzak/pushoo-cli/CI
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

A command line tool with Pushoo.js pushes multiple platform messages.

## Installation

```sh
npm i pushoo-cli -g
```

## Usage

```sh
# Show help
pushoo -h

pushoo -c <config-file-path> -C 'hello world'
```

## Help

    By default, pushoo If there is no corresponding parameter, read the configuration from the local configuration file to send.

    The following options are available:

    -h, --help                          Shows this help message

    -d, --debug                         Show debugging information

    -v, --version                       Displays the current version of pushoo-cli

    config                              Create configuration files to store the default configuration。

    -c, --config                        Optional, Specify the configuration file path

    -C, --content                       Required, The push content of the Markdown format. If the push platform does not support MarkDown, Pushoo will automatically convert to support formats.

    -P, --platforms                     Optional, List of platform name( more: https://github.com/imaegoo/pushoo), such as: wecom, dingtalk, feishu

    -K, --tokens                        Optional, List of token( more: https://github.com/imaegoo/pushoo), such as: wecom_token, dingtalk_token, feishu_token

    -T, --title                         Optional, message title, if the push platform does not support message title, it will be spliced in the first line of the text.

    -O, --options                       Optional, For some additional configuration when pushing, Json string.



## Author

| [![twitter/funnyzak](https://s.gravatar.com/avatar/c2437e240644b1317a4a356c6d6253ee?s=70)](https://twitter.com/funnyzak 'Follow @funnyzak on Twitter') |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [funnyzak](https://yyccme/)                                                                                                                           |

## License

MIT License © 2022 [funnyzak](https://github.com/funnyzak)
