$(function(){

	//SISTEMA DE PESQUISA//

//Cria-se uma váriavel que armazena o valor atual do preço em porcentagem
	var currentValue = 0;

//Outra para identificar se o mouse está arrastando a barra de preço
	var isDrag = false;

//Essa para limitar o preço máximo que pode chegar
//obs* como a contagem começa a partir dos 10.000 no ponto 0, então o preço máximo será 50.000, porém a variável será 60000 na lgc
	var preco_maximo = 60000;

// Preço mínimo da barra de preço
	var preco_minimo = 10000;

//E o preço atual que se inicia em 0
	var preco_atual = preco_minimo;



// Função para atualizar a posição inicial da barra
function atualizarBarraInicial() {

//armazenamos a barra de preço na variavel elBase	
	var elBase = $('.barra-preco');

// Calcula a posição horizontal do ponteiro da barra de preço com base no (preco_minimo) e o (preco_maximo)
//multiplicado pela largura total da barra de preço aramazenado na var elBase	
	var mouseX = (preco_minimo / preco_maximo) * elBase.width();

//Define a posição do ponteiro da barra (pointer-barra) ajustando a posição calculada mouseX. 
//O valor 13 é subtraído para centralizar o ponteiro visualmente.	
	$('.pointer-barra').css('left', (mouseX - 13) + 'px');

//Atualiza a largura do preenchimento da barra (barra-preco-fill) como uma porcentagem da largura total da barra, 
//com base na posição do ponteiro mouseX dividida pela largura total da barra, que resulta em um valor entre 0 e 1
//multiplicado por 100 para transformar o valor em porcentagem
	$('.barra-preco-fill').css('width', (mouseX / elBase.width()) * 100 + '%');

//Colocamos o preço de pesquisa, em seu valor mínimo já formatado em modelo convencional (10.000,00) adicionando o R$
	$('.preco_pesquisa').html('R$' + formatarPreco(preco_minimo));

	atualizarImagens(preco_minimo);  // Mostrar as primeiras 3 imagens ao inicializar
	
}




/*Usamos a função mousedown para idenificar se o mouse está sendo pressionado no elemento pointer-barra, indicando que o usuário
está arrastando a barra de preço*/
	$('.pointer-barra').mousedown(function(){
		isDrag = true;
	})

/*Usamos a função touchstart para idenificar se o touchscreen do mobile está sendo pressionado no elemento
 pointer-barra, indicando que o usuário está arrastando a barra de preço*/
	$('.pointer-barra').on('touchstart', function(){
    isDrag = true;
});

//O inverso também foi feito com a function mouseup, ou seja se o mouse for solto, indica que o usuario 
// parou de arrastar
	$(document).mouseup(function(){
		isDrag = false;

//O inverso também foi feito com a function touchend, ou seja se o touchscreen do mobile for solto, 
// indica que o usuario parou de arrastar
	$(document).on('touchend', function(){
    isDrag = false;
    enableTextSelection();
});

		
//O enableTextSelection é para que tudo volte a ser selecionado novamente no momento que o botão do mouse for solto 		
		enableTextSelection();
	})

//Aqui iniciamos a lógica com a função de mousemove na barra de preço e o (e) para se referir a posição x que será utilizada
	$('.barra-preco').mousemove(function(e){

//Se a variável isDrag for verdadeira significa que:
		if(isDrag){

//impede a seleção de texto enquanto a função estiver ativa			
			disableTextSelection();

//criamos a variável elBase que atribui a si, o valor da da barra-preço			
			var elBase = $(this);

/*aqui criamos outra variavel, para representar apenas a horizontal do elemento barra-preço, onde subtraimos toda horizontal do
DOM, apenas para o elemento barra-preço, representado pela var elBase*/			
			var mouseX = e.pageX - elBase.offset().left;

//Desenvolvemos uma pequena expressão onde se a seleção do mouse na barra-preço for menor que zero			
			if(mouseX < 0)

//seja limitada ao próprio zero, evitando que assuma valores negativos				
				mouseX = 0;

//E outra que se a posição do mouse for maior que a largura da barra-preço (elBase)				
			if(mouseX > elBase.width())

//Já estabelecemos que a posição do mouse se limite a própria largura da barra-preço				
				mouseX = elBase.width();

/*Nessa primeira linha estilizamos o pointer da barra, que é o próprio elemento que arrastamos, onde o colocamos 13px a esquerda
do mouseX que é o início da barra em si, para alinhar adequadamente a mesma*/
			$('.pointer-barra').css('left',(mouseX-13)+'px');

/*aqui invocamos uma das variaveis iniciais que é o valor atual da barra-preço que será igual a posição do mouse em relação a
largura total da barra, que será um valor entre 0 e 1, e multiplicando por 100 para torna-la em porcentagem*/			
			currentValue = (mouseX / elBase.width()) * 100;

//aqui a parte preenchida é chamada para ser estilizada onde sua largura será medida de acordo com a posição do controle deslizante			
			$('.barra-preco-fill').css('width',currentValue+'%');

/*para estabelecer o preço atual fazemos a seguinte regra: dividimos o currentValue (que é a posição do deslizante em %) por 100 
estabelecendo um valor entre 0 e 1, porém que será multiplicado pelo preco_maximo que já determinamos que é 70.000,00*/
			preco_atual = ((currentValue / 100) * (preco_maximo - preco_minimo));

/*chamamos a função formatarPreco para formatar o valor do preco_atual em até duas casas decimais (como será explicada na função) e 
separador de milhares, caso necessário*/			
			preco_atual = formatarPreco(preco_atual);

//adicionamos dinamicamente o valor do real brasileiro, na classe .preco_pesquisa do html para ficar ao lado do preco_atual			
			$('.preco_pesquisa').html('R$'+preco_atual);

//vinculamos a função atualizarImagens com o preco_atual para usa-la futuramente
			atualizarImagens(preco_atual);
		}
	})


// Precisamos registrar o evento manualmente para poder usar preventDefault
document.querySelector('.barra-preco').addEventListener('touchmove', function(e){

    // impede a página de rolar enquanto arrasta o slider
    if(isDrag) e.preventDefault();

    if(isDrag){

        disableTextSelection();

        var elBase = $('.barra-preco');

        var touch = e.touches[0];
        var mouseX = touch.pageX - elBase.offset().left;

        if(mouseX < 0) mouseX = 0;
        if(mouseX > elBase.width()) mouseX = elBase.width();

        $('.pointer-barra').css('left',(mouseX-13)+'px');

        currentValue = (mouseX / elBase.width()) * 100;
        $('.barra-preco-fill').css('width',currentValue+'%');

        preco_atual = ((currentValue / 100) * (preco_maximo - preco_minimo));
        preco_atual = formatarPreco(preco_atual);

        $('.preco_pesquisa').html('R$'+preco_atual);
        atualizarImagens(preco_atual);
    }

}, { passive:false }); // ⭐ ESSA LINHA É O SEGREDO




//Aqui chamamos a função formatarPreco colocando o preco_atual como argumento para boas práticas
	function formatarPreco(preco_atual){

/*o preco_atual é formatado novamente a partir da função toFixed, que arredonda objetos númericos de acordo com as casas decimais
desejadas, nesse caso serão apenas 2*/		
		preco_atual = preco_atual.toFixed(2);

/*Aqui dividimos através da função split, onde o primeiro array será o valor inteiro antes do ponto, e a segunda após o ponto, as
casas decimais */		
		preco_arr = preco_atual.split('.');

/*invocamos outra função (formatarTotal) que tem como argumento o array (preco_arr) baseado em separadores de milhares, se
necessário, aramazenado na variável novo_preco*/
		var novo_preco = formatarTotal(preco_arr);

//e essa lógica já é pronta pra ser exibida quando pedimos para retornar esse novo_preco		
		return novo_preco;
	}


//Aqui chamamos a função formatarTotal para fazer da seguinte forma:
	function formatarTotal(preco_arr){

//Se a primeira parte do preço inteiro (preco_arr[0]) for menor que 1000:		
		if(preco_arr[0] < 1000){

//retorne da seguinte forma: número inteiro (preco_arr[0]) XXX "," e o resto/centavos (preco_arr[1]) XX  			
			return preco_arr[0]+','+preco_arr[1];

/*Se o preço for maior ou igual a 1000 e menor que 10000 ele será formatado da seguinte forma: 
(lembrando que o preco_arr[0] refere-se ao valor inteiro, antes do toFixed(2), ou seja os centavos) 
(E o preco_arr[0][0] acessa o primeiro caractere desse valor inteiro)*/
		}else if(preco_arr[0] < 10000){

/*Após o primeiro dígito (preco_arr[0][0]) adicionamos o ponto '.') e novamente chamamos o preco_arr[0] como um todo, após o '.'
através da substring que pega a partir do segundo dígito (1) até toda parte final dela , e colocamos a vírgula ',' e completamos
com o resto/centavos (preco_arr[1])*/		
			return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+','+preco_arr[1];

		}else{

/*Se o preço for maior ou igual a 10000, o ponto será colocado após os dois primeiros dígitos (preco_arr[0][0] e preco_arr[0][1])
e depois o restante do valor (preco_arr[0] a partir do terceiro dígito (2) até o final (preco_arr[0].length) e por fim o resto/troco*/			
		return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+','+preco_arr[1];
		}
	}

// Esconder todas as divs da quarta até a décima quinta
	$('.vitrine-destaque').slice(3, 15).css('display', 'none');

	// Função para atualizar as imagens de acordo com o preço atual
	function atualizarImagens(preco_atual) {

/*Aqui chamamos a função parseFloat que basicamente retorna apenas numeros nesse sentido (123.45), e transformamos o preco_atual
em uma string para usarmos o replace que é um método que atende apenas strings onde e dentro dela damos dois argumentos:
primeiro transforma o cifrão e a vírgula ([R$.]) em um espaço em branco ('') que é ignorado pela função parseFloat,
e o segundo argumento transforma a vírgula dos centavos em . ponto, pois vírgula não é lida pelo parseFloat, mas ponto sim */
		preco_atual = parseFloat(preco_atual.toString().replace(/[R$.]/g, '').replace(',' , '.'));


/* Com a variável conjuntos, subtraimos o preço mínimo que é 10.000 do preço atual, para saber onde a barra se encontra 
e logo depois dividimos por 10.000 para saber quantos conjuntos serão mostrados e mesmo que dê um número quebrado, a função
Math.floor garante que seja arredondada pelo menor número mais próximo
e o +1 no final é para garantir que no mínimo apresente 3 conjuntos de carros no preço minimo que são os 10.000,00*/
		var conjuntos = Math.floor((preco_atual - preco_minimo) / 10000) + 1;


/*Selecionamos a classe de cada carro (vitrine-destaqque), onde cada item dessa classe será iterado com o .each e será através de
cada posição no DOM através do index que começa do 0 até o 14 que contabiliza 15 elementos ou no caso 15 indexs kkk'*/
		$('.vitrine-destaque').each(function(index) {

/*Aqui estabelecemos que se o valor do index for menor que a variável conjuntos que criamos, ela tem de ser mostrada */			
			if (index < conjuntos * 3) {
				$(this).fadeIn(500); // Animação de fade-in
				
//E caso contrário a var conjuntos ainda não estiver no index desejado, ou seja, o index for maior, ele fica oculto ou desaparece				
			} else {
				$(this).fadeOut(500); // Esconde com fade-out
			}
		});
	}

	$(window).resize(function() {
        $('input[type=checkbox]').prop('checked', false);
        atualizarBarraInicial();
    });
	

/*Seleciona todos os elementos com o input class decade-checkbox
Com o método change, que é acionado quando um elemeno input é alterado, no caso o checkbox sendo marcado ou desmarcado
E a function, que vem em forma de callback (condição)
*/
$('.decade-checkbox').change(function() {

//Se o input checkbox for marcado então execute a função resetPreco
	if (this.checked) {
		resetPreco();
	}
});


//Aqui se o mouse arrastar a class barra-preco aplique o resetDecades
$('.barra-preco').mousedown(function() {	
	resetDecades();
});

//A função resetPreco consiste em
function resetPreco() {

//O valor que a barra de preço estiver será redefinida para seu estado inicial, ou seja 0	
	currentValue = 0;

//A barra de preço não estará sendo arrastada nesse contexto	
	isDrag = false;

//O preco_atual são os números representado onde o current value da barra estiver, eles retornarão para o preco_minimo (10.000,00)	
	preco_atual = preco_minimo;
	atualizarBarraInicial();
}


//A função resetDecades é
function resetDecades() {

//seleciona as checkbox e alteram todas elas através do método prop() para desmarcada, caso estiverem
	$('.decade-checkbox').prop('checked', false);
}


atualizarBarraInicial();


	function disableTextSelection(){
		$("body").css("-webkit-user-select","none");
		$("body").css("-moz-user-select","none");
		$("body").css("-ms-user-select","none");
		$("body").css("-o-user-select","none");
		$("body").css("-user-select","none");
	}

		function enableTextSelection(){
		$("body").css("-webkit-user-select","auto");
		$("body").css("-moz-user-select","auto");
		$("body").css("-ms-user-select","auto");
		$("body").css("-o-user-select","auto");
		$("body").css("-user-select","auto");
	}

})
