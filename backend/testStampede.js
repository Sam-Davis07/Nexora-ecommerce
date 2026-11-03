
const TOTAL_REQUESTS = 100;

async function testStampede() {
  console.log(`Starting ${TOTAL_REQUESTS} simultaneous requests...\n`);

  const startTime = performance.now();

  const requests = Array.from(
    { length: TOTAL_REQUESTS },
    () => fetch("http://localhost:5000/api/products/1")
  );

  const responses = await Promise.all(requests);

  const endTime = performance.now();

  const results = {
    MISS: 0,
    HIT: 0,
    COALESCED: 0,
    ERRORS: 0,
  };

  for (const response of responses) {
    const cacheStatus = response.headers.get("x-cache");

    if (response.ok && results[cacheStatus] !== undefined) {
      results[cacheStatus]++;
    } else {
      results.ERRORS++;
    }

    await response.body.cancel();
  }

  console.log("========== LOAD TEST RESULTS ==========");

  console.log("Total requests:", TOTAL_REQUESTS);
  console.log("Cache MISS:", results.MISS);
  console.log("Cache HIT:", results.HIT);
  console.log("Coalesced requests:", results.COALESCED);
  console.log("Errors:", results.ERRORS);

  console.log(
    "Total time:",
    (endTime - startTime).toFixed(2),
    "ms"
  );

  console.log("=======================================");
}

testStampede().catch(console.error);
