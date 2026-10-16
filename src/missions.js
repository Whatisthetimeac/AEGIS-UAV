/* Planned waypoints are synthetic coordinates in local ENU meters relative to an approximate map anchor.
   The OpenStreetMap background is real geographic cartography; these are NOT actual flight tracks. */
'use strict';
const MISSION_PRESETS = [
 {id:'power', name:'Inspeção de infraestrutura · Rio', area:'Zona Norte, Rio de Janeiro', center:[-22.8868,-43.2635], altitudeM:30, description:'Exercício hipotético de inspeção de infraestrutura, sem atribuir equipamentos ou linhas reais ao mapa.', waypoints:[[-430,-80],[-240,120],[0,225],[250,180],[450,30],[330,-250],[70,-190],[-140,-320],[-390,-140]], accent:'#bbdfff'},
 {id:'coastal',name:'Monitoramento costeiro · Guanabara',area:'Baía de Guanabara, Rio de Janeiro',center:[-22.9138,-43.1510],altitudeM:50,description:'Varredura demonstrativa sobre ambiente costeiro; trajetórias planejadas, não voos autorizados.',waypoints:[[-540,-250],[-350,30],[-130,260],[120,300],[410,220],[520,-80],[250,-280],[-60,-150]],accent:'#8fc8ff'},
 {id:'rescue',name:'Busca e resposta · Niterói',area:'Niterói, Rio de Janeiro',center:[-22.8932,-43.1094],altitudeM:35,description:'Exercício hipotético de busca e resposta. Não representa operação de emergência real.',waypoints:[[-420,-280],[-390,180],[-160,260],[-160,-190],[100,-210],[100,250],[380,180],[400,-270]],accent:'#a4c8eb'},
 {id:'urban',name:'Mapeamento urbano · São Gonçalo',area:'São Gonçalo, Rio de Janeiro',center:[-22.8317,-43.0638],altitudeM:40,description:'Missão modelada de aquisição de imagens e controle. Não representa autorização ou execução de voo.',waypoints:[[-450,-200],[-350,240],[-120,250],[-100,-220],[140,-215],[150,230],[390,230],[430,-210]],accent:'#7da9da'},
 {id:'iecon',name:'IECON · geometria esquemática MATLAB',area:'Modelo sem geolocalização real',center:[-22.8868,-43.2635],altitudeM:30,description:'Reprodução da geometria MATLAB (1.806 registros). Coordenadas XY sem georreferência de voo, projetadas artificialmente sobre Rio apenas para navegação do painel.',waypoints:[[-250,-150],[-160,210],[60,280],[290,180],[290,-130],[-100,-200]],accent:'#bbdfff'}
];

/* Increase illustrative route radius to exercise both admission policies. */
for (const m of MISSION_PRESETS) m.waypoints=m.waypoints.map(([x,y])=>[x*1.45,y*1.45]);
