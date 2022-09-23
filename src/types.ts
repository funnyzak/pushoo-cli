// Type definitions for the CLI.

import prompt from 'prompt';

// An error thrown by any native Node modules.
export declare interface NodeError extends Error {
  code: string;
}

// A path to a file/remote resource.
export declare type Path = string;

// The options you can pass to the CLI.
export declare interface Options {
  '--help': boolean;
  '--debug': boolean;
  '--version': boolean;
  '--config': string;
  '--content': string;
  '--platforms': string;
  '--tokens': string;
  '--title': string;
  '--options': string;
}

export namespace Prompts {
  // Configuration file variable
  export declare interface Configuration extends prompt.Properties {
    platforms?: string;
    tokens?: string;
    title?: string;
    content?: string;
  }
}

// The arguments passed to the CLI (the options + the positional arguments)
export declare type Arguments = Partial<Options> & {
  _: string[];
};
