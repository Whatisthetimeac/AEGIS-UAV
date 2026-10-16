/* Optional browser integration test. Install Playwright and its Chromium runtime. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'playwright'):'playwright');
const origin=process.env.AEGIS_TEST_URL||'http://127.0.0.1:8765';
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{for(const [width,height] of [[1440,1000],[390,844]]){
  const page=await browser.newPage({viewport:{width,height},acceptDownloads:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin,{waitUntil:'domcontentloaded'});
  await page.locator('#analysisCount').waitFor();
  assert.equal(await page.locator('#analysisCount').textContent(),'1.806');
  assert.equal(await page.locator('#analysisAvoided').textContent(),'244');
  await page.locator('#demoBtn').click();
  assert.equal(await page.locator('#serviceDecisions .decision-tag.no').count(),5);
  await page.locator('#runBatch').click();
  assert.equal(await page.locator('#batchRows tr').count(),5);
  assert.equal(await page.locator('#batchExport').isDisabled(),false);
  const download=page.waitForEvent('download');await page.locator('#analysisExport').click();
  assert.equal((await download).suggestedFilename(),'aegis-analise-missao.json');
  await page.locator('#missionSelect').selectOption('1');
  assert.equal(await page.locator('#dataModeLabel').textContent(),'Missão demonstrativa · sintética');
  const before=await page.locator('#snrMetric').textContent();await page.locator('#scenarioSelect').selectOption('10');
  const after=await page.locator('#snrMetric').textContent();
  assert.ok(Math.abs(parseFloat(before.replace(',','.'))-parseFloat(after.replace(',','.'))-10)<.02);
  await page.locator('#missionSelect').selectOption('4');await page.locator('#resetBtn').click();
  assert.equal(await page.locator('#analysisAvoided').textContent(),'244');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  assert.deepEqual(errors,[]);
  fs.mkdirSync(path.join(__dirname,'../test-results'),{recursive:true});
  await page.screenshot({path:path.join(__dirname,`../test-results/${width}.png`),fullPage:true});
  await page.close();console.log('PASS UI',width,height);
 }}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
