# AEGIS-UAV — Auditoria científica, competitiva e funcional
**Edição: 16 de outubro de 2026 | Prêmio Inovar APTEL 2026**  
**Natureza deste documento:** avaliação interna exigente. Não é parecer da APTEL nem previsão de premiação.

## Veredito em uma página

O AEGIS-UAV é **um protótipo de pesquisa relevante e apresentável à banca**, com rastreabilidade e dados modelados. É mais forte como solução explicável para apoio à análise de comunicações UAV do que como promessa de controle operacional implantado.

A principal barreira para ganhar não é mais apenas o visual: é demonstrar que a ideia **vai além da constatação matemática de que um limiar menor aprova mais casos**. A apresentação deve entregar um **fluxo útil de engenharia**, com regras transparentes, resultado de referência auditado, casos de aplicação e um plano concreto de evolução industrial.

Não existe base para atribuir uma probabilidade confiável de vitória. A competição depende das demais candidaturas, critérios subjetivos, arguição e execução presencial.

## Matriz de avaliação interna

Notas orientativas (0 = ausente; 5 = muito forte). **Não são notas oficiais da banca**, nem medições científicas.

| Dimensão | Avaliação interna | Diagnóstico |
|---|---:|---|
| Aderência a telecomunicações e infraestrutura crítica | **4,5/5** | Enlaces UAV e inspeção são diretamente pertinentes |
| Reprodutibilidade numérica modelada | **4,0/5** | 1.806 registros, controles de arredondamento e script MATLAB |
| Clareza visual e demonstração | **3,5/5** | Novo painel azul e caso guiado; falta testar end-to-end em dispositivos externos |
| Aplicabilidade técnica no estágio atual | **3,0/5** | Apoio à análise de taxa; integração a rádio real ainda futura |
| Inovação diferencial | **3,0/5** | Limiar por serviço não é novidade universal; força está na explicabilidade/rastreabilidade/aplicação |
| Evidência de ganho operacional em campo | **1,0/5** | Ainda não há voos medidos, PDR, latência nem benefício econômico observado |
| Defesa da banca | **3,0/5** | Narrativa preparada; ensaio cronometrado e arguição adversarial ainda pendentes |

## O que temos de mais forte — com prova

1. **Mesmo enlace, decisões diferentes:** o caso IECON demonstra como limites associados a serviços diferentes alteram a classificação, sem alterar a SNR física.
2. **Evidência replicável:** seis trajetórias modeladas com 301 instantes cada (**1.806 avaliações pareadas**).
3. **Baseline conservador:** 1.562/1.806 (86,49%) decisões admissíveis para o limiar uniforme de 14,1 dB no cenário principal.
4. **Perfis menos exigentes:** 1.806/1.806 (100%) no cenário de referência; **+13,51 p.p. e 244 rejeições conservadoras evitadas por perfil**.
5. **Controle negativo:** o perfil mais exigente mantém o mesmo critério, sem ganho artificial na comparação.
6. **Demonstração funcional:** mapear requisito → limiar → comparação lado a lado → justificação → registro/exportação.
7. **Procedência:** a diferença entre 1.562 contínuo e 1.581 por arredondamento legado está descrita em código/dados.

## As objeções realmente perigosas

### [CRÍTICA] “Limiar por serviço é óbvio. Onde está a inovação?”

A relação entre limiar baixo e mais decisões de admissão é consequência direta da regra; não a anuncie como descoberta matemática. Mostre a **aplicação estruturada, audível e reproduzível**: requisitos heterogêneos, diagnóstico específico por fluxo, parametrização, rastreabilidade e transferência da pesquisa para ferramenta de exploração. Seria melhor ainda comparar, futuramente, com um escalonador QoS não trivial.

**Ação:** abrir a apresentação com o caso D4, não com a equação. Explicar o resultado, depois a regra e os limites do baseline.

### [CRÍTICA] “As 244 rejeições não significam 244 entregas reais.”

Correto: são avaliações modeladas de enlace–posição, por perfil. Não converta em pacotes, voos ou economia comprovada.

**Ação:** manter exatamente a unidade e a dependência entre amostras; não calcular intervalos de confiança tratando 1.806 posições correlacionadas como replicações independentes.

### [ALTA] “O mapa é de verdade, mas o voo aconteceu?”

A cartografia OpenStreetMap é real; as trajetórias, geometrias e waypoints não são medições georreferenciadas de voos reais. No cenário IECON, uma âncora ilustrativa permite a exibição no mapa.

**Ação:** usar rótulo curto “Geometria modelada | fundo OSM” próximo ao mapa e declaração detalhada em documentação, sem esconder os limites.

### [ALTA] “O sistema está implantado em redes críticas?”

Não há implantação operacional comprovada. A aplicação atual é **avaliação explicável e planejamento**, demonstrada em modelos e séries MATLAB.

**Ação:** falar em valor potencial na análise técnica, triagem e documentação; propor piloto controlado para comprovar utilidade industrial.

### [ALTA] “O AEGIS-UAV tem IA?”

O motor atual é determinístico. “Inteligente” descreve a lógica de avaliação, não um classificador treinado. Não categorizar como IA treinada em texto de inscrição.

### [MÉDIA] “Como o usuário acessa o serviço?”

O site GitHub Pages é estático: processa os dados modelados e a lógica no navegador. MATLAB é ferramenta de simulação e reanálise local, com exportação de resultados. O serviço precisa abrir nos computadores externos com dependências cartográficas acessíveis.

**Ação:** validar o Pages em rede móvel e em computador diferente; gravar demonstração offline como contingência.

### [MÉDIA] “Quem é autor?”

A candidatura do protótipo pode ser individual, mas o IECON científico de origem tem coautoria; preservar créditos, licenças, resultados e possíveis responsabilidades institucionais.

## Auditoria visual e UX (azul / branco / cinza)

- [x] Paleta principal em azul-marinho, branco e cinza.
- [x] Exceção cromática intencional: UAVs e trajetórias em seis pastéis distintos.
- [x] Marcadores pequenos, rótulo só no foco, waypoints azul-gelo.
- [x] Resultados científicos destacados antes dos detalhes avançados.
- [x] Caso guiado reproduzível por botão.
- [x] Gráficos e interface com contraste reforçado em CSS.
- [ ] Verificação independente do GitHub Pages em iOS Safari / Android Chrome / computador externo.
- [ ] Capturas de todas as seções após carregamento de tiles reais.
- [ ] Validação de contraste com ferramenta de acessibilidade e navegação somente por teclado.
- [ ] Confirmar que cache do GitHub Pages entregou os arquivos CSS mais recentes.

## Auditoria funcional e científica

- [x] Dados base de 1.806 avaliações fornecidos em CSV.
- [x] Reprodução aritmética de 1.562 contínuo vs. 1.581 arredondado no script de regressão.
- [x] Contagens de 244 rejeições por perfil menos exigente, mantendo o mesmo SNR.
- [x] Controle negativo do N-VLOS.
- [x] Cenários adicionais identificados como sintéticos.
- [x] Importação de CSV e exportações no código.
- [ ] Teste de ponta a ponta em navegador externo sob conectividade restrita.
- [ ] Validação numérica cruzada por execução independente do MATLAB atual.
- [ ] Teste de regressão visual automatizado com capturas móveis e desktop em CI.
- [ ] Comparação com políticas QoS mais representativas e análise de sensibilidade estatística por missão.

## Ordem recomendada para maximizar desempenho no prêmio

**Hoje (antes de encerrar a inscrição):**
1. Verificar se o formulário recebeu a candidatura integral e o PDF correto; **não esperar uma nova versão do mapa** para inscrever.
2. Abrir o site publicamente em outro aparelho/rede e executar o caso guiado **D4 aos 145 s**.
3. Preservar uma demonstração offline (HTML) e captura de tela em caso de falha do mapa.
4. Apresentar os benefícios com unidades científicas corretas e diferenciar a candidatura individual da autoria do IECON.

**Antes da apresentação (até 22 de outubro de 2026):**
5. Criar no template APTEL uma apresentação de 10–12 slides, até 14 minutos.
6. Ensaiar a fala com cronômetro e simular perguntas adversariais.
7. Preparar uma tabela “valor industrial → indicador mensurável futuro”: redução do tempo de análise, precisão de triagem, PDR, latência, escalabilidade. Não apresentar metas como resultados atuais.
8. Confirmar acesso, cadastro, credenciamento e o link do PDF para a banca.

**Depois do prêmio, para transformar em pesquisa aplicada:**
9. Coletar telemetria em testes autorizados, separar treino/calibração e validação.
10. Adicionar SINR, interferência, MAC e diferentes tráfegos/mission profiles.
11. Usar múltiplos voos e cenários independentes como unidades de análise.
12. Comparar custo computacional, explicabilidade e métricas de comunicação versus políticas existentes e baseline conservador.

## Critérios de aprovação de uma release

Uma nova release só deve ser apresentada como estável quando passar:
- **Correção científica:** testes de contagem, ordenação dos limiares e coerência aritmética.
- **Correção funcional:** os controles alteram números e gráficos ligados ao mesmo estado.
- **Correção cartográfica:** mapa real carrega ou fallback legível aparece, sem mascarar origem sintética das rotas.
- **Correção visual:** dados legíveis em 390 px e 1440 px, mapa não dominado pelos marcadores, tabelas navegáveis.
- **Correção de narrativa:** nenhuma frase confunde admissibilidade com QoS, ganho monetário ou telemetria real.

## A frase mais importante da defesa

> “O AEGIS-UAV mostra que uma mesma condição de enlace não deve ser interpretada como uma única resposta para todos os serviços. A contribuição que demonstramos é uma avaliação rastreável, orientada a requisitos de missão, com resultados modelados reproduzíveis e caminho de validação aplicável à infraestrutura crítica.”

**Conclusão da auditoria:** o projeto é **apresentável e defensável**, mas a vitória não pode ser prometida. Os maiores ganhos adicionais estão no rigor da comparação com alternativas reais de QoS, em uma demonstração sem falhas e na capacidade de justificar o valor de engenharia em cinco minutos de perguntas.
