import { onAlias, onIdentify, onTrack } from '../../packages/altertable-segment/src';

const endpoint = process.env.ALTERTABLE_MOCK_ENDPOINT || 'http://127.0.0.1:15001';
const apiKey = process.env.ALTERTABLE_MOCK_API_KEY || 'valid_api_key';
const environment = process.env.ALTERTABLE_MOCK_ENV || 'integration_env';

const now = new Date().toISOString();

async function main() {
  const settings = {
    apiKey,
    endpoint,
    environment,
  };

  await onTrack(
    {
      type: 'track',
      messageId: 'ci-track',
      timestamp: now,
      userId: 'ci-user',
      event: 'ci_integration_track',
      properties: { source: 'github-actions' },
    },
    settings
  );

  await onIdentify(
    {
      type: 'identify',
      messageId: 'ci-identify',
      timestamp: now,
      userId: 'ci-user',
      traits: { plan: 'free' },
    },
    settings
  );

  await onAlias(
    {
      type: 'alias',
      messageId: 'ci-alias',
      timestamp: now,
      userId: 'ci-user',
      previousId: 'ci-anon-user',
    },
    settings
  );

  console.log('altertable-mock integration smoke test passed');
}

main().catch(error => {
  console.error('altertable-mock integration smoke test failed');
  console.error(error);
  process.exit(1);
});
