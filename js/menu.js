	//MENU RESPONSIVO//

	$('.mobile img').click(function() {

		//COM O CLIQUE TERÁ O "slideToggle" QUE É UMA FUNÇÃO DE APRESENTAR O CONTEÚDO OCULTO  
		$('.mobile ul').slideToggle();

		  //O ÍCONE DE ABERTURA SOME QUANDO O MENU É ABERTO E VICE-VERSA
		$('.open-btn').toggle();
		
		//O ÍCONE DE FECHAMENTO APARECE QUANDO O MENU É ABERTO E VICE-VERSA  
		$('.close-btn').toggle();
  });

  $(function(){
	//ESTABELECEMOS UM EVENTO DE CLIQUE NO LINK DO MENU "a"
		$('nav a').click(function(){
	
	//CRIAMOS UMA VARIAVEL QUE OBTEM O VALOR DO ATRIBUTO "href"	
			var href = $(this).attr('href');
	
	//CRIAMOS OUTRA VARIAVEL PARA MEDIR A DISTÂNCIA ENTRE O TOPO DA PÁGINA E O ELEMENTO QUE SEJA CLICADO
			var offSetTop = $(href).offset().top;
	
	/*APÓS CRIARMOS ESSA LÓGICA, ANIMAMOS O PROCESSO DE SCROLLAGEM ATRAVÉS DO "scrollTop" ATRELADA
	A LÓGICA QUE CALCULAMOS ENTRE O TOPO DA PÁGINA E O TOPO DA SESSÃO DO LINK QUE FOR CLICADO*/	
			$('html,body').animate({'scrollTop':offSetTop});
	
	//RETURN FALSE PARA NÃO ATUALIZAR A PÁGINA AO CLICAR NO LINK		
			return false;
		})
	})
