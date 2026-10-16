# AEGIS-UAV | Mission-Aware Link Intelligence
**Decisões de comunicação explicáveis para missões com drones e infraestrutura crítica.**

O AEGIS-UAV transforma **requisitos de diferentes serviços UAV em decisões de admissibilidade de enlace auditáveis**. Sua principal contribuição é permitir que equipes técnicas avaliem a adequação de cada comunicação — comando e controle ou vídeo — com critérios próprios, em vez de depender exclusivamente de um limiar uniforme dimensionado pelo serviço mais exigente.

[**Acessar plataforma interativa**](https://whatisthetimeac.github.io/AEGIS-UAV/) · [**Ler relatório científico em PDF**](docs/AEGIS_UAV_Relatorio_Tecnico_2026.pdf) · [**Conferir dados e proveniência**](data/iecon_replay_provenance.json)

## Por que importa para a infraestrutura crítica?
Nas missões de inspeção de energia, monitoramento industrial ou resposta a emergências, diferentes fluxos têm necessidades de taxa distintas. O sistema demonstra, com dados de um estudo aceito no **IECON 2026**, que distinguir esses requisitos pode **evitar rejeições conservadoras na classificação de admissibilidade de taxa**, tornando a avaliação operacional mais informativa e rastreável.

## Evidência científica reproduzida
Comparação pareada, sob **a mesma geometria, largura de banda, potência e condições de rádio**, entre um baseline uniforme deliberadamente conservador e uma política de limiares por serviço:

| Indicador verificado — cenário principal IECON | Resultado |
|---|---:|
| Amostras de enlace–posição calculadas | **1.806** |
| Trajetórias modeladas | **6**, com 301 instantes cada |
| Admissibilidade classificada pelo limiar uniforme | **1.562/1.806 (86,49%)** |
| Admissibilidade classificada por serviço — três perfis menos exigentes | **1.806/1.806 (100%)** |
| Diferença de admissibilidade por perfil menos exigente | **+13,51 pontos percentuais** |
| Rejeições conservadoras evitadas **por perfil menos exigente** | **244** |
| Controle negativo, vídeo N-VLOS mais exigente | **0,00 p.p.**, como previsto |
| Controle de auditoria — arredondamento legado | **1.581/1.806 (87,54%)**, distinto do método contínuo revisado |

**O que isso demonstra:** no cenário e modelo estudados, a avaliação orientada ao serviço classifica corretamente como admissíveis pela *taxa* 244 amostras adicionais **em cada perfil menos exigente**, preservando o mesmo critério para o serviço mais exigente. A diferença é efeito da regra de decisão; não houve alteração nos recursos de rádio.

## O que a plataforma entrega hoje
- **Painel de missão** com mapa OpenStreetMap, seis aeronaves modeladas e representação temporal de trajetórias.
- **Motor de decisão auditável** com requisitos de C2, vídeo VLOS e vídeo N-VLOS; limiares de −6,7, 5,9 e 14,1 dB.
- **Reprodução do cenário científico IECON:** dados MATLAB com SNR contínuo, comparações e diagnóstico de arredondamento.
- **Quatro missões adicionais de estudo** para inspeção de infraestrutura, monitoramento costeiro, busca e resposta e mapeamento urbano, com cenários geográficos e trajetórias sintéticas claramente identificados.
- **Análises interativas** de margem, deslocamento de limiar, perda adicional, instante e aeronave.
- **Planejamento e integração de dados:** waypoints editáveis, importação CSV, saída GeoJSON, registros JSON/CSV, gráficos e trilha de auditoria.
- **Base extensível:** scripts MATLAB, registros de proveniência e dados que facilitam novas simulações e futura comparação com traços medidos.

## Como demonstrar à banca (2 minutos)
1. Abrir o **cenário IECON 2026**, com 1.806 avaliações modeladas, e selecionar um UAV.
2. Mostrar os quatro perfis de serviço, a SNR modelada e as **duas decisões sob condições idênticas**.
3. Ajustar a **margem de implementação** ou a **perda adicional**; observar atualizações sincronizadas em mapa, curvas, alertas e tabela de auditoria.
4. Comparar o efeito do **limiar uniforme** com o **limiar por serviço** e explicar o resultado reproduzido: **+13,51 p.p.** para os perfis menos exigentes na análise principal.
5. Exportar o registro técnico e trocar para um cenário de infraestrutura crítica para demonstrar a extensibilidade.

## Reproduzir e inspecionar
A raiz possui um `index.html` autossuficiente; o código modular está em [`src/`](src/). O cenário principal usa [`data/iecon_model_replay_1806.csv`](data/iecon_model_replay_1806.csv), com rastreabilidade em [`data/iecon_replay_provenance.json`](data/iecon_replay_provenance.json).

O script [`matlab/reproduce_iecon_results.m`](matlab/reproduce_iecon_results.m) implementa a reanálise. Consulte também [`matlab/README.md`](matlab/README.md) e [o relatório técnico](docs/AEGIS_UAV_Relatorio_Tecnico_2026.pdf). A plataforma web processa dados gerados pelo MATLAB; não depende de um servidor MATLAB em execução.

## Aplicabilidade e evolução
O protótipo apoia a **análise e o planejamento de comunicação** para operações com UAVs em linhas de transmissão, ativos industriais, infraestrutura urbana e resposta a emergências. A arquitetura foi organizada para evoluir de dados modelados a séries observadas, avaliação com SINR e, posteriormente, validação em ensaios físicos independentes.

## Escopo científico e responsabilidade
Os **resultados demonstrados são de admissibilidade de taxa sob uma abstração SNR–eficiência espectral**, com geometria modelada e baseline uniforme conservador. São distintos de medições de entrega de pacotes, latência, confiabilidade, economia financeira ou segurança de voo. O OpenStreetMap é uma **base cartográfica real**, mas as rotas e posições apresentadas são **modeladas/sintéticas**, não trajetórias físicas georreferenciadas. A importação de CSV permite estudo externo sem garantir por si só sua proveniência.

A pesquisa IECON 2026 é **coautorada**. Esta demonstração para o Prêmio Inovar APTEL 2026 é apresentada por **Ana Clara da Silva Teixeira**, preservando os créditos do estudo de origem.

**Cartografia:** © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). O uso de códigos/dados de terceiros está sujeito às respectivas licenças e autorizações.
