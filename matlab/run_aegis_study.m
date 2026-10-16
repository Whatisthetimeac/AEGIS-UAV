function summary = run_aegis_study(outputDirectory)
% Run four synthetic missions plus the IECON replay in the actual MATLAB runtime.
% 20 deterministic conditions x 4 service profiles. No independent trials implied.
if nargin<1,outputDirectory=fullfile(pwd,'aegis_study');end
if ~exist(outputDirectory,'dir'),mkdir(outputDirectory);end
missions={'power','coastal','rescue','urban','iecon'};
services={'waypoint','direct','vlos','nvlos'};thresholds=[-6.7 -6.7 5.9 14.1];
rows=cell(80,10);row=0;
for m=1:numel(missions)
 file=fullfile(outputDirectory,[missions{m} '.csv']);
 if strcmp(missions{m},'iecon'),reproduce_iecon_results([],file);
 else,aegis_uav_simulate(missions{m},file);end
 T=readtable(file);n=height(T);
 for loss=[0 3 6 10]
  snr=T.snr_db-loss;uniform=sum(snr>=14.1);
  for s=1:4
   row=row+1;mapped=sum(snr>=thresholds(s));
   rows(row,:)={missions{m},loss,services{s},n,uniform,mapped,100*uniform/n,100*mapped/n,100*(mapped-uniform)/n,mapped-uniform};
  end
 end
end
summary=cell2table(rows,'VariableNames',{'mission','loss_db','service','n','uniform','mapped','uniform_pct','mapped_pct','gain_pp','avoided'});
writetable(summary,fullfile(outputDirectory,'summary.csv'));
fid=fopen(fullfile(outputDirectory,'provenance.json'),'w');guard=onCleanup(@()fclose(fid));
meta=struct('engine','MATLAB','version',version,'generated_at',datestr(now,30),'model','deterministic FSPL','independent_flights',false,'conditions',20,'profiles',4);
fprintf(fid,'%s',jsonencode(meta));disp(summary);
end
