# AEGIS-UAV

**Mission-aware UAV Link Admission — interactive decision-support demonstrator**

[**Abrir plataforma (GitHub Pages)**](https://whatisthetimeac.github.io/AEGIS-UAV/) — o site fica disponível somente após configurar **Settings → Pages → Deploy from a branch → main / (root)**.

Base científica: *From Uniform Thresholds to Service-Aware Link Admission in UAV Missions: A Reproducible MATLAB Study* (artigo aceito no IECON 2026).

## Executar
Abra [index.html](index.html) diretamente no navegador, sem instalar dependências.

## O que o demonstrador faz
- Compara limiar uniforme conservador e limiares específicos de quatro serviços (C2 waypoint, C2 direto, vídeo VLOS e N-VLOS).
- Calcula a admissibilidade de taxa conforme SNR, deslocamento de limiar e margem de implementação.
- Exibe análises e rastreabilidade de decisões, sem comandar aeronaves.
- Destaca resultados experimentais *publicados no artigo*, distintos de cenários ilustrativos do painel.

## Evidências reportadas no artigo
- 1.806 avaliações pareadas de enlace-posição.
- Uniforme: 1.562/1.806 = 86,49% das amostras classificadas como admissíveis.
- Para três serviços menos exigentes: política por serviço 1.806/1.806 = 100%, diferença +13,51 pontos percentuais, 244 rejeições conservadoras evitadas **por perfil**.
- Vídeo N-VLOS (serviço mais exigente): sem diferença entre políticas por construção.
- Seis trajetórias correlacionadas, com análise de sensibilidade a perturbações e perdas adicionais.

## Fundamento matemático
Nível por serviço: `k_s = min {k: B η_k ≥ r_s}`.
- Por serviço: `A_map(i,s) = 1[γ_i ≥ τ_(k_s) + δ + m]`.
- Uniforme: `A_uni(i,s) = 1[γ_i ≥ max_s τ_(k_s) + δ + m]`.

## Limitações
A pesquisa quantifica **admissibilidade de taxa** sob uma abstração SNR→eficiência espectral e um baseline deliberadamente conservador. **Não comprova** taxa de entrega de pacotes, latência, confiabilidade, economia monetária, segurança de voo ou sucesso operacional. Os cenários interativos não são telemetria ao vivo e o site não é um controlador de aeronaves.

## Créditos
Protótipo de candidatura ao Prêmio Inovar APTEL 2026 por Ana Clara da Silva Teixeira, derivado de pesquisa IECON com seus respectivos coautores. A autoria científica e os direitos sobre código/dados pré-existentes devem ser preservados.
