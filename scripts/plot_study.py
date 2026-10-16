"""Regenerate a publication-friendly figure from recorded model outputs."""
from pathlib import Path
import csv
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
root=Path(__file__).resolve().parents[1]
rows=list(csv.DictReader((root/'data/study_20_scenarios.csv').open()))
missions=['iecon','power','coastal','rescue','urban'];labels=['Referência IECON','Inspeção de infraestrutura','Monitoramento costeiro','Busca e resposta','Mapeamento urbano']
fig,axes=plt.subplots(1,2,figsize=(12,4.8),layout='constrained')
fig.patch.set_facecolor('#f6f8f3')
for ax in axes:ax.set_facecolor('#f6f8f3')
for ax,field,title in zip(axes,['gain_pp','mapped_pct'],['Diferença de admissibilidade (p.p.)','Admissibilidade por serviço (%)']):
 data=np.array([[float(next(r for r in rows if r['mission']==m and r['loss_db']==str(loss) and r['service']=='vlos')[field]) for loss in [0,3,6,10]] for m in missions])
 ax.imshow(data,cmap='Greens',vmin=0,vmax=100,aspect='auto')
 for i in range(5):
  for j in range(4):ax.text(j,i,f'{data[i,j]:.1f}',ha='center',va='center',color='white' if data[i,j]>60 else '#183c25',fontsize=11)
 ax.set_xticks(range(4),['0 dB','3 dB','6 dB','10 dB']);ax.set_yticks(range(5),labels if ax==axes[0] else [])
 ax.set_xlabel('Perda adicional determinística');ax.set_title(title,fontsize=12,pad=14)
 for spine in ax.spines.values():spine.set_visible(False)
fig.suptitle('AEGIS-UAV · vídeo VLOS em 20 condições modeladas',fontsize=16,color='#173c28')
fig.supxlabel('1.806 amostras por condição · margem e perturbação nulas · comparações pareadas · dados sintéticos correlacionados',fontsize=9,color='#4b6352')
folder=root/'docs/figures';folder.mkdir(exist_ok=True)
fig.savefig(folder/'study_vlos.svg',metadata={'Date':None})
print(folder/'study_vlos.svg')
