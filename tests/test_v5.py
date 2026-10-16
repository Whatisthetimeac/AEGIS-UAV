import csv,math
from pathlib import Path
from playwright.sync_api import sync_playwright
site=Path(__file__).resolve().parents[1]
with (site/'data/iecon_model_replay_1806.csv').open() as f:
 rows=list(csv.DictReader(f))
assert len(rows)==1806
snrs=[float(r['snr_db']) for r in rows]
assert sum(s>=14.1 for s in snrs)==1562
assert sum(math.ceil(s)>=14.1 for s in snrs)==1581
assert sum(s>=5.9 for s in snrs)==1806
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for width,height,label in [(1440,950,'desktop'),(390,844,'mobile')]:
  page=browser.new_page(viewport={'width':width,'height':height},accept_downloads=True)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  html=(site/'index.html').read_text()
  html=html.replace('<script defer src="missions.js"></script>','').replace('<script defer src="data/iecon_replay.js"></script>','').replace('<script defer src="app.js"></script>','').replace('<link rel="stylesheet" href="styles.css">','').replace('<script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>','')
  page.set_content(html,wait_until='domcontentloaded',timeout=15000)
  page.add_style_tag(content=(site/'styles.css').read_text())
  page.add_script_tag(content=(site/'missions.js').read_text())
  page.add_script_tag(content=(site/'data/iecon_replay.js').read_text())
  page.add_script_tag(content=(site/'app.js').read_text())
  page.wait_for_timeout(1900)
  print(label,'selected mission',page.locator('#missionSelect').input_value(),'status',page.locator('#importStatus').inner_text(),'SNR',page.locator('#snrMetric').inner_text())
  assert page.locator('#missionSelect').input_value()=='4'
  assert page.evaluate('window.AEGIS_UAV_TEST.state.imported.count')==1806
  assert page.locator('#serviceDecisions .service-line').count()==4
  assert 'IECON 2026' in page.locator('#dataModeLabel').inner_text()
  assert page.locator('#fallbackOverlay circle').count()>=7 or page.locator('.has-leaflet').count()==1
  assert page.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+3')
  s=float(page.locator('#snrMetric').inner_text().replace(',','.'))
  page.locator('#scenarioSelect').select_option('10')
  s2=float(page.locator('#snrMetric').inner_text().replace(',','.'))
  assert abs(s-s2-10)<0.02
  page.locator('#scenarioSelect').select_option('0')
  page.locator('#legacyRounding').check()
  assert page.evaluate('window.AEGIS_UAV_TEST.state.legacyRounding')
  page.locator('#legacyRounding').uncheck()
  page.locator('#missionSelect').select_option('2')
  assert page.evaluate('window.AEGIS_UAV_TEST.state.imported===null')
  page.locator('#missionSelect').select_option('4')
  assert page.evaluate('window.AEGIS_UAV_TEST.state.imported.verified===true')
  page.locator('#missionSelect').select_option('0')
  with page.expect_download() as info:page.locator('#geojsonBtn').click()
  assert info.value.suggested_filename.endswith('.geojson')
  page.locator('#missionSelect').select_option('4')
  with page.expect_download() as info:page.locator('#seriesBtn').click()
  assert info.value.suggested_filename.endswith('.csv')
  page.screenshot(path=str(site/f'aegis_v5_{label}.png'),full_page=(label=='mobile'),animations='disabled')
  assert not errors,errors
  print(label,'PASSED; errors:',errors)
  page.close()
 browser.close()
print('ALL 2 viewport + scientific parity tests PASSED')
