function outputFile = aegis_uav_simulate(missionId, outputFile, configFile)
% AEGIS-UAV | reproducible synthetic mission CSV generator for MATLAB.
% This is NEW demonstration code, not the original IECON 2026 generator.
% The coordinate backgrounds of the webpage use OpenStreetMap. The planned
% waypoints below are synthetic and do not describe actual flights.
%
% Example: aegis_uav_simulate('power','aegis_power.csv')
% Required columns for web import: uav,time_s,x_m,y_m.
% The SNR column is derived from the same link-budget assumptions as the paper.
if nargin < 1 || isempty(missionId), missionId = 'power'; end
if nargin < 2 || isempty(outputFile), outputFile = ['aegis_' missionId '_synthetic.csv']; end
switch lower(missionId)
 case 'power'
  W=[-430 -80;-240 120;0 225;250 180;450 30;330 -250;70 -190;-140 -320;-390 -140]; altitude=30;
 case 'coastal'
  W=[-540 -250;-350 30;-130 260;120 300;410 220;520 -80;250 -280;-60 -150]; altitude=50;
 case 'rescue'
  W=[-420 -280;-390 180;-160 260;-160 -190;100 -210;100 250;380 180;400 -270]; altitude=35;
 case 'urban'
  W=[-450 -200;-350 240;-120 250;-100 -220;140 -215;150 230;390 230;430 -210]; altitude=40;
 otherwise
  error('Missao desconhecida: use power, coastal, rescue ou urban');
end
W=W*1.45; % match the larger illustrative corridor radius used in the browser
% Optional local planner configuration: coordinates already in meters, no rescaling.
if nargin >= 3 && ~isempty(configFile)
 cfg=jsondecode(fileread(configFile));
 W=cfg.waypoints; altitude=cfg.altitude_m;
 assert(size(W,2)==2 && size(W,1)>=2 && size(W,1)<=16,'Invalid waypoints');
 assert(all(isfinite(W(:))) && all(abs(W(:))<=10000),'Invalid coordinates');
 assert(isscalar(altitude) && isfinite(altitude) && altitude>=1 && altitude<=2000,'Invalid altitude');
end
fid=fopen(outputFile,'w');if fid<0,error('Nao foi possivel abrir o arquivo');end
cleanup=onCleanup(@()fclose(fid));
fprintf(fid,'uav,time_s,x_m,y_m,altitude_m,snr_db,mission,source\n');
names={'A1','B3','C2','D4','E5','F6'};
freqHz=3.410e9;txDbm=10;txGainDbi=10;rxGainDbi=2;noiseDbm=-90;baseHeightM=10;
for i=0:5
 for t=0:300
   progress=(t/300)*(size(W,1)-1); k=min(floor(progress)+1,size(W,1)-1);
   v=progress-(k-1); blend=v*v*(3-2*v);
   a=W(k,:);b=W(k+1,:);
   offset=(i-2.5)*27; arc=sin(v*pi)*sin(i*1.4+(k-1))*17;
   x=a(1)+(b(1)-a(1))*blend+offset+arc;
   y=a(2)+(b(2)-a(2))*blend+offset*.32-arc*.5;
   r=sqrt(x*x+y*y+(altitude-baseHeightM)^2);
   lossDb=20*log10(max(1,r))+20*log10(freqHz)-147.55;
   snrDb=txDbm+txGainDbi+rxGainDbi-lossDb-noiseDbm;
   fprintf(fid,'%s,%d,%.6f,%.6f,%.2f,%.6f,%s,synthetic_matlab_demo\n',names{i+1},t,x,y,altitude,snrDb,missionId);
 end
end
fprintf('AEGIS-UAV: %s (1,806 synthetic rows, NOT original IECON evidence)\n',outputFile);
end
