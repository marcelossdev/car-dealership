	//SISTEMA CHECKBOX	

// A função dentro desse bloco é executada assim que o DOM estiver totalmente carregado
$(document).ready(function() {

	//Invocamos o manipulador de eventos (change), que é disparado toda vez que a checkbox é marcada ou desmarcada
		$('.decade-checkbox').on('change', function() {
	
	// Cria um array vazio para armazenar as décadas selecionadas        
			var selectedDecades = [];
	
	// Seleciona todos os checkboxes que estão marcados e itera sobre cada um (each) deles
				$('.decade-checkbox:checked').each(function() {
	
	//Criamos a variável decade e já atribuindo ao próprio checkbox (this) o método .data, que armazena as diferentes décadas de cada um dos checkbox
					var decade = $(this).data('decade');
	
	//Aqui verifica se decade é uma string vazia ou não estiver presente
					if (decade) {
	
	//Se decade for um valor válido, ele é adicionado ao array selectedDecades usando o método push().					
						selectedDecades.push(decade);
					}
				});
	
		
	//Aqui garante que se as décadas selecionadas no checkbox for igual a zero, ou seja, nenhuma década for selecionada
				if (selectedDecades.length === 0) {
	
	//Dê um fadeout ao remover a class show que estiliza o aparecimento ou não dos carros
					$('.vitrine-destaque').fadeOut(500).removeClass('show');
	
				} else {
	
	//Itera sobre cada uma (each) das vitrine-destaque quando marcadas
					$('.vitrine-destaque').each(function() {
	
	//Criamos a variavel carDecade para armazenar o valor de cada década de carro					
						var carDecade = $(this).data('year');
	
	/*Verifica se o valor carDecade (a década do carro) está presente no array selectedDecades. 
	O método includes retorna true se o valor estiver presente no array, e false caso contrário.*/
						if (selectedDecades.includes(carDecade)) {
	
	//Se o valor carDecade estiver no array da um fadein na class .show que cuida do aparecimento dos carros						
							$(this).fadeIn(500).addClass('show');
	
	//E se não estiver no array remove a class .show com um fadeout
						} else {
							$(this).fadeOut(500).removeClass('show');
						}
					});
				}
		
				// Se "Todas as décadas" estiver marcado, mostrar todos os carros
				if ($('#item1').is(':checked')) {
					$('.vitrine-destaque').fadeIn(500).addClass('show');
			}
		});
	});
