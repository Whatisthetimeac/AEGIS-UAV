# AEGIS-UAV — roteiro de apresentação para o Prêmio Inovar APTEL 2026
**Candidatura e demonstração individual:** Ana Clara da Silva Teixeira  
**Pesquisa de origem:** artigo aceito no IECON 2026, com seus respectivos coautores  
**Formato do prêmio:** até 15 minutos de apresentação e 5 minutos de perguntas

> **Mensagem que a banca deve lembrar:** “O AEGIS-UAV não tenta melhorar artificialmente o sinal: ele transforma o mesmo sinal em decisões de comunicação explicáveis, adequadas ao requisito de cada serviço UAV.”

## Pitch executivo de 45 segundos

“Imagine uma operação de inspeção com drones em infraestrutura crítica. O enlace de rádio começa a perder qualidade. Um critério uniforme, configurado pelo vídeo mais exigente, pode classificar toda a comunicação como inadequada, mesmo quando serviços menos exigentes ainda atendem ao requisito de taxa. O AEGIS-UAV transforma essa diferença em decisões explícitas, auditáveis e demonstráveis. Partimos de uma pesquisa aceita no IECON 2026, com 1.806 avaliações modeladas: no cenário principal, a avaliação orientada ao serviço evita 244 rejeições conservadoras **por perfil menos exigente**, diferença de 13,51 pontos percentuais em relação ao controle uniforme. Agora disponibilizamos um painel que reproduz essa evidência, mostra a decisão por serviço e permite analisar outras missões. A proposta é apoiar o planejamento e o diagnóstico técnico de comunicações UAV em setores como energia, telecomunicações e infraestrutura crítica.”

## Uma abertura de 15 segundos

“Em uma missão crítica, quando o vídeo mais exigente deixa de ser admissível, isso significa que todo o enlace deve ser rejeitado? O AEGIS-UAV mostra por que a resposta depende do serviço — e documenta a decisão.”

## Roteiro presencial (aproximadamente 14 minutos, com margem)

| Tempo | Tela ou slide | Mensagem | Evidência |
|---|---|---|---|
| 0:00–1:00 | 1. A pergunta operacional | Serviços UAV possuem requisitos heterogêneos | C2 e vídeos usam perfis diferentes |
| 1:00–2:30 | 2. Por que a decisão uniforme é conservadora | A regra de admissão pode rejeitar fluxos menos exigentes | Mesmo SNR, mesmo orçamento de enlace |
| 2:30–4:00 | 3. Como o AEGIS decide | Requisito → nível de enlace → limiar → decisão | -6,7, 5,9 e 14,1 dB no modelo |
| 4:00–6:30 | 4. Demonstração guiada | Um enlace, quatro serviços, decisões distintas | UAV D4, 145 s, aproximadamente 13,99 dB |
| 6:30–8:30 | 5. Resultado científico | 244 rejeições conservadoras evitadas por perfil menos exigente | 1.806 amostras, 86,49% vs. 100% |
| 8:30–9:30 | 6. Controles científicos | Resultado não é uma manipulação do rádio | Mesmo SNR; controle negativo N-VLOS sem ganho |
| 9:30–11:10 | 7. Potencial de aplicação | Planejamento e diagnóstico em inspeção/monitoramento | Cenários e documentação exportável |
| 11:10–12:30 | 8. Plataforma e auditabilidade | Critério exposto, alterações reproduzíveis, exportações | Painel, CSV, JSON, GeoJSON, scripts MATLAB |
| 12:30–13:35 | 9. Evolução científica | Do modelo ao ensaio físico independente | Validação por voo, rádio medido, PDR e SINR |
| 13:35–14:10 | Encerramento | Valor do projeto: decisão fundamentada por serviço | Relembrar o caso D4 |
| 14:10–15:00 | Margem de segurança | Preparação para imprevistos | Não iniciar outra demonstração longa |

## Fala da demonstração guiada (aproximadamente 2 minutos)

1. “Estou utilizando uma amostra rastreável do modelo MATLAB, não telemetria de um voo real. Selecionei o UAV **D4**, no instante **145 segundos**.”
2. “A qualidade de enlace calculada é de aproximadamente **13,99 dB**. O critério uniforme exige **14,1 dB** para todos os serviços. Por isso, rejeita os quatro.”
3. “Agora mantenho **exatamente o mesmo SNR** e aplico os requisitos individuais. C2 por waypoint e comando direto exigem **-6,7 dB** na abstração; vídeo VLOS exige **5,9 dB**. Esses três passam. O vídeo N-VLOS, com **14,1 dB**, continua rejeitado.”
4. “Essa diferença não representa ganho físico de potência nem melhoria de propagação. Ela demonstra que a decisão de admissão pode respeitar melhor as exigências de cada fluxo.”
5. “No conjunto completo de **1.806 avaliações modeladas**, a diferença foi de **244 rejeições conservadoras evitadas por perfil menos exigente**, ou **13,51 pontos percentuais** no cenário de referência.”
6. “Além da explicação, o painel registra as condições e as decisões, permitindo reproduzir e inspecionar o raciocínio.”

**Ação no site:** tocar em **“Ver caso MATLAB: D4, 145 s”**. Não editar parâmetros aleatórios durante a demonstração. Após explicar os quatro serviços, escolher **margem de implementação** ou **perda adicional** para mostrar como as decisões reagem a condições diferentes, sempre identificadas como estudo de sensibilidade.

## Fechamento persuasivo (40 segundos)

“O setor de infraestrutura crítica precisa de comunicações que sejam compreendidas em termos de missão, e não apenas resumidas por um indicador uniforme. O AEGIS-UAV demonstra, com evidência rastreável, que diferentes serviços podem receber classificações distintas sob as mesmas condições de rádio. A contribuição imediata é um procedimento explicável de avaliação e um demonstrador reproduzível; a contribuição em desenvolvimento é um caminho de integração com medições e validação física. É uma proposta que transforma pesquisa em ferramenta de análise técnica, sem confundir modelagem com resultados de campo.”

## Arguição: perguntas difíceis e respostas defensáveis

**1. “Isso não é uma conclusão óbvia, já que um limiar menor sempre admite mais?”**  
A ordenação das políticas é estrutural; não deve ser vendida como descoberta matemática inédita. O valor demonstrado está na **quantificação rastreável do efeito** para uma geometria modelada, no controle negativo do serviço mais exigente, no registro de parâmetros, na sensibilidade e no protótipo que torna o processo inspecionável. A contribuição aplicada é a rastreabilidade da decisão e a demonstração do efeito em condições específicas.

**2. “Vocês escolheram um baseline fraco para produzir o ganho?”**  
O baseline é **deliberadamente conservador**: usa o limiar do serviço mais exigente para todos, como referência analítica clara. Não afirmamos superioridade universal frente a escalonadores QoS modernos ou toda implementação comercial. A comparação isola o efeito da regra de admissão mantendo o sinal e recursos fixos.

**3. “Então vocês aumentaram a confiabilidade da rede em 13,51%?”**  
Não. O resultado é **+13,51 pontos percentuais de admissibilidade de taxa classificada** no cenário principal para cada perfil menos exigente. Confiabilidade, PDR e latência exigem validação própria.

**4. “As 244 rejeições equivalem a 244 pacotes entregues?”**  
Não. São **244 avaliações de enlace–posição** classificadas diferentemente, **por perfil menos exigente**, no modelo adotado. Não são pacotes, voos independentes ou missões concluídas.

**5. “Por que não simplesmente baixar o requisito do vídeo?”**  
O AEGIS não reduz arbitrariamente requisitos. Ele conserva requisitos distintos para serviços distintos e registra como cada um foi avaliado. O vídeo mais exigente mantém o mesmo limite e funciona como controle negativo.

**6. “Onde entra inteligência artificial?”**  
Esta versão é deliberadamente **determinística e explicável**. Não reivindicamos IA treinada. A contribuição para telecomunicações é um motor de avaliação rastreável, ampliável com dados de missão e validação futura.

**7. “O mapa é real? As posições são voos reais?”**  
A cartografia OpenStreetMap é real como fundo geográfico. A geometria do IECON é modelada em coordenadas locais e apresentada com âncora ilustrativa; as outras missões são cenários de estudo. Não atribuimos geolocalizações reais a voos não realizados.

**8. “Vocês executam MATLAB ao vivo no GitHub Pages?”**  
O Pages é um site estático. Ele **reproduz os dados modelados exportados e realiza cálculos JavaScript**. A execução MATLAB pode ocorrer localmente no ambiente configurado; não deve ser confundida com processamento MATLAB no servidor público.

**9. “O sistema economiza dinheiro?”**  
Pode apoiar **decisões de planejamento mais informadas** e reduzir retrabalho de análise em uma evolução industrial. Ainda não medimos economia financeira; propomos indicadores para avaliação posterior.

**10. “Como validariam em operação?”**  
Com voos independentes, estimativas de SNR/RSSI/PDR alinhadas temporalmente, calibração em treinos e teste em voos reservados. A unidade de replicação para inferência deve ser o **voo**, não a posição amostrada.

**11. “E interferência e redes com múltiplos transmissores?”**  
A base atual isola a regra de admissão sob SNR e propagação modelada. A arquitetura pode incorporar **SINR** e modelagem PHY/MAC posterior. Não extrapolamos o resultado atual para canais limitados por interferência.

**12. “O trabalho é individual se o artigo é coautorado?”**  
A candidatura apresenta o demonstrador desenvolvido e submetido individualmente; a **pesquisa de origem mantém a autoria científica e os créditos dos coautores**. Dados, códigos e materiais externos precisam respeitar as respectivas permissões.

## Frases de impacto seguras para a banca

- “Mesmo sinal. Requisitos diferentes. Decisões explicáveis.”
- “Admissibilidade de taxa contextualizada pela missão.”
- “1.806 avaliações modeladas, com critérios e resultados auditáveis.”
- “244 rejeições conservadoras evitadas por perfil menos exigente no cenário avaliado.”
- “Da pesquisa em MATLAB ao protótipo de apoio à decisão.”

## O que não dizer

- “Garantimos comunicação segura e sem falhas.”
- “Nossa IA aprende em tempo real.”
- “Reduzimos perdas financeiras em 13,51%.”
- “Validamos em campo os quatro cenários.”
- “Todas as redes existentes usam um limiar uniforme.”
- “Nossa técnica melhora fisicamente o sinal.”
- “São 244 pacotes/voos salvos.”
- “O trabalho científico do IECON tem autoria exclusiva.”

## Checklist operacional para o dia 22/10

- Abrir o endereço do site e validar o carregamento do mapa; manter arquivo HTML offline como contingência.
- Conferir se o botão do caso D4 mostra aproximadamente 13,99 dB e **três perfis admitidos apenas pela política por serviço**.
- Preparar captura estática e vídeo curto da demonstração, caso não haja conexão.
- Levar apresentação no template oficial e uma cópia em PDF.
- Concluir tudo em até 14min10s, deixando margem para imprevistos.
- Ter resposta curta para o baseline deliberadamente conservador e para a diferença entre admissibilidade e confiabilidade.
- Confirmar previamente inscrição gratuita e credenciamento para participação presencial.
