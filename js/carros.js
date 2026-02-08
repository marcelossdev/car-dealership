//SISTEMA DE SLIDE DOS CARROS DETALHADOS//

//NESSAS 3 PRIMEIRAS LINHAS DECLARAMOS 3 VARIAVEIS:

//A primeira, imgShow damos um valor 3, que futuramente será usada para mostrar quantas imagens iniciais serão vísiveis no slide
	var imgShow = 3;
	
/*A segunda maxIndex, conta quantas páginas precisaremos abrigar a quantidade de imagens nos slides, através do seguinte calculo: 
USAMOS O LENGTH PARA RESGATARMOS A QUANTIDADE TOTAL DE IMAGENS DE CARROS, E A DIVIDIMOS PELA var imgShow, 
QUE É JUSTAMENTE A QUANTIDADE DE CARROS QUE QUEREMOS QUE APAREÇA EM CADA SLIDE,
O -1 NO FINAL DO CÓDIGO GARANTE QUE NÃO VAMOS PARA UMA PÁGINA QUE NÃO EXISTE, POIS A CONTAGEM DO ÍNDICE COMEÇA DO ZERO
E O Math.ceil garante que se der um número fracionado, arredonde para uma unidade a mais, ex: 3,3 páginas = 4 paginas*/
	var maxIndex = Math.ceil($('.mini-img-wraper').length/ imgShow) - 1;

//E por última a curIndex que representa a posição que o slide estiver, que inicialmente começa em 0, ou seja no primeiro
	var curIndex = 0;





//DECLARAÇÃO DAS FUNÇÕES:

//initSlider cuida da inicialização dos slider, estabelecendo as dimensões e funcionamento no geral
	initSlider();

//Essa função permite a navegação no geral, levando o slide para a esquerda ou para direita	
	navigateSlider();

//E por último o clickSlider gerencia o destaque maior da imagem, que for clicada no slide 	
	clickSlider();







//PRIMEIRO O initSlider QUE CUIDA DA INICIALIZAÇÃO DO SLIDE:
	function initSlider(){

//Reservamos dentro da variavel amt, o número total de imagens (mini-img-wraper) com o length
//E o multiplicamos por 33.3 que siginifica 3 imagens disponíveis		
		var amt = $('.mini-img-wraper').length * 33.3;

//Reservamos a class nav-galeria-wraper que é o container que abriga todas as imagens do slider, dentro da variavel elScroll		
		var elScroll = $('.nav-galeria-wraper');

//Reservamos CADA IMAGEM (mini-img-wraper) do slider, na variavel elSingle		
		var elSingle = $('.mini-img-wraper');

/*Estabelecemos que o container da galeria (elScroll) terá a largura de acordo com a portacentagem de tamanho do amt, que é definida
pelo total de imagens abrigadas e seu tamanho relativo*/
		elScroll.css('width',amt+'%');

/*Definimos que cada imagem do slide terá uma largura de 33.3 multiplicada por 100/amt, onde amt reserva o numero total de imagens,
e assim calculamos nossa largura total em relação ao container, não esquecendo de concatenar em % no final, para o calculo correto */		
		elSingle.css('width',33.3*(100/amt)+'%');
	}






	
//E por último declaramos a função navigateSlider, que atua na parte de navegação das imagens através das arrows
	function navigateSlider(){

//Aqui adicionamos um evento de clique na seta da direita		
		$('.arrow-right-nav').click(function(){

//Aqui garantimos que o slide não ultrapasse o limite de imagens, onde último índice (maxIndex) seja maior que o índice vigente			
			if(curIndex < maxIndex){

//Incrementamos o valor de +1 no curIndex, ou seja, ao clicar na seta a direita, passaremos para o próximo índice de imagens
				curIndex++;

//Caso contrário (chegar ao último) e clicar em avançar, retorne ao primeiro
			}else{
				curIndex = 0;
			}

//a var elOff reserva a diferença horizontal (EM PIXELS) entre a primeira imagem de toda página nova no slider e o  container:
//curIndex refere-se a cada página nova do slider, então toda vez multiplicada por 3, corresponderá a primeira imagem de cada slide
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;

/*E aqui so garantimos a animação das imagens para esquerda, para chegada das próximas
E todo esse cálculo de quantos pixels as imagens precisas rolar, ja foi feita na variavel elOff feita acima*/				
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'})
							
	});


//Novamente a mesma função de clique, mas agora na seta da esquerda
		$('.arrow-left-nav').click(function(){

//Nossa função já inicia a partir da segunda sessão de imagens, para que a seta de voltar seja efetiva			
			if(curIndex > 0){

//Decrementamos o curIndex, ou seja, ao clicar na seta de voltar diminuiremos um índice
				curIndex--;

//Caso contrário (estiver no primeiro) e clicar em voltar, retorne ao último
			}else{
				curIndex = maxIndex;
			}

//Aqui a var elOff reserva novamente a diferença mesma distância entre a primeira imagem de cada novo slide e o inicio do container
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;

//função de animação para esquerda
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'})
			
		})
}








//Aqui é a declaração da função clickSlider que será responsável pela troca de descição, título e etc ao clicar em outro slide
	function clickSlider(){

//A variavel carData será responsavel por armazenar um array de objetos que contém três propriedades: título, preço e descrição		
		var carData = [
			{title: '#mustang', price: '#preco-mustang', desc: '#desc-mustang'},
			{title: '#impala', price: '#preco-impala', desc: '#desc-impala'},
			{title: '#kombi', price: '#preco-kombi', desc: '#desc-kombi'},
			{title: '#eclipse', price: '#preco-eclipse', desc: '#desc-eclipse'},
			{title: '#lamborghini', price: '#preco-lamborghini', desc: '#desc-lamborghini'},
			{title: '#outros', price: '#preco-outros', desc: '#desc-outros'}
		];


//Adicionando uma função de clique nas imagens do slide, onde:
		$('.mini-img-wraper').click(function(){

//Essa primeira linha reseta o brackground de todas imagens, colocando-os transparente			
			$('.mini-img-wraper').css('background-color','transparent');

//E essa estabelece que a imagem clicada seja destacada com o backgrounu cinza			
			$(this).css('background-color','rgb(210,210,210)');

//A var img acessa os filhos (children) da mini-img-wraper (this), que no caso são as class mini-img e armazena as url do background			
			var img = $(this).children().css('background-image');

//E a colocamos em destaque na div .foto-destaque, ou seja a foto do slide clicada ficará em destaque 	
			$('.foto-destaque').css('background-image',img);

//A var index armazena a posição de um índice em relação aos seus irmãos dentro de um container, através da func index()
			var index = $(this).index();

//Aqui estabelecemos a condição que se o index for menor que a quantidade de carros, ou seja, todos corresponderem uns aos outros			
			if (index < carData.length) {

//Aqui chamamos a função updateCarDetails que irá corresponder a cada objeto (index) dentro do array carData
				updateCarDetails(carData[index]);
			}
		});

//Essa linha mantém a primeira imagem já selecionada ao carregar a página, com o evento de click no primeiro índice 0		
		$('.mini-img-wraper').eq(0).click();
	}





//Aqui declaramos a função updateCarDetails, com o car como parâmetro
function updateCarDetails(car) {

//Escondemos todas os títulos, descrições e preço	
    $('.line-titulo h2, .descricao-veiculo h2, .descricao-veiculo p').hide();

//E o índice (index) que for clicado, aparecerá também seu título, preço e descrição	
    $(car.title).show();
    $(car.price).show();
    $(car.desc).show();
}	



	



	

