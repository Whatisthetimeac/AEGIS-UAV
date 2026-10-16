# Simulação MATLAB e integração local

Os scripts conectam a geometria modelada e o orçamento de enlace ao painel AEGIS-UAV. `aegis_uav_simulate.m` é um gerador sintético para os quatro exercícios de missão. `reproduce_iecon_results.m` recompõe a análise de SNR contínuo sobre a geometria registrada, com contagens verificadas por assertivas. São auxiliares deste repositório, distintos do gerador original do manuscrito.

## Aplicação com execução local

Na raiz do projeto:

```bash
python3 scripts/serve_matlab.py
```

Abra `http://127.0.0.1:8765` e selecione **Executar missão no MATLAB**. O processo exige MATLAB instalado, licenciado e disponível no PATH. Alternativamente, configure a variável `MATLAB_BIN` para o executável da instalação. Python 3 usa somente biblioteca padrão. Recomenda-se MATLAB R2021a ou posterior para `readtable`, `writetable` e tratamento de strings.

O iniciador serve apenas na interface de loopback, aceita missões predefinidas e coordenadas numéricas limitadas, e executa uma chamada fixa com `-batch`. O navegador envia os waypoints editados das missões sintéticas. A referência IECON conserva a geometria de origem. Resultados são importados após a conclusão do processo. O limite de execução é 180 s, com uma execução por vez.

## Uma missão

```matlab
addpath('matlab');
aegis_uav_simulate('power','power.csv');
```

Missões: `power`, `coastal`, `rescue`, `urban`. Um terceiro argumento opcional fornece JSON com `waypoints` (matriz Nx2 em metros locais) e `altitude_m`. Coordenadas do JSON já são finais, sem nova multiplicação de escala.

## Referência IECON

```matlab
addpath('matlab');
summary = reproduce_iecon_results([], 'iecon_rechecked.csv');
```

As assertivas conferem 1.806 registros, seis UAVs, 301 instantes, orçamento de enlace contínuo, contagem 1.562 do controle, 1.581 no diagnóstico arredondado e 1.806 nos três perfis menos exigentes.

## Estudo completo

```matlab
addpath('matlab'); run_aegis_study('aegis_study');
```

Gera cinco CSVs de trajetórias, 80 linhas agregadas de comparação e `provenance.json` com runtime e versão. São 20 condições determinísticas e quatro perfis por condição. O CSV de resultados incluído em `data/` foi gerado em Node.js; uma execução MATLAB deve ser identificada pelo registro produzido no computador que a realizou.

## Importação

Colunas obrigatórias: `uav,time_s,x_m,y_m`. O CSV pode incluir `altitude_m` e `snr_db`. Sem SNR, o painel o calcula pelo orçamento de enlace. As seis séries A1, B3, C2, D4, E5 e F6 devem cobrir 0 a 300 s com tempos únicos e crescentes. O painel interpola para reprodução e usa registros originais na análise agregada. CSV externo é identificado por origem declarada, sem presumir validação de campo.
