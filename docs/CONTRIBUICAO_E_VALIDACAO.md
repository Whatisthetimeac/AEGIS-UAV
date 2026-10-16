# AEGIS-UAV: contribuição, método e validação

## Objeto e utilidade

O AEGIS-UAV permite inspecionar a relação entre requisito de serviço e decisão de admissibilidade de taxa em missões UAV. Seu uso atual é apoiar análise, comparação e documentação técnica de políticas. O sistema responde quais perfis satisfazem o critério registrado, sob as mesmas condições de sinal, e como a conclusão varia com trajetória, margem e perda adicional.

A contribuição aplicada reúne três capacidades: **decisão explicável por serviço**, **experimentação pareada reproduzível** e **conexão entre simulação e exploração visual**. O diferencial científico defendido é a rastreabilidade e o isolamento do efeito da regra de admissão. A desigualdade entre políticas com limiares ordenados é uma propriedade matemática; a análise quantifica sua magnitude e dependência das hipóteses. A interface materializa esse método, sem constituir por si só uma nova teoria de controle de enlace.

## Formulação

Para um serviço com taxa nominal r e banda B, a eficiência requerida é r/B. A tabela publicada fornece pares de eficiência e limiar SNR. Seleciona-se o menor nível cuja eficiência vezes a banda atende à taxa.

| Perfil | Taxa nominal | Nível | Limiar |
|---|---:|---:|---:|
| C2 waypoint | 800 bit/s | 1 | −6,7 dB |
| C2 direct-stick | 4.800 bit/s | 1 | −6,7 dB |
| Vídeo VLOS | 2 Mbit/s | 7 | 5,9 dB |
| Vídeo N-VLOS | 4 Mbit/s | 11 | 14,1 dB |

A política por serviço admite quando SNR ≥ limiar individual + margem + perturbação. O controle uniforme aplica 14,1 dB + margem + perturbação a todos. A comparação usa o mesmo SNR e os mesmos recursos. O maior requisito é o controle negativo: ambas as regras devem coincidir.

Os perfis são avaliados separadamente. Admitir quatro perfis individualmente não demonstra a capacidade de transportá-los simultaneamente com agregação de carga, escalonamento e overhead. As taxas C2 são conversões de payload e intervalo de mensagem do perfil padronizado. Níveis de latência e confiabilidade exigem experimentos próprios.

## Modelo de sinal

Parâmetros de referência: frequência 3,410 GHz, banda 1,4 MHz, potência 10 dBm, ganhos de antena 10 e 2 dBi, potência de ruído −90 dBm e altura da base 10 m. A referência IECON usa altura de UAV 30 m. Os exercícios de missão registram suas próprias alturas.

A perda em espaço livre é 20 log10(d) + 20 log10(f) − 147,55, com distância em metros e frequência em hertz. O SNR contínuo resulta do orçamento de enlace subtraído do ruído. A perda adicional é um estressor determinístico, aplicado igualmente às duas políticas. Não é inferida de prédios ou materiais do mapa.

O arredondamento legado fica disponível como diagnóstico. A análise primária utiliza SNR contínuo, pois amostras próximas de um limiar podem trocar de classe quando arredondadas.

## Dados e execução

A referência contém 1.806 amostras, seis trajetórias e 301 instantes. O arquivo de proveniência registra origem e checksum. A verificação recomputa SNR a partir de coordenadas e altura, independentemente da coluna armazenada. O teste exige 1.562 admissões uniformes, 1.806 para os três perfis menos exigentes e 1.562 para N-VLOS. O diagnóstico arredondado admite 1.581.

A aplicação usa a base modelada já registrada e cálculos JavaScript. O estudo exportado em `data/study_20_scenarios.csv` foi executado em Node.js com o mesmo motor da aplicação. MATLAB não foi executado para gerar esse arquivo. Scripts MATLAB permitem reproduzir a referência e gerar o estudo no runtime do usuário; cada execução do script de lote escreve sua versão e proveniência.

CSV externo exige seis séries identificadas, tempos estritamente crescentes de 0 a 300 s, coordenadas e altitude válidas. Importações incompletas são recusadas mantendo o estado anterior, evitando misturar origem externa e trajetórias geradas. A reprodução interpola as séries; a análise agregada usa apenas os registros originais. A proveniência de um arquivo externo não é inferida de seu nome ou de seus valores.

## Desenho do estudo

| Dimensão | Valores |
|---|---|
| Geometria | Referência IECON e quatro missões sintéticas |
| Perda adicional | 0, 3, 6 e 10 dB |
| Serviços | Quatro perfis avaliados separadamente |
| Condições pareadas | 20 |
| Amostras por condição | 1.806 |
| Avaliações de enlace-posição | 36.120 |
| Registros agregados por condição e serviço | 80 |

As 36.120 avaliações reutilizam geometrias em diferentes condições; não são 36.120 experimentos independentes. O painel também cruza sete perturbações (−1, −0,5, −0,25, 0, 0,25, 0,5, 1 dB) com quatro margens (0, 1, 2, 3 dB). A decomposição por trajetória reporta mínimo, mediana e máximo descritivos. Não são estimados p-valores ou intervalos de confiança a partir de posições autocorrelacionadas como se fossem ensaios independentes.

São relatadas conjuntamente admissibilidade absoluta e diferença em pontos percentuais. Quando ambas as políticas rejeitam um serviço, a diferença pode ser zero; quando a diferenciação amplia a admissão, isso continua a ser uma conclusão de classificação sob o modelo. Resultados nulos fazem parte do estudo.

## Critérios de integridade

1. Mesma amostra, geometria e parâmetros em cada par de políticas.
2. Controle negativo N-VLOS com diferença nula.
3. Perda adicional crescente não aumenta a admissibilidade absoluta.
4. Contagens preservadas na reconstrução da base.
5. Referência do artigo identificada separadamente dos cenários exploratórios.
6. Mapas e símbolos usados para comunicar geografia e trajetórias, sem converter cartografia em medição de propagação.

## Evolução experimental

**Etapa 1: rastreabilidade computacional.** Executar os scripts no MATLAB instalado, guardar versão, parâmetros, resultados e checksums. Comparar o CSV MATLAB ao motor web por amostra e por decisão, inclusive fronteiras dos limiares.

**Etapa 2: validação externa do canal.** Selecionar uma base de voos medidos com licença e documentação. Separar por voo ou campanha os conjuntos de calibração e avaliação. Conferir frequência, banda, potência, ganhos, referência de ruído e geometria. Reportar erro de SNR e concordância de decisão por serviço, incluindo falsos aceites e falsas rejeições relativos ao critério escolhido. O teste exige uma referência de verdade explicitamente definida, não apenas concordância com outro modelo.

**Etapa 3: rede e tráfego.** Introduzir SINR, carga simultânea, overhead, MAC, filas e protocolos. Avaliar PDR, atraso, jitter e capacidade sob o mesmo orçamento de recursos. Comparar a controles que já diferenciam QoS, além do controle uniforme conservador.

**Etapa 4: resultado de missão.** Vincular interrupções e entrega de informação a uma tarefa mensurável, como conclusão de inspeção ou qualidade de aquisição. Fixar previamente o critério de sucesso. Realizar repetições independentes e dimensionar amostra com base no desfecho e na variabilidade, antes de usar inferência estatística.

Essas etapas permitem passar de consistência da classificação a utilidade operacional medida, preservando continuidade de dados e critérios.

## Fontes

- Manuscrito de base: *From Uniform Thresholds to Service-Aware Link Admission in UAV Missions: A Reproducible MATLAB Study*, IECON 2026, autoria compartilhada.
- 3GPP TS 22.125 V19.2.0, perfis padronizados conforme rastreados no manuscrito; os valores SNR não são atribuídos à 3GPP.
- Tabela SNR–eficiência de 15 níveis do framework de referência, conforme a auditoria de código descrita no estudo.
- `data/iecon_replay_provenance.json`, origem e checksum da geometria.
- `data/study_provenance.json`, ambiente de geração do estudo multicontexto.
- OpenStreetMap contributors, base cartográfica e atribuição em cada mapa online.
