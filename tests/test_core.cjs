const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const elements=new Map();
function element(id){if(!elements.has(id))elements.set(id,{value:id==='analysisService'?'2':'',textContent:'',innerHTML:'',disabled:false,classList:{add(){},remove(){}},style:{}});return elements.get(id)}
const context={console,URL,Blob,Map,Math,Number,JSON,Date,setTimeout:()=>0,clearTimeout(){},document:{readyState:'loading',addEventListener(){},getElementById:element},window:{}};
vm.createContext(context);
for(const f of ['missions.js','data/iecon_replay.js','app.js','research.js'])vm.runInContext(fs.readFileSync(path.join(root,'src',f),'utf8'),context,{filename:f});
const run=s=>vm.runInContext(s,context);
run('state.imported=ieconBuiltIn()');
const samples=run('analysisSamples()'),a=run('summarizeSamples(analysisSamples())');
assert.equal(samples.length,1806);
assert.equal(a[0].uniform,1562);assert.equal(a[0].mapped,1806);assert.equal(a[0].avoided,244);
assert.equal(a[2].mapped,1806);assert.equal(a[3].mapped,1562);assert.equal(a[3].gain_pp,0);
assert.ok(Math.abs(a[0].gain_pp-13.510520487264673)<1e-10);
assert.equal(run('decide(14.1)[3].mapped'),true);
assert.equal(run('decide(14.1-1e-9)[3].mapped'),false);
assert.equal(run('decide(-6.7)[0].mapped'),true);
assert.equal(run('decide(-6.700001)[0].mapped'),false);
run('state.legacyRounding=true');assert.equal(run('summarizeSamples(analysisSamples())[0].uniform'),1581);run('state.legacyRounding=false');
const base=run('radioLink(3,225).snrDb');run('state.loss=10');assert.ok(Math.abs(run('radioLink(3,225).snrDb')-(base-10))<1e-10);run('state.loss=0');
context.input=fs.readFileSync(path.join(root,'data/iecon_model_replay_1806.csv'),'utf8');
assert.equal(run('safeImportCsv(input).count'),1806);
assert.throws(()=>run("safeImportCsv('uav,time_s,x_m,y_m\\nA1,0,0,0\\nA1,300,1,1')"),/seis séries/);
assert.throws(()=>run("safeImportCsv('uav,time_s,x_m,y_m\\nA1,0,,0\\nA1,300,1,1')"),/vazio/);
assert.throws(()=>run("safeImportCsv('uav,time_s,x_m,y_m\\nA1,0,0,0\\nA1,0,1,1')"),/crescentes/);
// External source records remain the statistical unit, rather than interpolated playback points.
run('state.imported=safeImportCsv(input)');assert.equal(run('analysisSamples().length'),1806);assert.equal(run('state.imported.verified'),undefined);
run('state.imported=ieconBuiltIn()');
run('renderResearch()');assert.ok(element('aggregateRows').innerHTML.includes('1562/1806'));
const old=run('state.imported');const batch=run('runBatchStudy()');assert.equal(batch.length,80);assert.equal(run('state.imported'),old);assert.equal(run('state.mission'),4);
for(const r of batch){assert.equal(r.n,1806);assert.ok(r.mapped>=r.uniform);assert.ok(r.mapped<=r.n);if(r.service==='nvlos')assert.equal(r.gain_pp,0);}
for(const mission of ['iecon','power','coastal','rescue','urban']){let previous=Infinity;for(const loss of [0,3,6,10]){const r=batch.find(r=>r.mission===mission&&r.loss_db===loss&&r.service==='vlos');assert.ok(r.mapped<=previous);previous=r.mapped;}}
const ref=batch.find(r=>r.mission==='iecon'&&r.loss_db===0&&r.service==='vlos');assert.equal(ref.avoided,244);
// Recalculate exported reference from coordinates, independently of stored SNR.
const source=context.input.trim().split(/\r?\n/);const keys=source.shift().split(',');let maxError=0;
for(const line of source){const r=Object.fromEntries(line.split(',').map((v,i)=>[keys[i],v]));const d=Math.hypot(+r.x_m,+r.y_m,+r.altitude_m-10),snr=112-(20*Math.log10(d)+20*Math.log10(3.410e9)-147.55);maxError=Math.max(maxError,Math.abs(snr-Number(r.snr_db)));}
assert.ok(maxError<1e-7);
if(process.argv.includes('--export')){
 const keys=Object.keys(batch[0]);fs.writeFileSync(path.join(root,'data/study_20_scenarios.csv'),[keys.join(','),...batch.map(r=>keys.map(k=>r[k]).join(','))].join('\n')+'\n');
 fs.writeFileSync(path.join(root,'data/study_provenance.json'),JSON.stringify({engine:'Node.js executing src/app.js and src/research.js',engine_version:process.version,model:'deterministic FSPL',conditions:20,profiles:4,link_position_evaluations:36120,independent_flights:false,matlab_executed:false,baseline_uniform_count:1562,reference_snr_max_error_db:maxError,generated_at:new Date().toISOString()},null,2)+'\n');
}
console.log('PASS: source-data parity, threshold boundaries, legacy rounding, loss, import rejection, aggregate rendering, 20 paired conditions, state restoration and monotonicity. Max SNR error:',maxError);
