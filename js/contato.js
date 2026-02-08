	// Resetar mensagens de erro ao clicar fora do formulário

//Usando o método de clique, que monitora em qualquer parte do documento (document)
$(document).click(function(event) {

	/*Se o elemento clicado (event.target) não for (!) dentro do formulario (closest #formulario) ou seus ancestrais (length)*/
	  if (!$(event.target).closest('#formulario').length){
	
	//A condiçaõ verdadeira e os avisos de preencher o campo desaparecerão    
		  $("#nome-error, #email-error, #telefone-error, #mensagem-error").text("");
	  }
	});
	
	//FUNÇÃO PARA LIMITAR O PREENCHIMENTO DESSE INPUT À APENAS 11 NÚMEROS NO FORMATO (99)99999-9999
	//Utilizando o método on.(input), ou seja, quando o input do telefone for ativado
	$("#telefone").on('input', function() {
	
	//criamos uma variável chamada telefone, que obtem o valor do id telefone, assumindo seu valor (val) e removendo espaços (trim) 
	  var telefone = $(this).val().trim();
	
	/*Remove todos os caracteres não numéricos, utilizando o método replace para substituir os caracteres não-numéricos 
	(1° argumento:/\D/g) onde D é uma expressão regular que representa qualquer caractere que não seja dígito e o g é a própria
	substituição global, ou seja, em toda string. 
	e substituir por uma string  vazia (2° argumento: '')*/
	  telefone = telefone.replace(/\D/g, '');
	
	//Limita o número de dígitos a 11, estabelecendo que se o houver mais de 11 números (telefone.length > 11)
	  if (telefone.length > 11) {
	//estabelece um limite através do método substring que engloba apenas 11 caracteres (0,1,2,3...).    
		  telefone = telefone.substring(0, 11);
	  }
	
	  // Formatação do telefone
	  /*1° adicionamos dinamicamente os parenteses na string através "(" ")" e formatamos o DDD puxando a substring (0,2) que são os dois
	primeiros números*/
	//2° adicinamos o prefixo com os 5 primeiros digítos na substring (2,7) mais o - de separação do entre o prefixo e o sufixo
	//3° por fim adicionamos a substring (7) com o resto do sufixo
	  if (telefone.length === 11) {
		  telefone = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 7) + "-" + telefone.substring(7);
	  }
	
	//Se caso atender todas as condições, o var telefone obtem o valor restritamente formatado em (99)99999-9999
	  $(this).val(telefone);
	});
	
	
	
	/*VALIDAÇÃO DOS FORMULÁRIOS*/
	
	$("#formulario").submit(function(event){
		// Declarando e ocultando mensagens de erro e sucesso no preenchimento de formulário
		$("#nome-error, #email-error, #telefone-error, #mensagem-error").text("");
		$("#mensagem-sucesso").hide();
	
		//Declarando uma variável como verdadeira dentro da seguinte lógica:
		let isValid = true;
	
	
		/*Verificando o campo nome, onde val() assume o valor real do campo #nome e o trim() remove os espaços, ou seja se o valor 
		(val) for um espaço vazio (trim) a variavel geral (isValid) será falsa, aparecendo os avisos para preencher o formulario*/
		if($("#nome").val().trim() === ""){
			$("#nome-error").text("Por favor, preencha seu nome.");
			isValid = false;
		
		/*Aqui a mesma lógica com o val e trim se mantém, porém adiciona o split que divide a strig #nome em duas (nome e sobrenome)
		e caso não tenha pelo menos nome e sobrenome (length < 2), a variável será falsa, aparecendo a mensagem de aviso*/
		} else if ($("#nome").val().trim().split(" ").length < 2) {
			$("#nome-error").text("Por favor, preencha seu nome completo.");
			isValid = false;
		}
	
	  // Verificando o campo email, aplicando a mesma lógica do exemplo acima com val e o trim
	  if($("#email").val().trim() === ""){
		$("#email-error").text("Por favor, preencha seu e-mail.");
		isValid = false;
	
	  } else {
		// Separando o email em duas partes: parte antes do "@" e parte após o "@" utilizando o (split(@))
		let parts = $("#email").val().split("@");
	
	/*Verificando se há pelo menos um caractere antes do "@" (parts[0].length < 1) e se o domínio é "@hotmail.com" ou "@gmail.com"
	parts[1] === "hotmail.com" || parts[1] === "gmail.com"*/
		if (parts[0].length < 1 || !(parts[1] === "hotmail.com" || parts[1] === "gmail.com")) {
			$("#email-error").text("Por favor, insira um e-mail válido com '@gmail.com' ou '@hotmail.com'.");
			isValid = false;
		}
	}
	
	// Verificando o campo telefone novamente com val e trim.
	  if ($("#telefone").val().trim() === "") {
		$("#telefone-error").text("Por favor, preencha seu telefone.");
		isValid = false;
		
	} else {
	/*Remove caracteres não numéricos, utilizando o método replace para substituir os caracteres não-numéricos (1° argumento: /\D/g) por 
	uma string  vazia (2° argumento: '')*/
		var telefone = $("#telefone").val().trim().replace(/\D/g, '');
	
	//Aqui verifica-se se o número de telefone não contém exatamente 11 caracteres (telefone.length !== 11), se sim, aparece o aviso    
		if (telefone.length !== 11) {
			$("#telefone-error").text("Por favor, insira um telefone válido com DDD");
			isValid = false;
	
		} else {
	// Formata o telefone para (99) 99999-9999
	/*1° adicionamos dinamicamente os parenteses na string através "(" ")" e formatamos o DDD puxando a substring (0,2) que são os dois
	primeiros números*/
	//2° adicinamos o prefixo com os 5 primeiros digítos na substring (2,7) mais o - de separação do entre o prefixo e o sufixo
	//3° por fim adicionamos a substring (7) com o resto do sufixo
			telefone = "(" + telefone.substring(0, 2) + ")" + telefone.substring(2, 7) + "-" + telefone.substring(7);
			$("#telefone").val(telefone);
		}
	}
	
	  // Verificando o campo mensagem
	  if($("#mensagem").val().trim() === ""){
		$("#mensagem-error").text("Por favor, preencha sua mensagem.");
		isValid = false;
	  }
	
	
	// Validando se todo formulário for preenchido corretamente
	  if (isValid) {
		$("#mensagem-sucesso").show();
	//Atualizando a página após validação simulando envio do formulário
		setTimeout(function() {
		  location.reload();
		}, 1500); // 5000 milissegundos = 5 segundos
	  }
	
	  return false;
		
	});    
