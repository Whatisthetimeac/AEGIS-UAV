# AEGIS-UAV — Mission-Aware Link Intelligence

**Dashboard demonstrativo de apoio à decisão sobre admissibilidade de taxa em missões UAV**, preparado para o Prêmio Inovar APTEL 2026.

**[Abrir sistema](https://whatisthetimeac.github.io/AEGIS-UAV/)** · **[Ler artigo técnico](https://whatisthetimeac.github.io/AEGIS-UAV/docs/nota-tecnica.html)** · **[Código-fonte](index.html)**

> O GitHub Pages precisa estar habilitado em **Settings → Pages → Deploy from a branch → main / (root)**. Enquanto não estiver ativo, abra o arquivo `index.html` localmente.

## Funcionalidades implementadas

- Layout escuro e responsivo em desktop e celular, com mapa esquemático e seis trajetórias **sintéticas**;
- cálculo de SNR com orçamento de enlace em espaço livre sob parâmetros científicos do artigo;
- avaliação de quatro perfis: C2 waypoint, C2 comando direto, vídeo VLOS e vídeo N-VLOS;
- comparação entre baseline uniforme conservador e política diferenciada por serviço;
- ajustes de perda, perturbação e margem, animação temporal, alertas sintéticos;
- exportação de auditoria em JSON, CSV instantâneo e CSV para todas as trajetórias;
- resultados do artigo IECON exibidos **separadamente** da simulação ilustrativa do navegador.

## Evidência científica do IECON

A pesquisa *From Uniform Thresholds to Service-Aware Link Admission in UAV Missions: A Reproducible MATLAB Study* (aceita no IECON 2026, pesquisa de coautoria) registrou **1.806** avaliações pareadas. O baseline uniforme aceitou **1.562 (86,49%)** e a classificação por serviço **1.806 (100%)** para três perfis menos exigentes no cenário principal, diferença de **13,51 pontos percentuais** e **244 rejeições conservadoras evitadas por perfil**. O perfil mais exigente N-VLOS não mudou. Os números não foram gerados pelo dashboard público.

## Limitações

Este é um **demonstrador de admissibilidade de taxa**, não uma central de telemetria nem controlador de voo. Nenhum resultado de latência, entrega de pacotes (PDR), confiabilidade, economia econômica ou segurança de voo é reivindicado. Trajetórias de dashboard são sintéticas. O baseline uniforme é intencionalmente conservador.

## Qualidade

A interface foi exercitada em Chromium: cenário inicial SNR **12,17 dB / 3 de 4** perfis, com perda sintética adicional de 10 dB SNR **2,17 dB / 2 de 4** perfis; animação, seleção, margem, reset e exportação JSON operaram sem erros JavaScript. Layout testado a 1440 px e 390 px sem overflow horizontal.

## Publicar site

1. Repositório **Public**;
2. **Settings → Pages**;
3. **Deploy from a branch → main → /(root) → Save**;
4. Aguarde confirmação **Your site is live at...**.

## Autoria

Protótipo de candidatura individual de **Ana Clara da Silva Teixeira**. A pesquisa IECON de base mantém os créditos de seus coautores e a titularidade de dados e códigos preexistentes.
