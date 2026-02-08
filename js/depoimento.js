	//SISTEMA DE NAVEGAÇÃO DOS DEPOIMENTOS//

/* A variavel amtDepoimento armazena o número total de elementos <p> dentro do elemento com 
a classe .half-2. Sendo o número total de depoimentos disponíveis. O length é útil para saber 
quantos depoimentos existem, o que pode ser usado em loops, para navegação, 
ou para qualquer outra manipulação que dependa do número de elementos encontrados. */	
var amtDepoimento = $('.half-2 p').length;

/* Já a variável curIndex armazena o índice atual do depoimento sendo exibido, começando em 0, 
o que indica o primeiro depoimento. */	
	var curIndex = 0;

//Declarando o nome das funções
	iniciarDepoimentos();
	navegarDepoimentos();

/*Aqui iniciamos com a função iniciarDepoimentos onde ocultamos todos os outros parágrafos e deixamos
 apenas o primeiro a mostra, juntamente com o titulo h1*/
	function iniciarDepoimentos(){
		$('.half-2 p').hide();
		$('.half-2 h1').hide();
		$('.half-2 p').eq(0).show();
		$('.half-2 h1').eq(0).show();
	}

//Aqui a função navegarDepoimentos inicia adicionando uma função de clique no elemento next
	function navegarDepoimentos(){
		$('[next]').click(function(){

//a variável curIndex recebe um incremento de 1 pelo ++, ou seja, ao clicar no next avança			
			curIndex++;

// Se caso chegar ao final dos depoimentos, retorne ao primeiro curIndex = 0
			if(curIndex >= amtDepoimento)
				curIndex = 0;

/*Aqui a lógica da primeira é invertida, onde o primeiro parágrafo é ocultado e o próximo(curIndex) 
é apresentado*/
			$('.half-2 p').hide();
			$('.half-2 h1').hide();
			$('.half-2 p').eq(curIndex).show();		
			$('.half-2 h1').eq(curIndex).show();		

		})

//O código é quase o mesmo, apenas invertendo algumas lógicas, onde o clique agora é no prev		
		$('[prev]').click(function(){

//Aqui ao invés de incrementar, ele decrementa, ou seja, volta
			curIndex--;
//E se caso nessa volta, ele for menor que 0, ou seja o primeiro, ele vai para o último no caso -1			
			if(curIndex < 0)
				curIndex = amtDepoimento-1;
			$('.half-2 p').hide();
			$('.half-2 h1').hide();
			$('.half-2 p').eq(curIndex).show();		
			$('.half-2 h1').eq(curIndex).show();		

		})
	}
