// Tests for the CLI part of the project.

import pushooNotice from 'pushoo';

import { afterEach, describe, expect, test, vi } from 'vitest';
import { resolve } from '../src/utils/promise';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('pushoo', () => {
  test('pushoo ifttt test', async () => {
    const [ifttt_error, ifttt_rlt] = await resolve(
      pushooNotice('ifttt', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(ifttt_rlt).toBeDefined();
  });

  test('pushoo qmsg test', async () => {
    const [qmsg_error, qmsg_rlt] = await resolve(
      pushooNotice('qmsg', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(qmsg_rlt).toBeDefined();
  });

  test('pushoo serverchan test', async () => {
    const [serverchan_error, serverchan_rlt] = await resolve(
      pushooNotice('serverchan', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(serverchan_rlt).toBeDefined();
  });

  test('pushoo serverchain test', async () => {
    const [serverchain_error, serverchain_rlt] = await resolve(
      pushooNotice('serverchain', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(serverchain_rlt).toBeDefined();
  });

  test('pushoo pushplus test', async () => {
    const [pushplus_error, pushplus_rlt] = await resolve(
      pushooNotice('pushplus', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(pushplus_rlt).toBeDefined();
  });

  test('pushoo pushplushxtrip test', async () => {
    const [pushplushxtrip_error, pushplushxtrip_rlt] = await resolve(
      pushooNotice('pushplushxtrip', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(pushplushxtrip_rlt).toBeDefined();
  });

  test('pushoo dingtalk test', async () => {
    const [dingtalk_error, dingtalk_rlt] = await resolve(
      pushooNotice('dingtalk', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(dingtalk_rlt).toBeDefined();
  });

  test('pushoo wecom test', async () => {
    const [wecom_error, wecom_rlt] = await resolve(
      pushooNotice('wecom', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(wecom_rlt).toBeDefined();
  });

  test('pushoo bark test', async () => {
    const [bark_error, bark_rlt] = await resolve(
      pushooNotice('bark', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(bark_rlt).toBeDefined();
  });

  test('pushoo gocqhttp test', async () => {
    const [gocqhttp_error, gocqhttp_rlt] = await resolve(
      pushooNotice('gocqhttp', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(gocqhttp_rlt).toBeDefined();
  });

  test('pushoo atri test', async () => {
    const [atri_error, atri_rlt] = await resolve(
      pushooNotice('atri', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(atri_rlt).toBeDefined();
  });

  test('pushoo pushdeer test', async () => {
    const [pushdeer_error, pushdeer_rlt] = await resolve(
      pushooNotice('pushdeer', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(pushdeer_rlt).toBeDefined();
  });

  test('pushoo igot test', async () => {
    const [igot_error, igot_rlt] = await resolve(
      pushooNotice('igot', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(igot_rlt).toBeDefined();
  });

  test('pushoo telegram test', async () => {
    const [telegram_error, telegram_rlt] = await resolve(
      pushooNotice('telegram', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(telegram_rlt).toBeDefined();
  });

  test('pushoo feishu test', async () => {
    const [feishu_error, feishu_rlt] = await resolve(
      pushooNotice('feishu', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(feishu_rlt).toBeDefined();
  });

  test('pushoo wecombott test', async () => {
    const [wecombot_error, wecombott_rlt] = await resolve(
      pushooNotice('wecombot', {
        title: 'test',
        content: 'test',
        token: 'test'
      })
    );

    expect(wecombott_rlt).toBeDefined();
  });
});
