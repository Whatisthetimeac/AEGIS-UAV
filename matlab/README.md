# Execução MATLAB e modelo científico

## Reproduzir a geometria do artigo IECON

A pasta `data/iecon_model_replay_1806.csv` contém os 1.806 pontos **modelados** obtidos do pacote MATLAB fornecido pela pesquisadora. A série foi produzida ao recalcular SNR contínuo a partir de `scenario_B_ground_links.csv` (sem arredondar potência recebida), conferindo os **1.562** pontos admissíveis no controle uniforme. A mesma geometria com arredondamento antigo teria **1.581**. Isso reproduz os resultados reportados, mas **não é validação externa de rádio ou voo físico**.

No MATLAB, a partir da raiz deste repositório:

```matlab
addpath('matlab');
reproduce_iecon_results();
```

O script audita as 1.806 amostras, compara o SNR recalculado com o CSV e verifica as quatro políticas. Foi revisado estaticamente e sua aritmética foi reproduzida em Python; **não foi executado numa instalação MATLAB neste ambiente**.

## Quatro missões novas e sintéticas

```matlab
addpath('matlab');
aegis_uav_simulate('power', 'aegis_power.csv');
aegis_uav_simulate('coastal', 'aegis_coastal.csv');
aegis_uav_simulate('rescue', 'aegis_rescue.csv');
aegis_uav_simulate('urban', 'aegis_urban.csv');
```

Importe os CSVs no painel para visualizar suas trajetórias. O programa está hospedado no GitHub Pages (HTML/JavaScript): **não é um servidor MATLAB**, não executa MATLAB na nuvem e não controla veículos. O navegador avalia a regra usando o SNR exportado pelo modelo. Para processamento em servidor MATLAB, seria necessário implementar e hospedar backend específico.

## Geografia

OpenStreetMap é somente um mapa real como **camada de referência cartográfica**. Os pontos de cenário são sintéticos e o conjunto IECON não tem coordenadas geográficas de voo. Sua projeção sobre uma âncora do Rio é *didática*, não um dado georreferenciado de missão.
