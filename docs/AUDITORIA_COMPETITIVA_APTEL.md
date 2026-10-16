# Auditoria técnica competitiva | AEGIS-UAV / APTEL 2026

**Data:** 16/10/2026  
**Natureza:** revisão interna exigente; não é avaliação oficial da banca.

## Diagnóstico

O AEGIS-UAV apresenta uma contribuição científica defensável e um protótipo reproduzível, mas disputa com projetos que podem ter implantação industrial comprovada. A estratégia correta é **mostrar decisão por serviço com evidência concreta**, não atribuir ao estudo economia, confiabilidade ou segurança em voo que não foram medidas.

## Fatos que o sistema pode defender

| Evidência | Prova/referência |
|---|---|
| 1.806 amostras modeladas (6 UAVs × 301 posições) | CSV, script MATLAB e regressão automatizada |
| 1.562 amostras (86,49%) acima do limiar uniforme 14,1 dB | Reanálise de SNR contínuo |
| 1.806 (100%) acima dos limiares dos três serviços menos exigentes | Reanálise sob mesmas condições rádio |
| +13,51 pontos percentuais e 244 rejeições evitadas **por perfil** | Diferença pareada sob baseline conservador |
| Serviço N-VLOS mais exigente sem diferença | Controle negativo por construção |
| D4/145s: 13,990980 dB, 0/4 uniforme e 3/4 específico | Linha modelada de dados + modo guiado |
| Arredondamento legado 1.581/1.806 | Comparação de diagnóstico, não resultado principal |

## Avaliação pelos critérios APTEL

**Inovação:** contribuição rastreável de engenharia, não invenção da QoS por serviço. Precisa ser descrita com esse limite explícito para evitar objeções de estado da técnica.

**Clareza:** a apresentação ao avaliador antes exigia localizar manualmente um ponto na curva; foi acrescentado um quadro guiado com a amostra modelada D4/145 s e quatro decisões lado a lado.

**Viabilidade:** HTML funcional de apoio à decisão, regras determinísticas de admissibilidade, exportação de registros e scripts MATLAB fornecem uma cadeia plausível de engenharia.

**Impacto operacional:** possibilidade de preservar a avaliação diferenciada de controle e vídeo em missões de infraestrutura crítica. Os resultados quantificam **admissibilidade de taxa modelada**, não economia financeira, disponibilidade operacional ou segurança em campo.

**Escalabilidade:** separar serviço, requisitos, abstração de link e classificador permite adaptação a outras missões; cada novo tipo de rádio exigirá parâmetros apropriados e validação.

## Correções já implementadas

1. Destaque inicial de resultados IECON e do ganho corretamente limitado.
2. Paleta navy / verde-água, marcadores de UAV delicados e waypoints diferenciados.
3. Modo guiado do exemplo de decisão divergente, com atualização sincronizada dos controles.
4. Teste independente de regressão sobre o CSV IECON, inclusive arredondamento legado e seis trajetórias.
5. Roteiro de arguição e respostas às perguntas metodológicas mais difíceis.

## Fragilidades que não devem ser ocultadas

- O ganho comparado é relativo a um **baseline uniforme propositalmente conservador**; produtos QoS maduros já tratam classes de tráfego.
- A avaliação principal usa geometria esquemática e posições temporais correlacionadas, não voos independentes.
- O mapa OpenStreetMap contextualiza visualmente missões, não representa caminho físico georreferenciado.
- Não há estudo de campo ou economia quantificada; alegá-los seria indevido.

## Critério de sucesso para a apresentação

A banca deve conseguir responder, após três minutos, **qual decisão melhora, por que melhora, qual evidência sustenta a alegação e onde existe aplicação realista**.

**Próxima validação substantiva:** ensaio independente com traços medidos (RSSI/SNR/SINR), identificação do enlace, métricas reais de pacote e comparação entre políticas com recursos idênticos. Uma demonstração mais bonita ajuda, mas não substitui essa evidência.
