# AEGIS-UAV — Roteiro de demonstração e defesa APTEL 2026

## Mensagem principal (20 segundos)
**A questão não é simplesmente “o drone tem sinal?”: é “para quais serviços esse sinal atende ao requisito de taxa?”** Em inspeção de infraestrutura crítica, comando e vídeo podem exigir capacidades diferentes. O AEGIS-UAV torna essa decisão explícita, calculável e auditável.

## Demonstração ao vivo (até 3 minutos)
1. **20 s — problema:** a tela compara o limiar uniforme conservador e os limiares específicos de quatro perfis UAV. O mesmo canal e o mesmo sinal são utilizados nas duas colunas.
2. **60 s — evidência concreta:** clique em **“Ver caso MATLAB: D4, 145 s”**. A simulação IECON mostra **SNR ≈ 13,99 dB**. O limiar uniforme **14,1 dB** rejeita os quatro perfis; a avaliação específica admite C2 waypoint, C2 direct-stick e vídeo VLOS, mas mantém N-VLOS rejeitado. Essa é uma linha real da **base modelada** usada no estudo, não uma medição de voo.
3. **40 s — resultado agregado:** no cenário principal revisado, há **1.806 avaliações pareadas**; a política uniforme classifica **1.562 (86,49%)** como admissíveis por taxa e a específica **1.806 (100%)** nos três perfis menos exigentes: **244 rejeições conservadoras evitadas por perfil** e **+13,51 p.p.**. O perfil mais exigente não muda por construção.
4. **30 s — explicabilidade:** altere margem e perda; mostre como a classificação reage e exporte o registro de auditoria. O sistema não modifica a propagação para favorecer uma política.
5. **30 s — aplicação e futuro:** alterne para a missão hipotética de inspeção. Explique o encadeamento de requisitos, posições, SNR, decisões por fluxo e o caminho técnico para teste com registros medidos.

## As cinco perguntas difíceis da banca

**1. “QoS por serviço já existe. O que há de novo?”**

A novidade *não* é inventar QoS nem afirmar superioridade universal. A contribuição é a cadeia **requisitos padronizados → níveis rastreáveis da abstração rádio → decisão por serviço → auditoria sob cenários e sensibilidade**, comparada de forma controlada ao baseline uniforme expressamente conservador. O produto organiza essa evidência em uma ferramenta inspecionável de planejamento.

**2. “O resultado de 100% prova confiabilidade?”**

Não. **100% significa apenas que todas as 1.806 posições modeladas ultrapassaram os limiares de admissibilidade de taxa dos três perfis menos exigentes naquele cenário.** Para comprovar latência, PDR ou confiabilidade, seriam necessários ensaios específicos e amostras adequadas.

**3. “Por que 244? Foi 244 para toda a rede?”**

São **244 rejeições evitadas em cada um dos três perfis menos exigentes** na comparação pareada; as 1.806 observações são posições temporais correlacionadas de seis trajetórias de uma missão. Não são 1.806 voos independentes e não se deve somar esses 244 como se fossem 732 transmissões reais recuperadas.

**4. “O mapa e os drones são reais?”**

A cartografia OpenStreetMap é real; coordenadas locais dos estudos, waypoints e trajetórias de demonstração são **modelados ou sintéticos**. Os resultados IECON vêm de dados MATLAB reproduzidos. O sistema não afirma ter medido SNR em voo nem recebido telemetria de aeronaves.

**5. “Onde estão os ganhos econômicos e de segurança?”**

O benefício demonstrado é **reduzir rejeições conservadoras na classificação de taxa**, preservando a decisão do perfil mais exigente. Ganho de custo, tempo de missão, disponibilidade real e segurança são **hipóteses de aplicação a validar**; o AEGIS-UAV oferece um instrumento para estudá-las, não um valor financeiro medido.

## Comparação legítima
**Baseline:** limiar uniforme definido pelo serviço mais exigente; não representa todo sistema QoS existente.

**Proposta:** limiar específico por perfil, sob a *mesma* SNR, geometria, potência e banda.

**Contribuição técnica verificável:** decisão de admissibilidade rastreável e controlada; não melhora a potência, banda nem canal.

## Como encerrar (15 segundos)
“Não afirmamos que todos os enlaces passam a funcionar melhor. Demonstramos que requisitos diferentes devem produzir decisões diferentes. O AEGIS-UAV torna isso reproduzível, auditável e pronto para futuras validações em infraestrutura crítica.”

## Referências e materiais
- **Base científica:** *From Uniform Thresholds to Service-Aware Link Admission in UAV Missions: A Reproducible MATLAB Study*, IECON 2026, aceito (artigo com coautoria).
- [Executar o sistema](https://whatisthetimeac.github.io/AEGIS-UAV/)
- [Dados modelados](../data/iecon_model_replay_1806.csv)
- [Teste de regressão](../tests/test_iecon_regression.py)
- [Relatório técnico](AEGIS_UAV_Relatorio_Tecnico_2026.pdf)
