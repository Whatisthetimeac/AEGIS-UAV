# AEGIS-UAV | Mission-aware Link Admission

**Ferramenta pública de demonstração científica para avaliação auditável de admissibilidade de taxa em missões UAV.**

[**Abrir o dashboard**](https://whatisthetimeac.github.io/AEGIS-UAV/) · [**Ler artigo técnico (PDF)**](docs/AEGIS_UAV_Relatorio_Tecnico_2026.pdf) · [**Ler proveniência dos dados**](data/iecon_replay_provenance.json)

## O que funciona

- Visualização de **1.806 avaliações modeladas** de seis UAVs, com 301 instantes e valores de SNR contínuo reconciliados com a versão revisada do IECON 2026.
- Comparação de duas políticas: controle uniforme (14,1 dB para todos) e limiares por serviço (`-6,7`, `5,9` e `14,1 dB`).
- Alternância opcional do **arredondamento legado** para explicar a diferença entre **1.562** e **1.581** posições classificadas como admissíveis pelo controle uniforme.
- Quatro cenários *hipotéticos*: inspeção, monitoramento costeiro, busca/resposta e mapeamento urbano, cada um com geometria sintética distinta.
- Fundo cartográfico OpenStreetMap quando a conexão permite; waypoint e trajetória do estudo **não são geolocalizações de voo físico**.
- Edição de waypoints de planejamento, comparação, importação CSV, reprodução temporal, gráfico SNR e exportações GeoJSON, JSON e CSV.

## A evidência principal

| Métrica do cenário principal IECON | Resultado |
|---|---:|
| Avaliações pareadas modeladas | 1.806 |
| Uniforme, SNR contínuo, 14,1 dB | 1.562 / 1.806 = 86,49% |
| Política por serviço em três perfis menos exigentes | 1.806 / 1.806 = 100,00% |
| Diferença em cada perfil menos exigente | +13,51 p.p. |
| Rejeições conservadoras evitadas **por perfil** | 244 |
| Uniforme com arredondamento legado | 1.581 / 1.806 = 87,54% |
| Serviço mais exigente: diferença entre políticas | 0 p.p. |

Os números **não** demonstram PDR, latência, confiabilidade, sucesso de missão, economia econômica ou segurança de voo. O baseline uniforme é deliberadamente conservador e não representa todo sistema de QoS do mercado.

## Executar sem instalar

A raiz possui um `index.html` autossuficiente (estilos, lógica e dados primários incorporados). Basta abri-lo no navegador. A pasta `src/` mantém os arquivos separados de desenvolvimento. O mapa pode exigir conexão externa.

## MATLAB e reprodutibilidade

Acesse [`matlab/README.md`](matlab/README.md) para reproduzir no MATLAB os 1.806 pontos modelados do pacote fornecido e para gerar quatro missões sintéticas independentes. O GitHub Pages **não** executa MATLAB; os resultados do script são exportados e consumidos pelo navegador.

Arquivos principais:

- [`data/iecon_model_replay_1806.csv`](data/iecon_model_replay_1806.csv): coordenadas locais e SNR contínuo modelado.
- [`data/iecon_replay_provenance.json`](data/iecon_replay_provenance.json): origem, SHA-256 e limitações.
- [`matlab/reproduce_iecon_results.m`](matlab/reproduce_iecon_results.m): auditoria das decisões e do arredondamento, proposta para execução local.
- [`src/`](src/): HTML, CSS, JavaScript e tabela embutida de replay.
- [`docs/AEGIS_UAV_Relatorio_Tecnico_2026.pdf`](docs/AEGIS_UAV_Relatorio_Tecnico_2026.pdf): nota científica detalhada.

## Limitações e ética científica

Conjunto de dados **modelado/sintético**; sem georreferenciamento real dos voos, medidas de SNR em campo, interferência calibrada, MAC, latência, PDR ou conformidade aeronáutica comprovada. Importar CSV não prova procedência externa. Autor(a) do demonstrador de competição: Ana Clara da Silva Teixeira. **O artigo IECON de origem é coautorado e seus créditos não são substituídos por este protótipo.**

## Licenças e atribuição

Cartografia: © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). O dataset derivado contém somente geometria e cálculo de enlace do pacote fornecido pela equipe, sem geolocalização de campo. Reutilização de código preexistente, dados externos e direito autoral do manuscrito sujeito às respectivas autorizações.
