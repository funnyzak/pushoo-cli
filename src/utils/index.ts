import CmdExists from 'command-exists';
import fs, { lstatSync } from 'fs';
import YAML, { parse as yamlParse } from 'yaml';
import { resolve } from './promise';

export async function commandExists(commandString: string): Promise<boolean> {
  const [commandError] = await resolve(CmdExists(commandString));
  return commandError === undefined;
}

// write yaml file from json object
export async function writeYamlFile(
  filePath: string,
  data: any
): Promise<string> {
  const yaml = YAML.stringify(data);
  await fs.writeFileSync(filePath, yaml, 'utf8');
  return yaml;
}

// read yaml file to json object
export async function readYamlFile<T>(
  filePath: string
): Promise<T> | undefined {
  if ((await fs.existsSync(filePath)) && (await lstatSync(filePath).isFile())) {
    return yamlParse(await fs.readFileSync(filePath, 'utf8')) as T;
  }
  return undefined;
}

// Check the object attributes required
export function checkRequiredAttributes(object: any, attributes: string[]) {
  const checkResult = [];
  for (const attribute of attributes) {
    if (
      !object[attribute] ||
      object[attribute] === null ||
      object[attribute] === ''
    ) {
      checkResult.push(attribute);
    }
  }
  if (checkResult.length > 0) {
    throw new Error(`Missing required attributes: ${checkResult.join(', ')}`);
  }
}

// Check whether the length of multiple array is the same
export function checkArrayLength(array: any[]) {
  const checkResult = [];
  for (const item of array) {
    if (item.length !== array[0].length) {
      checkResult.push(item);
    }
  }
  if (checkResult.length > 0) {
    throw new Error(
      `The length of the array is not the same: ${checkResult.join(', ')}`
    );
  }
}
