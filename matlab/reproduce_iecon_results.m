function summary = reproduce_iecon_results(inputCsv, outputCsv)
% AEGIS-UAV scientific replay of the continuous-SNR IECON baseline.
% Geometry and metadata originate from the user-provided MATLAB V5 bundle.
% IMPORTANT: this is a NEW auditing/export helper, NOT the accepted paper's
% original MATLAB generator; NO physical flight data or packet results.
% MATLAB R2021a+ recommended (readtable/writetable).
% Example:
%   reproduce_iecon_results('../data/iecon_model_replay_1806.csv','iecon_rechecked.csv')
if nargin<1 || isempty(inputCsv)
    folder=fileparts(mfilename('fullpath'));
    inputCsv=fullfile(folder,'..','data','iecon_model_replay_1806.csv');
end
if nargin<2 || isempty(outputCsv), outputCsv=fullfile(pwd,'iecon_rechecked.csv');end
T=readtable(inputCsv,'TextType','string');
assert(height(T)==1806,'Expected exactly 1,806 modeled link-position rows');
assert(numel(unique(T.time_s))==301,'Expected 301 modeled time positions');
assert(numel(unique(T.uav))==6,'Expected 6 modeled UAV IDs');
% Published noise-limited AERPAW LTE ground-to-air profile.
Ptx_dBm=10; Gtx_dBi=10; Grx_dBi=2; N_dBm=-90;
f_Hz=3.410e9; B_Hz=1.4e6; baseHeight_m=10;
range_m=sqrt(T.x_m.^2+T.y_m.^2+(T.altitude_m-baseHeight_m).^2);
fspl_dB=20*log10(range_m)+20*log10(f_Hz)-147.55;
snr_continuous_dB=Ptx_dBm+Gtx_dBi+Grx_dBi-fspl_dB-N_dBm;
assert(max(abs(snr_continuous_dB-T.snr_db))<1e-5, ...
    'Mismatch: stored continuous-SNR replay and recalculated link budget');
thresholds_dB=[-6.7,-6.7,5.9,14.1];
service_names={'C2 waypoint','C2 direct stick','Video VLOS','Video N-VLOS'};
per_service=bsxfun(@ge,snr_continuous_dB,thresholds_dB);
uniform=snr_continuous_dB>=14.1;
legacy=ceil(snr_continuous_dB)>=14.1;
assert(sum(uniform)==1562,'Unexpected continuous-SNR baseline count');
assert(sum(legacy)==1581,'Unexpected legacy-rounded baseline count');
assert(all(sum(per_service(:,1:3))==1806),'Unexpected mapped lower-rate counts');
assert(sum(per_service(:,4))==1562,'Strict-service negative control failed');
summary=table(string(service_names'),sum(uniform).*ones(4,1),sum(per_service,1)', ...
    'VariableNames',{'service','uniform_count','mapped_count'});
summary.gain_percentage_points=100*(summary.mapped_count-summary.uniform_count)/height(T);
summary.avoided_rejections=summary.mapped_count-summary.uniform_count;
summary.model_kind=repmat("schematic link model, NOT field data",4,1);
writetable(T,outputCsv);
disp(summary);
fprintf('AEGIS-UAV verified 1,806 positions; continuous uniform=%d, legacy rounded=%d; source is schematic.\n',sum(uniform),sum(legacy));
end
