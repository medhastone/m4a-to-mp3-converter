const fs = require('fs');

const ptJson = JSON.parse(fs.readFileSync('messages/pt.json', 'utf8'));

ptJson.acx_article = {
  "h2_barrier": "A Barreira de Submissão do ACX: Por Que os Audiolivros Falham",
  "p_barrier_1": "Como engenheiro principal de masterização de áudio e treinador de locução, pré-masterizei centenas de audiolivros destinados a ACX, Audible e Findaway Voices.",
  "p_barrier_2": "A realidade frustrante para muitos autores independentes e narradores é que até 30% dos audiolivros autonarrados são rejeitados durante as verificações automatizadas de garantia de qualidade (QA) do ACX.",
  "p_barrier_3": "Essas rejeições raramente acontecem por causa de um mau desempenho. Elas ocorrem devido a rígidos requisitos técnicos em torno da medição da potência acústica.",
  "p_barrier_4": "Picos plosivos repentinos, noise gates agressivos que produzem lacunas de silêncio morto não naturais, posicionamento errático do microfone afetando o RMS e corte impróprio do ruído ambiente de cabeça/cauda são os principais culpados.",
  "p_barrier_5": "Tradicionalmente, os narradores contavam com instalações de desktop ou configurações complexas do plugin Audacity Nyquist para executar uma verificação do ACX.",
  "p_barrier_6": "Este analisador de conformidade do ACX online no navegador resolve esse problema. Ele serve como uma solução instantânea e sem upload para testar capítulos de audiolivros em relação aos requisitos oficiais do Audible ACX gratuitamente, economizando horas de frustração.",
  
  "h2_verify": "Como Verificar o seu Audiolivro em 3 Passos",
  "step1_title": "01. Ingerir Áudio do Capítulo",
  "step1_desc": "Solte seu capítulo finalizado. Oferecemos suporte a todos os principais formatos, incluindo MP3, WAV, FLAC e M4A.",
  "step2_title": "02. Análise DSP em Tempo Real",
  "step2_desc": "O mecanismo Web Audio analisa Pico, RMS, Ruído de Fundo, Ruído Ambiente, Desvio DC e Fator de Crista.",
  "step3_title": "03. Revisão e Exportação",
  "step3_desc": "Verifique o painel interativo de Aprovado/Reprovado e baixe o PDF do relatório de teste de áudio do ACX.",
  
  "h2_matrix": "Matriz Oficial de Conformidade Padrão do ACX",
  "matrix_desc": "Para passar pelos robôs de Garantia de Qualidade do Audible, seus arquivos MP3 ou WAV exportados devem aderir estritamente aos seguintes limites acústicos:",
  "matrix_th_metric": "Métrica Acústica",
  "matrix_th_acx": "Requisito Oficial do ACX",
  "matrix_th_why": "Por que é importante",
  "matrix_rms": "RMS (Volume Médio)",
  "matrix_rms_val": "Entre -23 dB e -18 dB",
  "matrix_rms_why": "Garante um volume de audição consistente em todos os capítulos.",
  "matrix_peak": "Pico Verdadeiro / Pico Máximo",
  "matrix_peak_val": "Menor que -3.0 dBFS",
  "matrix_peak_why": "Evita distorção digital e clipping quando codificado para MP3.",
  "matrix_noise": "Ruído de Fundo (Ruído Ambiente)",
  "matrix_noise_val": "Menor que -60 dB RMS",
  "matrix_noise_why": "Garante que não haja chiado de fundo audível ou zumbido AC.",
  "matrix_sample": "Taxa de Amostragem e Resolução",
  "matrix_sample_val": "44.1 kHz, 16-bit (Mínimo)",
  "matrix_sample_why": "Padrão da indústria para narração e distribuição de audiolivros.",
  
  "h2_guide": "Guia de Remediação Detalhado: Corrigindo as 4 Falhas Mais Comuns do ACX",
  "h3_peak": "1. Como Corrigir Falhas de Pico (> -3.0 dB)",
  "p_peak": "Se a sua amplitude de pico exceder -3,0 dBFS, seu audiolivro falhará instantaneamente. A melhor correção é usar um limitador True Peak brickwall bem no final da sua cadeia de masterização. Defina o teto para -3,1 dB para fornecer uma pequena margem de segurança contra excessos de codificação MP3 e deixe o limitador capturar os plosivos perdidos e as expressões vocais altas.",
  
  "h3_rms": "2. Como Corrigir Falhas de RMS (< -23 dB ou > -18 dB)",
  "p_rms": "Se o seu áudio estiver muito baixo ou muito alto, você precisa entender como corrigir os níveis rms para o Audible. RMS é uma média. Se você simplesmente aumentar o volume (ganho), seus picos provavelmente excederão -3,0 dB. A solução é uma compressão ótica ou VCA suave. Use uma proporção de 2:1 ou 3:1, um ataque em torno de 30 ms e uma liberação de 100 ms. Comprima o vocal suavemente e, em seguida, use o ganho de maquiagem para elevar o RMS geral ao ponto ideal de -20,5 dB.",
  
  "h3_noise": "3. Como Corrigir Falhas de Ruído de Fundo (> -60 dB)",
  "p_noise_1": "Quer saber como consertar o piso de ruído acx muito alto online? Primeiro, entenda o algoritmo RMS de janela deslizante de 500ms usado para calcular o ruído ambiente. O ACX exige que o ruído em repouso esteja em ou abaixo de -60 dB RMS. A diferença entre o ruído ambiente da sala (o som natural da sua cabine) e o chiado do pré-amplificador é crítica.",
  "p_noise_2": "Não use noise gates agressivos que silenciam completamente o áudio entre as palavras. Isso cria \"silêncio digital\" (-∞ dB), que os bots automatizados do ACX sinalizam como um erro. Em vez disso, use uma subtração espectral suave (plugins de remoção de ruído) para reduzir suavemente o ruído de fundo do ambiente para -60db, mantendo o som natural.",
  
  "h3_room": "4. Como Corrigir Erros de Ruído Ambiente no Início e Fim",
  "p_room": "Você deve deixar de 0,5 a 1 segundo de ruído ambiente natural no início do capítulo e de 1 a 5 segundos no final. Se você executar uma verificação do tom da sala principal do acx e falhar, geralmente significa que você cortou o áudio diretamente na primeira sílaba, ou você destacou o início e pressionou \"Delete\", deixando um silêncio digital puro. Sempre cole o ruído ambiente gravado nessas lacunas, nunca o silêncio artificial.",
  
  "h2_vs": "Analisador de Áudio Web no Navegador vs. Plugin Audacity Nyquist",
  "p_vs": "Embora muitos narradores procurem a melhor ferramenta gratuita para verificar o áudio do audiolivro antes do upload para o acx, a rota tradicional envolvia a instalação do Audacity e o download do antigo plugin ACX-Check.ny. Veja como a nossa ferramenta web moderna se compara como uma alternativa online à verificação acx do audacity.",
  "vs_th_feature": "Recurso / Capacidade de Diagnóstico",
  "vs_th_our": "Nosso Verificador ACX no Navegador",
  "vs_th_trad": "Plugin Audacity ACX-Check.ny Tradicional",
  "vs_install": "Instalação / Configuração",
  "vs_install_our": "Nenhuma (Carregamento Instantâneo)",
  "vs_install_trad": "Requer software e instalação manual do plugin",
  "vs_cross": "Compatibilidade Multiplataforma",
  "vs_cross_our": "Mac, Windows, iOS, Android, ChromeOS",
  "vs_cross_trad": "Apenas Mac, Windows, Linux",
  "vs_pdf": "Exportação Instantânea de PDF",
  "vs_pdf_our": "Sim, gera relatórios profissionais",
  "vs_pdf_trad": "Não",
  "vs_dc": "Diagnóstico de Desvio DC e Ruído Ambiente",
  "vs_dc_our": "Sim",
  "vs_dc_trad": "Limitado",
  "vs_priv": "Privacidade e Zero Uploads",
  "vs_priv_our": "Processamento 100% Local em RAM",
  "vs_priv_trad": "Processamento 100% Local de Desktop",
  
  "h2_pdf": "Qualidade de Áudio e Relatórios para Clientes: O Recurso de Inspeção PDF",
  "p_pdf_1": "Se você é um engenheiro de som freelancer, treinador de locução ou narrador entregando arquivos a um editor, confiança e provas são essenciais. Quando você executa nosso verificador de áudio qa do audible online, pode fazer o download instantâneo do pdf do relatório de teste de áudio do acx.",
  "p_pdf_2": "Este certificado para download serve como prova de prontidão de áudio. Você pode enviar este relatório detalhado diretamente para seus autores independentes e editores junto com os arquivos WAV ou MP3 finalizados. Isso prova que os capítulos foram rigorosamente verificados e têm a garantia de passar pelas verificações automatizadas do ACX sem rejeições.",
  
  "h2_faq": "Perguntas Frequentes",
  "faq_q1": "Por que o ACX exige que os níveis de pico permaneçam abaixo de -3.0 dBFS em vez de 0 dB?",
  "faq_a1": "Os arquivos de audiolivro são compactados em formatos como MP3 para distribuição. O processo de codificação geralmente causa pequenas alterações na amplitude conhecidas como \"inter-sample peaking\". Definir um pico máximo de -3,0 dBFS garante que, mesmo após uma compressão agressiva de MP3, o áudio nunca atingirá 0 dB (corte digital) e não distorcerá nos fones de ouvido do ouvinte.",
  "faq_q2": "Como posso verificar meus capítulos de audiolivro para conformidade com o ACX sem instalar o Audacity?",
  "faq_a2": "Você pode usar esta ferramenta online gratuita de verificação do ACX. Ela roda inteiramente dentro do seu navegador da web usando a Web Audio API. Basta arrastar e soltar seu arquivo de áudio na zona de lançamento para verificar instantaneamente o RMS, o Pico e o Piso de Ruído sem precisar aprender a passar na verificação do acx sem o audacity usando um software de desktop complicado.",
  "faq_q3": "Qual é a diferença entre RMS e LUFS para a produção de audiolivros ACX?",
  "faq_a3": "RMS (Root Mean Square) mede a média matemática bruta da energia de áudio elétrico ao longo do tempo. O LUFS (Loudness Units relative to Full Scale) incorpora um filtro de audição humana (a curva ponderada K) para medir o volume percebido. Embora a TV e o podcasting usem LUFS (-16 a -23 LUFS), o Audible ACX requer estritamente RMS (-23 a -18 dB RMS). O uso de medidores LUFS para ACX pode resultar em falhas de envios.",
  "faq_q4": "Por que o silêncio digital artificial falha no teste de ruído de fundo do ACX?",
  "faq_a4": "As verificações automatizadas de controle de qualidade do ACX buscam uma experiência auditiva natural e coesa. Se você usar um noise gate pesado ou deletar o áudio entre as frases, o ruído de fundo cairá para o infinito negativo (-∞ dB). Essa mudança abrupta entre o som ambiente natural e o silêncio total soa defeituoso e causa distração, provocando uma rejeição instantânea. Você deve sempre usar um som ambiente natural (cerca de -60 dB) para preencher as lacunas.",
  "faq_q5": "As minhas gravações de áudio e arquivos de narração são carregados para um servidor externo?",
  "faq_a5": "Não. Ao testar a qualidade do áudio do audiolivro gratuitamente usando nossa ferramenta, 100% da análise acontece localmente na RAM do seu dispositivo. Nenhum byte é carregado para a nuvem, garantindo total privacidade e segurança legal para arquivos de audiolivros NDA não lançados."
};

fs.writeFileSync('messages/pt.json', JSON.stringify(ptJson, null, 2));
console.log('Added acx_article to pt.json');
