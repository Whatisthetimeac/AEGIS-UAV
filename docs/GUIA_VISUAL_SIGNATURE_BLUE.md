# AEGIS-UAV · Manual visual de implementação
**Versão azul, branco e cinza com UAVs em cores pastéis discretas | 16/10/2026**

## Direção estética

Painel de decisão técnica de alto acabamento, com hierarquia de informação precisa. Interface predominantemente azul-marinho, branco e cinza frio. A única exceção cromática proposital são os **seis pontos de UAV e suas respectivas trajetórias**, que usam tons pastéis para rápida identificação visual. Os marcadores nunca devem parecer drones 3D grandes ou ícones agressivos.

## Paleta principal

| Função | Cor | Aplicação |
|---|---|---|
| Fundo | `#08111F` | Navegação e plano geral |
| Superfície | `#12243B` | Cards, painéis e controles |
| Superfície elevada | `#20374F` | Painel em evidência |
| Azul profissional | `#78B7FF` | Foco e dados de destaque |
| Azul-gelo | `#BFE2FF` | Indicadores de estado e waypoints |
| Branco | `#F4F7FB` | Resultados, títulos, métricas |
| Cinza frio | `#B4C0CC` | Metadados e textos auxiliares |
| Cinza-azulado | `#627D99` | Divisórias e elementos de baixo destaque |

## Cores dos UAVs: única exceção cromática

| UAV | Cor suave | Objetivo |
|---|---|---|
| A1 | `#8DE0EE` | Azul-ciano gelo |
| B3 | `#FFD68E` | Pêssego pastel |
| C2 | `#BDA8F2` | Lavanda |
| D4 | `#5CE3D0` | Verde-água suave |
| E5 | `#F3A8B1` | Rosa antigo |
| F6 | `#86B1F6` | Azul celeste |

O UAV selecionado tem halo externo discreto e rótulo curto; os demais ficam com baixa opacidade e rótulo sob interação. Waypoints são **pequenos losangos azul-gelo**, ligados por rota pontilhada. A base é um símbolo de referência diferente dos UAVs. O mapa OpenStreetMap é um fundo cartográfico contextual; não sugere localização medida de voos.

## Hierarquia de tela
1. Cabeçalho direto: problema resolvido, nome da solução, atalho para demonstração.
2. Evidência em destaque: 1.806 avaliações, diferença de +13,51 p.p., 244 rejeições conservadoras evitadas por perfil menos exigente.
3. **Demonstração guiada**: mesma SNR, quatro serviços, duas políticas lado a lado.
4. Mapa de missão: UAVs suaves, trajetórias, base, edição de waypoints e seleção.
5. Análise técnica: SNR, requisitos, margens, políticas, gráfico de comparação, alertas.
6. Rastreabilidade: tabela de auditoria, exportação JSON/CSV/GeoJSON, fontes MATLAB.
7. Estudo multicontexto: resultados dos 20 cenários sintéticos identificados explicitamente como cenários de exploração.

## Critérios de UX
- **Primeira tela significativa:** tudo preenchido; o avaliador entende o caso de uso sem clicar em dezenas de controles.
- **Uma só história:** selecionar aeronave/instante → SNR → requisitos → duas decisões → justificativa.
- **Mobile de verdade:** painéis em uma coluna; nada de horizontalizar o corpo; tabelas podem rolar dentro do próprio componente.
- **Mapa:** câmera mantém os seis UAVs visíveis quando possível, com zoom manual.
- **Acessibilidade:** status deve ser legível por texto, não depender apenas de cor; foco visível; contraste mínimo compatível com leitura.
- **Resiliência:** manter visualização esquemática quando tiles externos falharem.

## Arquivos implementados
- `blue-signature.css`: assinatura azul principal.
- `neutral-finish.css`: branco, cinza e refinamento de contraste.
- `map-refinement.css` + `map-refinement.js`: UAVs suaves, waypoints e base.
- `competition-mode.css` + `competition-mode.js`: caso MATLAB guiado e comparação.
- `index.html`: versão pública autossuficiente mais as camadas visuais.
- `src/`: componentes de desenvolvimento separados.

## Controle de qualidade para futuras mudanças
Ao editar o visual, nunca modificar as fórmulas de admissão ou as contagens de referência. Rodar `python tests/test_iecon_regression.py`, `node --check competition-mode.js` e `node --check map-refinement.js`. Verificar desktop, iPhone e mapa online/fallback. Se cores de status forem parecidas, adicionar texto e ícone ao invés de depender de verde/vermelho.

## O que a banca deve notar
> “O painel conecta uma necessidade concreta de missão ao limiar técnico que fundamenta a decisão, mantendo a análise reproduzível.”

A estética apoia a ciência; não substitui evidência e não deve insinuar telemetria medida de campo.
