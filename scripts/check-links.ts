/**
 * Link verification script for EasyScholars
 * Usage: npx tsx scripts/check-links.ts
 */

// Use dynamic import to handle the mock-data module
async function main() {
  // We need to resolve the path aliases, so let's read the data directly
  const path = require('path');
  const fs = require('fs');
  
  // Read and parse the compiled data
  const tsConfigPath = path.resolve(__dirname, '..', 'tsconfig.json');
  
  console.log('\n🔗 EasyScholars Link Checker\n');
  console.log('─'.repeat(60));

  // Import scholarships - we'll use tsx to handle the TS imports
  let scholarships: Array<{ id: string; title: string; applyUrl: string; officialSourceUrl?: string }>;
  
  try {
    const mod = await import('../src/lib/mock-data');
    scholarships = mod.MOCK_SCHOLARSHIPS;
  } catch {
    console.error('❌ Could not import mock-data. Run with: npx tsx scripts/check-links.ts');
    process.exit(1);
  }

  const results: Array<{
    title: string;
    field: string;
    url: string;
    status: number | string;
    result: 'OK' | 'REDIRECT' | 'BROKEN';
  }> = [];

  async function checkUrl(url: string): Promise<{ status: number | string; result: 'OK' | 'REDIRECT' | 'BROKEN' }> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      // Try HEAD first
      let response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeout);

      if (response.ok) {
        return { status: response.status, result: response.redirected ? 'REDIRECT' : 'OK' };
      }

      // If HEAD fails (some servers don't support it), try GET
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

  for (const s of scholarships) {
    const urls: Array<{ field: string; url: string }> = [
      { field: 'applyUrl', url: s.applyUrl },
    ];

    if (s.officialSourceUrl && s.officialSourceUrl !== s.applyUrl) {
      urls.push({ field: 'officialSourceUrl', url: s.officialSourceUrl });
    }

    for (const { field, url } of urls) {
      const { status, result } = await checkUrl(url);
      const icon = result === 'OK' ? '✅' : result === 'REDIRECT' ? '↪️ ' : '❌';
      console.log(`${icon} [${String(status).padStart(3)}] ${s.title}`);
      console.log(`   ${field}: ${url}`);
      results.push({ title: s.title, field, url, status, result });
    }
  }

  // Summary
  const ok = results.filter(r => r.result === 'OK').length;
  const redirect = results.filter(r => r.result === 'REDIRECT').length;
  const broken = results.filter(r => r.result === 'BROKEN').length;

  console.log('\n' + '─'.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   Total checked: ${results.length}`);
  console.log(`   ✅ Working:    ${ok}`);
  console.log(`   ↪️  Redirects:  ${redirect}`);
  console.log(`   ❌ Broken:     ${broken}`);

  if (broken > 0) {
    console.log(`\n⚠️  Broken links:`);
    results.filter(r => r.result === 'BROKEN').forEach(r => {
      console.log(`   - ${r.title} (${r.field}): ${r.url} [${r.status}]`);
    });
  }

  console.log('');
  process.exit(broken > 0 ? 1 : 0);
}

main();
