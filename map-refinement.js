/* AEGIS-UAV delicate map markers + matching SVG fallback. Does not change link math. */
(function(){
function aircraftIcon(i){return L.divIcon({className:'aegis-div-icon',iconSize:[18,18],iconAnchor:[9,9],html:'<span class="aegis-aircraft" style="--aircraft-color:'+COLORS[i]+'"><span class="aegis-aircraft-halo"></span><span class="aegis-aircraft-core"></span><span class="aegis-aircraft-name">'+NAMES[i]+'</span></span>'})}
function waypointIcon(j){return L.divIcon({className:'aegis-div-icon',iconSize:[14,14],iconAnchor:[7,7],html:'<span class="aegis-waypoint"><span class="aegis-waypoint-diamond"></span><span class="aegis-waypoint-index">'+(j+1)+'</span></span>'})}
function stationIcon(){return L.divIcon({className:'aegis-div-icon',iconSize:[18,18],iconAnchor:[9,9],html:'<span class="aegis-station"><span class="aegis-station-cross"></span><span class="aegis-station-label">BASE</span></span>'})}
updateMapMission=function(){
 if(!leaflet)return;
 const {map,trails,wpLayer,base,plannedRoute}=leaflet;
 map.setView(mission().center,14,{animate:false});base.setLatLng(toLatLng(0,0));wpLayer.clearLayers();
 const route=mission().id==='iecon'?[]:mission().waypoints.map(([x,y])=>toLatLng(x,y));
 plannedRoute.setLatLngs(route);
 for(let j=0;j<route.length;j++)L.marker(route[j],{icon:waypointIcon(j),keyboard:true}).bindTooltip('Waypoint '+(j+1)+' · planejamento simulado',{direction:'top',offset:[0,-8]}).addTo(wpLayer);
 for(let i=0;i<6;i++)trails[i].setLatLngs(pathPts(i).map(([x,y])=>toLatLng(x,y)));
};
initLeaflet=function(){
 if(typeof L==='undefined'){document.getElementById('mapAttr').textContent='Mapa online indisponível · vista esquemática';return false}
 try{
  const map=L.map('liveMap',{zoomControl:false,attributionControl:true,scrollWheelZoom:false,preferCanvas:true}).setView(mission().center,14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{minZoom:11,maxZoom:18,attribution:'© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>',crossOrigin:true}).addTo(map);
  const wpLayer=L.layerGroup().addTo(map);
  const plannedRoute=L.polyline([],{color:'#a6d0f7',weight:1.25,opacity:.66,dashArray:'3 6',lineCap:'round'}).addTo(map);
  const base=L.marker(mission().center,{icon:stationIcon(),keyboard:true}).addTo(map).bindTooltip('Estação-base do modelo');
  const trails=[],dots=[];
  for(let i=0;i<6;i++){
   trails.push(L.polyline([],{color:COLORS[i],weight:1.25,opacity:.45,dashArray:'4 6',lineCap:'round'}).addTo(map));
   const mark=L.marker(mission().center,{icon:aircraftIcon(i),keyboard:true,zIndexOffset:i===state.drone?100:0}).addTo(map);
   mark.bindTooltip('UAV '+NAMES[i]+' · posição calculada',{direction:'top',offset:[0,-9]});
   mark.on('click',()=>setSelected(i));dots.push(mark);
  }
  map.on('click',e=>{
   if(!state.editing)return;
   if(mission().id==='iecon'){toast('Edite waypoints nas missões de planejamento, não na reprodução IECON');return}
   const [x,y]=latLngToXY(e.latlng.lat,e.latlng.lng);
   if(mission().waypoints.length>=16){toast('Máximo de 16 waypoints');return}
   mission().waypoints.push([Math.round(x),Math.round(y)]);updateMapMission();render();toast('Waypoint de planejamento adicionado');
  });
  leaflet={map,trails,dots,wpLayer,base,plannedRoute};updateMapMission();
  $('liveMap').parentElement.classList.add('has-leaflet');
  $('mapAttr').textContent='© OpenStreetMap · trajetórias modeladas';
  setTimeout(()=>map.invalidateSize(),400);return true
 }catch(e){console.warn('Mapa OSM indisponível',e);return false}
};
drawMap=function(){
 if(leaflet){for(let i=0;i<6;i++){
  const p=position(i,state.time),selected=i===state.drone;
  leaflet.dots[i].setLatLng(toLatLng(p.x,p.y));leaflet.dots[i].setZIndexOffset(selected?200:0);
  const link=radioLink(i,state.time),accepted=decide(link.snrDb).filter(item=>item.mapped).length;
  leaflet.dots[i].setTooltipContent('UAV '+NAMES[i]+' · SNR '+number(link.snrDb,2)+' dB · '+accepted+'/4 serviços admissíveis');
  const node=leaflet.dots[i].getElement();
  if(node){node.classList.toggle('is-selected',selected);node.setAttribute('aria-label','UAV '+NAMES[i])}
  leaflet.trails[i].setStyle({weight:selected?2:1.2,opacity:selected?.9:.4,dashArray:selected?null:'4 6'});
 }}else drawFallbackPositions();
 const chips=$('droneChips');chips.replaceChildren();
 for(let i=0;i<6;i++){const b=document.createElement('button');b.className='dronechip'+(i===state.drone?' selected':'');b.textContent='UAV '+NAMES[i];b.setAttribute('aria-pressed',String(i===state.drone));b.appendChild(document.createElement('i'));b.onclick=()=>setSelected(i);chips.appendChild(b)}
};
drawFallbackPositions=function(){
 const ov=$('fallbackOverlay');if(!ov)return;ov.replaceChildren();
 const ref=xyToSvg({x:0,y:0});
 ov.appendChild(svg('circle',{cx:ref.x,cy:ref.y,r:10,fill:'none',stroke:'#a8cbf0','stroke-width':.9,opacity:.5}));
 ov.appendChild(svg('rect',{x:ref.x-4,y:ref.y-4,width:8,height:8,transform:'rotate(45 '+ref.x+' '+ref.y+')',fill:'#a7ccef',stroke:'#233745','stroke-width':1}));
 const base=svg('text',{x:ref.x+10,y:ref.y-9,fill:'#d5e9ff','font-size':10});base.textContent='BASE';ov.appendChild(base);
 if(mission().id!=='iecon'){
  const points=mission().waypoints.map(([x,y])=>xyToSvg({x,y}));
  ov.appendChild(svg('polyline',{points:points.map(p=>p.x+','+p.y).join(' '),fill:'none',stroke:'#9fc4e9','stroke-width':1.15,'stroke-dasharray':'3 6',opacity:.65}));
  points.forEach((p,j)=>{
   ov.appendChild(svg('rect',{x:p.x-3.5,y:p.y-3.5,width:7,height:7,rx:1,transform:'rotate(45 '+p.x+' '+p.y+')',fill:'#b5d7fa',stroke:'#1a3140','stroke-width':1}));
   if(j<9){const label=svg('text',{x:p.x+8,y:p.y-8,fill:'#d2e9ff','font-size':9});label.textContent=String(j+1);ov.appendChild(label)}
  });
 }
 for(let i=0;i<6;i++){
  const points=pathPts(i).map(([x,y])=>xyToSvg({x,y}));
  ov.appendChild(svg('polyline',{points:points.map(p=>p.x+','+p.y).join(' '),fill:'none',stroke:COLORS[i],'stroke-width':i===state.drone?2:1.1,opacity:i===state.drone?.88:.42,'stroke-dasharray':i===state.drone?'':'3 5'}));
  const p=xyToSvg(position(i,state.time));
  if(i===state.drone)ov.appendChild(svg('circle',{cx:p.x,cy:p.y,r:10,fill:'none',stroke:COLORS[i],'stroke-width':.85,opacity:.5}));
  const dot=svg('circle',{cx:p.x,cy:p.y,r:i===state.drone?5:3.7,fill:COLORS[i],stroke:'#dff9f5','stroke-width':1,style:'cursor:pointer'});
  dot.addEventListener('click',()=>setSelected(i));ov.appendChild(dot);
  if(i===state.drone){const label=svg('text',{x:p.x+10,y:p.y-9,fill:'#eaf5ff','font-size':10,'font-weight':600,'paint-order':'stroke',stroke:'#122636','stroke-width':2.5});label.textContent='UAV '+NAMES[i];ov.appendChild(label)}
 }
};

// If a mobile webview blocks the first Leaflet CDN, try a second CDN.
// The scientific dashboard remains operational if neither map library loads.
window.addEventListener('load',()=>{
 setTimeout(()=>{
  if(typeof L!=='undefined' || leaflet)return;
  const alternateCss=document.createElement('link');alternateCss.rel='stylesheet';
  alternateCss.href='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
  document.head.appendChild(alternateCss);
  const alternate=document.createElement('script');
  alternate.src='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
  alternate.onload=()=>{if(!leaflet && typeof L!=='undefined'){initLeaflet();render()}};
  alternate.onerror=()=>console.info('Leaflet indisponível; mantendo mapa esquemático');
  document.head.appendChild(alternate);
 },1800);
},{once:true});
})();