const recipes = [
    {
        id: "r1",
        nome: "Bolo de Requeijão",
        ingrediente: "3 ovos\n1 copo de requeijão (250g)\n2 xícaras de chá de açúcar\n1/2 xícara de chá de óleo\n1 pacote de coco ralado (100gr)\n2 xícaras de chá de farinha de trigo\n1 colher de sopa de fermento em pó",
        preparo: "Em uma batedeira, bata todos os ingredientes até incorporar bem.\nPasse para uma forma de furo central untada e enfarinhada e leve ao forno pré-aquecido em temperatura média por cerca de 40 minutos.\nEspere amornar e desenforme.",
        sabor: "d"
    },
    {
        id: "r2",
        nome: "Quibe Assado",
        ingrediente: "800g de carne moída\n500g de trigo para quibe\n3 dentes de alhos amassados\n2 cebolas picadinhas\n1 a 2 tomates picados sem sementes\nCebolinha e cheiro verde a gosto\nhortelã picadinho a gosto\nSal e pimenta do reino a gosto\n3/4 xícara de azeite",
        preparo: "Deixar o trigo para quibe de molho por 1 hora em água morna.\nEscorrer muito bem e espremer o trigo.\nMisturar os demais ingredientes.\nEspalhe o quibe em uma forma untada com azeite e jogue por cima um pouco mais de azeite.",
        sabor: "s"
    },
    {
        id: "r3",
        nome: "Pavê de Nozes",
        ingrediente: "Massa e Recheio:\n1 pacote de bolacha calipso\n1 pacote e meio de bolacha de maisena\n2 caixinhas de creme de leite\n2 caixinhas de doce de leite\n1/2 quilo de nozes\nGanache:\n1 caixinha de creme de leite\n200g de chocolate meio amargo",
        preparo: "Misture o doce de leite com o creme de leite e junte as nozes picadas, deixando umas inteiras para decorar. Reserve.\nGanache:\nPique o chocolate, junte o creme de leite e leve ao microondas por 25 a 30 segundos, misture bem.\nMontagem:\nUnte os lados da forma com um pouco de manteiga.\nColoque bolacha calipso em pé em volta da forma. Forre o fundo com bolachas de maisena e espalhe a camada de creme de nozes. Alterne bolacha e creme, terminando com creme.\nCubra com ganache e decore com nozes. Leve para gelar.",
        sabor: "d"
    },
    {
        id: "r4",
        nome: "Torta de Morango da Tia Eliza",
        ingrediente: "Massa:\n5 ovos\n3 xícaras de açúcar\n3 xícaras de farinha de trigo\n1 copo de água\n1 colher de sopa de pó royal\nRecheio:\n1 lata de condensado\n2 latas de creme de leite\n5 caixinhas de morango\n4 xícaras de açúcar\nChantilly para decorar",
        preparo: "Massa:\nBata as gemas com água até formar um creme. Sem parar de bater misture o açúcar aos poucos, a farinha e o pó royal.\nPor último as claras em neve delicadamente. Asse em forno pré-aquecido.\nRecheio:\nMisture o creme de leite e o condensado. Reserve.\nCozinhe 4 caixas de morangos com o açúcar, passe pela peneira e misture com o leite reservado.\nMontagem:\nCortar o bolo ao meio, molhar com guaraná e champanhe.\nColoque chantilly e creme de morango. Cubra com a outra metade e molhe novamente. Cubra com o restante do creme, chantilly e a última caixa de morango. Coloque sorvete a gosto.",
        sabor: "d"
    },
    {
        id: "r5",
        nome: "Bolo de Mexerica com Casca",
        ingrediente: "2 mexericas inteiras sem as sementes\ncasca e caldo de uma mexerica sem sementes e sem bagaços\n4 ovos\n2 copos de açúcar\n2 copos de farinha de trigo\n1 copo de óleo\n1 colher de fermento em pó",
        preparo: "No liquidificador bata bem os ovos.\nLave bem 2 mexericas, pique, tire as sementes e vá acrescentando aos ovos. De uma mexerica apenas a casca e o caldo. Bata bem.\nAcrescente o açúcar e o óleo e bata.\nNuma vasilha coloque a farinha e o pó royal, acrescente a mistura e mexa muito bem. Asse em forma untada.",
        sabor: "d"
    },
    {
        id: "r6",
        nome: "Manjar de Coco",
        ingrediente: "1 litro de leite\n1 lata de leite condensado\n1 vidro de leite de coco\n1 xícara de amido milho\n1 pacote de coco ralado\nAmeixa em calda a gosto",
        preparo: "Coloque o leite, leite condensado, leite de coco, coco ralado e amido de milho numa panela. Misture bem e leve ao fogo baixo até engrossar.\nColoque numa forma molhada e leve à geladeira até endurecer.\nDesenforme e jogue por cima a ameixa em calda.",
        sabor: "d"
    },
    {
        id: "r7",
        nome: "Abobrinha Gratinada",
        ingrediente: "3 abobrinhas em fatias finas\n1 pitada de sal\nPimenta do reino e orégano a gosto\nTempero a gosto\nPara o creme:\n4 ovos\n1 caixinha de creme de leite\n1/2 xícara de leite\nMuçarela ralada á gosto",
        preparo: "Preparo do Creme:\nBata os ovos, o creme de leite e o leite no liquidificador. Reserve.\nMontagem:\nUnte uma forma com óleo, coloque as abobrinhas já temperadas e jogue o creme por cima. Acrescente a muçarela ralada e leve ao forno pré-aquecido a 180 graus por 30 minutos até dourar.",
        sabor: "s"
    },
    {
        id: "r8",
        nome: "Arroz Doce",
        ingrediente: "2 copos de arroz\n4 copos de água\n1 copo de açúcar\n1 lata de leite moça\n750 ml de leite\n1 garrafinha de leite de coco pequena\n1 pacote de coco ralado\ncanela em pó",
        preparo: "Coloque o arroz para cozinhar com água e o açúcar em fogo baixo. Quando estiver quase secando acrescente o leite moça, leite, coco ralado, leite de coco, e a canela.\nDeixe cozinhar por mais uns 15 a 20 minutos no fogo bem baixinho. Desligue, coloque numa travessa e polvilhe mais canela.",
        sabor: "d"
    },
    {
        id: "r9",
        nome: "Pudim Sorvete",
        ingrediente: "1 lata de leite condensado\n1 lata de leite\n1 lata de creme de leite\n3 ovos\n4 colheres (sopa) bem cheia de nescau\n12 colheres (sopa) de açúcar\n1 xícara de açúcar (para a calda)\n1 colher (sopa) de maisena",
        preparo: "Caramelize uma forma de pudim e reserve.\nDissolva o nescau com água, jogue em cima da forma caramelizada e leve para congelar.\nBata no liquidificador o leite condensado, leite, 3 gemas e a maisena. Leve ao fogo até engrossar e deixe esfriar.\nBata as 3 claras em neve com o açúcar. Adicione o creme de leite. Misture os dois cremes, despeje na forma e leve ao congelador por 12 horas.",
        sabor: "d"
    },
    {
        id: "r10",
        nome: "Quiche de Queijo",
        ingrediente: "Massa:\n2 xícaras de farinha de trigo\n4 colheres de manteiga\nMeia lata de Creme de Leite\n1 colher de fermento em pó\nRecheio:\n2 xícaras de queijo prato ralado\n2 xícaras de queijo minas frescal ralado\n1 xícara de queijo parmesão ralado\n4 ovos\nMeia lata de Creme de Leite\nPimenta e noz-moscada\n50g de manteiga em pedaços",
        preparo: "Massa:\nPeneire a farinha, coloque a manteiga, o creme de leite e o fermento. Misture com os dedos até incorporar e soltar das mãos. Descansar por 20 minutos. Forre uma forma de aro removível, fure o fundo e asse a 200°C por 20 minutos.\nRecheio:\nMisture os queijos, ovos, creme de leite e temperos. Despeje sobre a massa assada, espalhe a manteiga e asse a 180ºC por 20 minutos. Sirva quente.",
        sabor: "s"
    },
    {
        id: "r11",
        nome: "Bolo Mágico de Canela",
        ingrediente: "4 ovos (claras separadas)\n1 xícara de açúcar\n100g de manteiga\n3 xícaras de farinha de trigo\n1 xícara de leite\n1 colher de canela\n1 colher de fermento em pó",
        preparo: "Bata na batedeira a manteiga, as gemas e o açúcar até ficar um creme esbranquiçado. Coloque a farinha e o leite.\nColoque o fermento e a canela misturando sem bater. Por último, adicione as claras em neve delicadamente.\nAsse em forno pré-aquecido 180 graus por 40 minutos. Polvilhe com açúcar e canela.",
        sabor: "d"
    },
    {
        id: "r12",
        nome: "Arroz de Carreteiro",
        ingrediente: "2 xícaras de arroz\n1/2 k de carne seca\nmeio gomo de linguiça portuguesa\n1/2 pimentão vermelho\n1/2 pimentão amarelo\n1/2 xícara de salsinha\n1/2 xícara de azeite\n4 dentes de alho\n1 cebola pequena\n3 xícaras de água\nPimenta calabresa a gosto",
        preparo: "Afervente a carne seca para tirar o sal. Cozinhe em mais água até ficar macia e desfie.\nFrite alho e cebola no azeite, acrescente a carne e o restante dos ingredientes. Refogue muito bem e acrescente a água. Cozinhe em fogo médio.",
        sabor: "s"
    },
    {
        id: "r13",
        nome: "Caldo Verde",
        ingrediente: "6 batatas\n1 caldo de galinha\n1 1/2 litro de água\n2 colheres (sopa) de azeite\n1 paio\n1 gomo de linguiça portuguesa\n1/2 maço de couve",
        preparo: "Cozinhe as batatas na água com caldo de galinha e amasse-as. Coloque novamente na panela.\nAdicione o paio e a linguiça fatiadas. Cozinhe mais um pouco, adicione o azeite, o sal e a couve fatiada. Desligue e sirva.",
        sabor: "s"
    },
    {
        id: "r14",
        nome: "Pastel Crocante de Forno",
        ingrediente: "10 fatias de pão de forma\n1 peito de frango\n4 colheres de milho\n1 colher de extrato de tomate\n3 colheres de cream cheese\nSalsinha e orégano\n1 ovo para pincelar\nMuçarela",
        preparo: "Retire a casca do pão e amasse com um rolo.\nCozinhe e asse o frango, depois desfie e misture com o milho, extrato de tomate, cream cheese e temperos.\nColoque 1 colher da mistura no pão, dobre e aperte as bordas com um garfo.\nPincele com ovo batido, adicione muçarela por cima e asse por 12 minutos a 175ºC.",
        sabor: "s"
    },
    {
        id: "r15",
        nome: "Suco Desintoxicante",
        ingrediente: "100 ml de chá verde\n100 ml de água de coco natural\n1 fatia média de melão",
        preparo: "Bata todos os ingredientes no liquidificador e sirva em seguida. Não coe para garantir as fibras.\nDica: A água de coco reduz o amargo do chá e o melão é diurético.",
        sabor: "b"
    },
    {
        id: "r16",
        nome: "Quentão",
        ingrediente: "1 garrafa de pinga\n2 xícaras de açúcar\n2 paus de canela médios\n2 limões médios em rodelas\ncasca de uma laranja\n4 cravos-da-índia\n60g de gengibre fatiado\n3 xícaras de água quente",
        preparo: "Caramelize o açúcar levemente em uma panela funda.\nCom cuidado, acrescente a água fervente, cravos, gengibre, canela, limão e laranja.\nFerva por 10 minutos para o caramelo dissolver. Acrescente a pinga e ferva por 5 minutos. Coe e sirva.",
        sabor: "b"
    },
    {
        id: "r17",
        nome: "Licor de Amarula Caseiro",
        ingrediente: "2 copos de doce de leite\n2 copos de creme de leite\n1 copo de vodka\n2 colheres de nescau\n1 colher de essência de pequi (opcional)",
        preparo: "Bater tudo no liquidificador.\nFica uma bebida suave e deliciosa.\nDica: Se preferir mais forte, coloque 2 copos de vodka.",
        sabor: "b"
    },
    {
        id: "r18",
        nome: "Pão de Queijo",
        ingrediente: "300g de polvilho azedo\n500g de fécula de mandioca\n25g de sal\n30g de margarina\n110ml de óleo\n550ml de leite\n5 ovos\n440g de queijo minas padrão ralado\n220g de queijo parmesão ralado",
        preparo: "Misture o polvilho, a fécula e o sal.\nFerva a margarina, óleo e o leite. Jogue lentamente sobre o polvilho.\nMisture até esfriar (use batedeira). Adicione os ovos até incorporar. Por último, os queijos.\nFaça pequenas bolinhas (30g) e asse a 180ºC por 20 minutos.",
        sabor: "s"
    },
    {
        id: "r19",
        nome: "Mosaico de Gelatina",
        ingrediente: "4 envelopes de gelatina de sabores diferentes\n1 lata de leite condensado\n1 lata de creme de leite\n200ml de leite de coco\n1 envelope de gelatina incolor em pó",
        preparo: "Prepare os 4 sabores de gelatina e leve à geladeira para firmar em potes quadrados.\nNo liquidificador, bata o leite condensado, creme de leite, leite de coco e a gelatina incolor hidratada.\nCorte as gelatinas firmes em cubos, coloque na forma com o creme e deixe gelar.",
        sabor: "d"
    },
    {
        id: "r20",
        nome: "Frango com Crosta de Queijo",
        ingrediente: "Crosta:\n1 xícara de mussarela ralada\n1 ½ xícara de queijo prato ralado\n¼ xícara de maionese\n2 dentes de alho picados\n½ xícara de farinha de rosca\nFrango:\n500g de peito de frango",
        preparo: "Misture todos os ingredientes da crosta.\nFaça cortes superficiais no frango temperado e coloque na assadeira.\nEspalhe a crosta de queijo por cima de cada filé e asse a 250°C por 20 minutos.",
        sabor: "s"
    },
    {
        id: "r21",
        nome: "Risoto Napolitano",
        ingrediente: "Almôndegas:\n500g de carne moída\n1 pão francês hidratado\n1 pacote sopa de cebola\nArroz:\n3 xícaras de arroz cozido\nErvilhas, azeitonas, cebolinha\nMolho:\nMolho de tomate\nMontagem:\n100g presunto, 100g mussarela",
        preparo: "Modele as almôndegas e doure-as na frigideira.\nMisture o arroz com ervilha e azeitona.\nNuma travessa, monte em camadas: molho, almôndegas, presunto, mussarela, arroz, molho e queijo ralado. Asse para gratinar.",
        sabor: "s"
    },
    {
        id: "r22",
        nome: "Torta Alemã",
        ingrediente: "200g de manteiga sem sal\n1 xícara de açúcar\n1 lata de Creme de Leite\n1 e 1/2 pacote de Biscoito Nesfit Leite e Mel\n1/2 xícara de leite\nCobertura:\n1 tablete de Chocolate Meio Amargo\n1 lata de Creme de Leite",
        preparo: "Bata a manteiga e o açúcar até esbranquiçar. Misture o creme de leite e reserve.\nForre o fundo de uma forma alternando biscoitos embebidos no leite e o creme. Gele por 4 horas.\nCobertura: Aqueça o creme de leite, junte o chocolate picado, mexa e espalhe por cima da torta.",
        sabor: "d"
    },
    {
        id: "r23",
        nome: "Guacamole",
        ingrediente: "1 abacate pequeno\n1 dente de alho amassado\n2 tomates picadinhos sem sementes\n1 cebola picadinha\n1 xícara de coentro picadinho\nPimenta malagueta a gosto\nSuco de limão\nSal",
        preparo: "Amasse o abacate, misture os demais ingredientes e sirva com Doritos ou torradas.\nEntrada super refrescante e saborosa.",
        sabor: "s"
    },
    {
        id: "r24",
        nome: "Pudim Prestígio",
        ingrediente: "Pudim Chocolate:\n1 Leite condensado, creme de leite, leite e chocolate em pó. 1 gelatina incolor.\nPudim Coco:\n1 Leite condensado, creme de leite, leite de coco, coco ralado. 1 gelatina incolor.",
        preparo: "Bata os ingredientes do pudim de chocolate com a gelatina hidratada e coloque na forma. Gele por 1 hora.\nBata os ingredientes do pudim de coco (exceto o ralado) com a gelatina hidratada, misture o coco e jogue por cima. Gele por 6 horas.",
        sabor: "d"
    },
    {
        id: "r25",
        nome: "Vinho Quente",
        ingrediente: "1 copo de açúcar\nCravos e canela em pau a gosto\n1 litro de vinho tinto\n½ litro de água\n1 maçã descascada em pedaços\n1 pera descascada em pedaços",
        preparo: "Queime ligeiramente metade do açúcar com os cravos e a canela.\nAcrescente o vinho, a água e o açúcar restante. Deixe ferver.\nColoque a maçã e a pera. Sirva muito quente.",
        sabor: "b"
    }
];
