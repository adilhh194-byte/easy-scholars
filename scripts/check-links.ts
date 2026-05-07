/**
 * Link verification script for EasyScholars.
 * Usage: npm run check:links
 */

type LinkResult = {
  title: string;
  field: 'applyUrl' | 'officialSourceUrl' | 'eligibilitySourceUrl';
  url: string;
  status: number | string;
  result: 'OK' | 'REDIRECT' | 'BROKEN';
};

async function main() {
  console.log('\nEasyScholars Link Checker\n');
  console.log('-'.repeat(60));

  let scholarships: Array<{
    id: string;
    title: string;
    applyUrl: string;
    officialSourceUrl?: string;
    eligibilitySourceUrl?: string;
  }>;

  try {
    const mod = await import('../src/lib/mock-data');
    scholarships = mod.MOCK_SCHOLARSHIPS;
  } catch {
    console.error('Could not import mock-data. Run with: npm run check:links');
    process.exit(1);
  }

  async function checkUrl(url: string): Promise<Pick<LinkResult, 'status' | 'result'>> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      let response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeout);

      if (response.ok) {
        return { status: response.status, result: response.redirected ? 'REDIRECT' : 'OK' };
      }

      if (response.status === 405 || response.status === 403) {
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 10000);

        response = await fetch(url, {
          method: 'GET',
          signal: controller2.signal,
          redirect: 'follow',
        });

        clearTimeout(timeout2);

        if (response.ok) {
          return { status: response.status, result: response.redirected ? 'REDIRECT' : 'OK' };
        }
      }

      return { status: response.status, result: 'BROKEN' };
    } catch (err: any) {
      clearTimeout(timeout);

      if (err.name === 'AbortError') {
        return { status: 'TIMEOUT', result: 'BROKEN' };
      }

      return { status: err.code || 'ERROR', result: 'BROKEN' };
    }
  }

  const checks: Array<Omit<LinkResult, 'status' | 'result'>> = [];

  for (const s of scholarships) {
    const urls: Array<{ field: LinkResult['field']; url: string }> = [
      { field: 'applyUrl', url: s.applyUrl },
    ];

    if (s.officialSourceUrl && s.officialSourceUrl !== s.applyUrl) {
      urls.push({ field: 'officialSourceUrl', url: s.officialSourceUrl });
    }

    if (
      s.eligibilitySourceUrl &&
      s.eligibilitySourceUrl !== s.applyUrl &&
      s.eligibilitySourceUrl !== s.officialSourceUrl
    ) {
      urls.push({ field: 'eligibilitySourceUrl', url: s.eligibilitySourceUrl });
    }

    urls.forEach(({ field, url }) => {
      checks.push({ title: s.title, field, url });
    });
  }

  const results: LinkResult[] = [];
  const concurrency = 8;
  let index = 0;

  async function worker() {
    while (index < checks.length) {
      const current = checks[index++];
      const { status, result } = await checkUrl(current.url);
      results.push({ ...current, status, result });
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));

  results.forEach((r) => {
    console.log(`${r.result} [${String(r.status).padStart(3)}] ${r.title}`);
    console.log(`   ${r.field}: ${r.url}`);
  });

  const ok = results.filter((r) => r.result === 'OK').length;
  const redirect = results.filter((r) => r.result === 'REDIRECT').length;
  const broken = results.filter((r) => r.result === 'BROKEN').length;

  console.log('\n' + '-'.repeat(60));
  console.log('\nSummary:');
  console.log(`   Total checked: ${results.length}`);
  console.log(`   Working:       ${ok}`);
  console.log(`   Redirects:     ${redirect}`);
  console.log(`   Broken:        ${broken}`);

  if (broken > 0) {
    console.log('\nBroken links:');
    results
      .filter((r) => r.result === 'BROKEN')
      .forEach((r) => {
        console.log(`   - ${r.title} (${r.field}): ${r.url} [${r.status}]`);
      });
  }

  console.log('');
  process.exit(broken > 0 ? 1 : 0);
}

main();
