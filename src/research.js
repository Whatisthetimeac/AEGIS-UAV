'use strict';
/* Descriptive, paired comparisons. Positions from one mission are correlated. */
const LINK_LEVELS = [ [-6.7,.15],[-4.7,.23],[-2.3,.38],[.2,.60],[2.4,.88],[4.3,1.18],[5.9,1.48],[8.1,1.91],[10.3,2.41],[11.7,2.73],[14.1,3.32],[16.3,3.90],[18.7,4.52],[21,5.12],[22.7,5.55] ];
let researchCache=null, batchResults=null;
function analysisSamples(){
 const out=[];
 if(state.imported){for(const [name,rows] of state.imported.byUav)for(const r of rows){
  const distance=Math.max(1,Math.hypot(r.x,r.y,r.alt-RADIO.baseHeightM));
  let snr=(r.snr===null?RADIO.txDbm+RADIO.txGainDbi+RADIO.rxGainDbi-(20*Math.log10(distance)+20*Math.log10(RADIO.freqHz)-147.55)-RADIO.noiseDbm:r.snr)-state.loss;
  if(state.legacyRounding&&state.imported.verified)snr=Math.ceil(snr);
  out.push({uav:name,time:r.time,snr});
 }}else{for(let i=0;i<6;i++)for(let t=0;t<=300;t++)out.push({uav:NAMES[i],time:t,snr:radioLink(i,t).snrDb});}
 return out;
}
function summarizeSamples(samples,margin=0,delta=0){
 return SERVICES.map(s=>{
  const uniform=samples.filter(r=>r.snr>=14.1+margin+delta).length;
  const mapped=samples.filter(r=>r.snr>=s.thresholdDb+margin+delta).length;
  return {service:s.id,n:samples.length,uniform,mapped,avoided:mapped-uniform,uniform_pct:100*uniform/samples.length,mapped_pct:100*mapped/samples.length,gain_pp:100*(mapped-uniform)/samples.length};
 });
}
function renderResearch(){
 if(!$('aggregateRows'))return;
 const focus=Number($('analysisService').value||2);
 const key=[state.mission,state.loss,state.margin,state.delta,state.legacyRounding,focus].join('|');
 if(researchCache?.key===key&&researchCache.imported===state.imported)return;
 const samples=analysisSamples(),totals=summarizeSamples(samples,state.margin,state.delta),selected=totals[focus];
 researchCache={key,imported:state.imported,samples,totals};
 $('analysisCount').textContent=number(samples.length,0);
 $('analysisGain').textContent='+'+number(selected.gain_pp,2);
 $('analysisAvoided').textContent=number(selected.avoided,0);
 $('analysisScope').textContent=`${mission().name} · ${state.imported?.verified?'geometria IECON':state.imported?'amostras externas originais':'malha simulada de 1 s'} · perda ${state.loss} dB · margem ${number(state.margin,2)} dB · δ ${number(state.delta,2)} dB`;
 $('aggregateRows').innerHTML=totals.map((s,i)=>`<tr><td>${SERVICES[i].name}</td><td>${s.uniform}/${s.n}<small>${number(s.uniform_pct,2)}%</small></td><td>${s.mapped}/${s.n}<small>${number(s.mapped_pct,2)}%</small></td><td class="gain">+${number(s.gain_pp,2)} p.p.</td><td>${s.avoided}</td></tr>`).join('');
 const perUav=NAMES.map(n=>({name:n,...summarizeSamples(samples.filter(s=>s.uav===n),state.margin,state.delta)[focus]}));
 $('trajectoryBars').innerHTML=perUav.map(r=>`<div class="trajectory-row"><b>${r.name}</b><div class="bar-track"><i style="width:${r.gain_pp}%"></i></div><span>+${number(r.gain_pp,2)} p.p.</span></div>`).join('');
 const gains=perUav.map(r=>r.gain_pp).sort((a,b)=>a-b);
 $('trajectorySummary').textContent=`Por trajetória: mínimo ${number(gains[0],2)} · mediana ${number((gains[2]+gains[3])/2,2)} · máximo ${number(gains[5],2)} p.p. Escala das barras: 0 a 100 p.p.`;
 const deltas=[-1,-.5,-.25,0,.25,.5,1];
 $('sensitivityGrid').innerHTML='<thead><tr><th>m / δ (dB)</th>'+deltas.map(d=>`<th>${number(d,2)}</th>`).join('')+'</tr></thead><tbody>'+[0,1,2,3].map(m=>'<tr><th>'+m+' dB</th>'+deltas.map(d=>{const a=summarizeSamples(samples,m,d)[focus];return `<td style="background:rgba(98,220,167,${.04+.40*a.gain_pp/100})" title="${a.avoided} de ${a.n} rejeições conservadoras evitadas">${number(a.gain_pp,2)}</td>`}).join('')+'</tr>').join('')+'</tbody>';
 const efficiency=SERVICES[focus].rateBps/RADIO.bandwidthHz,level=LINK_LEVELS.findIndex(l=>l[1]>=efficiency);
 $('traceability').textContent=`${fmtRate(SERVICES[focus].rateBps)} ÷ 1,4 MHz = ${number(efficiency,5)} bit/s/Hz → nível ${level+1} (${number(LINK_LEVELS[level][1],2)} bit/s/Hz) → limiar ${number(LINK_LEVELS[level][0],1)} dB → comparação no mesmo enlace.`;
}
function runBatchStudy(){
 const prior={mission:state.mission,imported:state.imported,loss:state.loss,margin:state.margin,delta:state.delta,legacyRounding:state.legacyRounding};
 const out=[];
 try{for(let m=0;m<5;m++){
  Object.assign(state,{mission:m,imported:m===4?ieconBuiltIn():null,margin:0,delta:0,legacyRounding:false});
  for(const loss of [0,3,6,10]){state.loss=loss;const samples=analysisSamples();for(const a of summarizeSamples(samples))out.push({mission:mission().id,origin:m===4?'iecon_modeled_geometry':'synthetic_mission',loss_db:loss,margin_db:0,delta_db:0,...a});}
 }}finally{Object.assign(state,prior);}
 batchResults=out;
 $('batchRows').innerHTML=MISSION_PRESETS.map(m=>'<tr><th>'+m.name.split(' · ')[0]+'</th>'+[0,3,6,10].map(loss=>{const r=out.find(r=>r.mission===m.id&&r.loss_db===loss&&r.service==='vlos');return `<td><b>+${number(r.gain_pp,2)}</b><small>${number(r.mapped_pct,1)}% admitidos</small></td>`}).join('')+'</tr>').join('');
 $('batchStatus').textContent='20 cenários determinísticos · 36.120 avaliações de enlace-posição · 4 perfis avaliados separadamente. Comparação VLOS, margem e perturbação nulas. Mesma geometria em cada par.';
 $('batchExport').disabled=false;toast('Estudo calculado e pronto para exportação');
 return out;
}
function exportResearch(){
 const payload={schema_version:1,generated_at:new Date().toISOString(),scenario:snapshot(),analysis_unit:'original input records, or deterministic 1-second grid',correlated_positions:true,summary:researchCache?.totals,samples:researchCache?.samples};
 downloadFile('aegis-analise-missao.json',JSON.stringify(payload,null,2),'application/json');
}
function bindResearch(){
 $('analysisService').onchange=()=>{researchCache=null;renderResearch()};
 $('analysisExport').onclick=exportResearch;
 $('runBatch').onclick=runBatchStudy;
 $('batchExport').onclick=()=>{if(!batchResults)return;const keys=Object.keys(batchResults[0]);downloadFile('aegis-estudo-20-cenarios.csv',[keys.join(','),...batchResults.map(r=>keys.map(k=>r[k]).join(','))].join('\r\n'),'text/csv;charset=utf-8');};
 $('demoBtn').onclick=()=>{
  stop();state.mission=4;state.imported=ieconBuiltIn();state.loss=0;state.margin=0;state.delta=0;state.legacyRounding=false;
  let chosen=null;for(let i=0;i<6&&!chosen;i++)for(let t=0;t<=300;t++)if(radioLink(i,t).snrDb<14.1&&radioLink(i,t).snrDb>=5.9){chosen={i,t};break;}
  state.drone=chosen.i;state.time=chosen.t;
  for(const [id,v] of [['missionSelect',4],['scenarioSelect',0],['marginSlider',0],['deltaSlider',0],['droneSelect',chosen.i]])$(id).value=v;
  $('legacyRounding').checked=false;state.importError=null;state.editing=false;$('missionDescription').textContent=mission().description;$('waypointMode').textContent='＋ Adicionar waypoint';updateMapMission();render();
  $('tourNote').hidden=false;$('laboratory').scrollIntoView({behavior:'smooth',block:'start'});
 };
 $('closeTour').onclick=()=>{$('tourNote').hidden=true};
 $('matlabRun').onclick=async()=>{
  const button=$('matlabRun');button.disabled=true;$('matlabStatus').textContent='Consultando o MATLAB local…';
  try{
   const base=location.origin;
   const status=await fetch(base+'/api/status').then(r=>{if(!r.ok)throw Error('Abra a aplicação pelo iniciador local para executar MATLAB.');return r.json()});
   if(!status.matlab_available)throw Error('MATLAB não encontrado no computador do servidor. Configure MATLAB_BIN e reinicie o iniciador.');
   if(state.imported&&!state.imported.verified)throw Error('Selecione uma missão de estudo ou o cenário IECON antes de executar MATLAB.');
   const result=await fetch(base+'/api/simulate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mission:mission().id,waypoints:mission().waypoints,altitude_m:mission().altitudeM})}).then(async r=>{const v=await r.json();if(!r.ok)throw Error(v.error||'Falha na execução');return v});
   const imported=safeImportCsv(result.csv);imported.filename='matlab_'+mission().id+'.csv';imported.source='local_matlab_execution';
   stop();state.imported=imported;researchCache=null;updateMapMission();render();
   $('matlabStatus').textContent=`MATLAB executado · ${imported.count} registros importados · ${result.elapsed_s} s. Resultado de simulação local.`;
  }catch(e){$('matlabStatus').textContent=e.message;}finally{button.disabled=false;}
 };
 const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)document.querySelectorAll('.navitem').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id));},{rootMargin:'-15% 0px -65% 0px'});
 for(const id of ['overview','laboratory','research','audit'])observer.observe($(id));
 renderResearch();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindResearch);else bindResearch();
window.AEGIS_RESEARCH={analysisSamples,summarizeSamples,runBatchStudy,LINK_LEVELS};
