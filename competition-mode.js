/* AEGIS-UAV — presentation module powered by the existing analytical engine. */
(function(){
'use strict';
function init(){
 if(document.getElementById('aegisCase'))return;
 const anchor=document.querySelector('.dashboard-grid'),snr=document.getElementById('snrMetric');
 if(!anchor||!snr)return;
 const section=document.createElement('section');section.className='aegis-case';section.id='aegisCase';section.setAttribute('aria-label','Demonstração do resultado científico IECON');
 section.innerHTML=`
 <div class="aegis-case-intro">
 <div class="aegis-case-kicker">DEMONSTRAÇÃO GUIADA · IECON 2026</div>
 <h2>Um mesmo enlace.<br><em>Decisões diferentes.</em></h2>
 <p>Compare, sob o mesmo sinal, um limiar uniforme dimensionado pelo serviço mais exigente com a classificação que respeita os requisitos de cada fluxo.</p>
 <div class="aegis-case-actions"><button id="aegisCaseShow" class="aegis-case-primary" type="button">▶ Ver caso MATLAB: D4, 145 s</button><button id="aegisCaseReset" class="aegis-case-secondary" type="button">↺ Restaurar</button></div>
 <div class="aegis-case-source" id="aegisCaseSource">Resultados conectados à análise exibida</div>
 </div>
 <div class="aegis-case-results" aria-live="polite">
 <div class="aegis-case-snr"><span>SNR DO ENLACE</span><strong id="aegisCaseSnr">—</strong><small id="aegisCaseLocation"></small></div>
 <div class="aegis-case-head"><span>SERVIÇO / TAXA</span><span>UNIFORME</span><span>POR SERVIÇO</span></div>
 <div id="aegisCaseMatrix" class="aegis-case-matrix"></div>
 <div id="aegisCaseInsight" class="aegis-case-insight"></div>
 </div>
 <div class="aegis-case-foot">Classificação de admissibilidade de taxa com SNR modelado; a comparação não mede PDR nem latência. Ambas as políticas recebem a mesma qualidade de enlace.</div>
 `;
 anchor.before(section);
 const el=id=>document.getElementById(id);
 function update(){
  if(typeof state==='undefined'||typeof radioLink!=='function'||typeof decide!=='function')return;
  const link=radioLink(state.drone,state.time),rows=decide(link.snrDb);
  if(!Number.isFinite(link.snrDb)||rows.length!==4)return;
  el('aegisCaseSnr').textContent=link.snrDb.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+' dB';
  el('aegisCaseLocation').textContent='UAV '+NAMES[state.drone]+' · '+state.time+' s';
  el('aegisCaseSource').textContent=state.imported?.verified?'Base IECON 2026 · geometria modelada MATLAB':state.imported?'CSV externo · procedência não verificada':'Missão hipotética · propagação calculada';
  const matrix=el('aegisCaseMatrix');matrix.replaceChildren();
  for(const s of rows){
   const line=document.createElement('div');line.className='aegis-case-line';
   const name=document.createElement('div');name.className='aegis-case-service';
   const b=document.createElement('strong');b.textContent=s.name;
   const small=document.createElement('small');small.textContent=(s.rateBps>=1e6?(s.rateBps/1e6)+' Mb/s':(s.rateBps/1000)+' kb/s')+' · '+s.thresholdDb.toLocaleString('pt-BR')+' dB';
   name.append(b,small);
   const baseline=document.createElement('span');baseline.className='aegis-case-chip '+(s.uniform?'is-yes':'is-no');baseline.textContent=s.uniform?'ADMITE':'REJEITA';
   const mapped=document.createElement('span');mapped.className='aegis-case-chip '+(s.mapped?'is-yes':'is-no');mapped.textContent=s.mapped?'ADMITE':'REJEITA';
   line.append(name,baseline,mapped);matrix.append(line);
  }
  const recovered=rows.filter(s=>s.mapped&&!s.uniform).length;
  const insight=el('aegisCaseInsight');insight.className='aegis-case-insight'+(recovered?' is-positive':'');
  insight.textContent=recovered?recovered+' serviços admissíveis pelo critério específico são rejeitados pelo limiar uniforme neste instante — sem mudar o rádio.':'As políticas não divergem neste instante. Explore a trajetória ou abra o caso demonstrativo.';
 }
 el('aegisCaseShow').addEventListener('click',()=>{
  const selector=el('missionSelect');selector.value='4';selector.dispatchEvent(new Event('change',{bubbles:true}));
  for(const [id,val,event] of [['scenarioSelect','0','change'],['droneSelect','3','change'],['timeSlider','145','input'],['marginSlider','0','input'],['deltaSlider','0','input']]){
   const field=el(id);if(field){field.value=val;field.dispatchEvent(new Event(event,{bubbles:true}));}
  }
  const legacy=el('legacyRounding');if(legacy?.checked){legacy.checked=false;legacy.dispatchEvent(new Event('change',{bubbles:true}));}
  update();section.scrollIntoView({behavior:'smooth',block:'center'});
 });
 el('aegisCaseReset').addEventListener('click',()=>{el('resetBtn')?.click();update()});
 let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;update()})}).observe(snr,{childList:true,subtree:true,characterData:true});
 ['missionSelect','scenarioSelect','droneSelect','timeSlider','marginSlider','deltaSlider','legacyRounding'].forEach(id=>{el(id)?.addEventListener('input',update);el(id)?.addEventListener('change',update)});
 requestAnimationFrame(update);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();