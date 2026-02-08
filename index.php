<!DOCTYPE html>

<html lang="pt-br">

	<head>
		<title>Home</title>
		<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
		<link rel="shortcut icon" type="image-x/png" href="logo.ico"/>
		<meta charset="utf-8"/>
		<meta name="description" content="Descrição do meu site."/>
		<meta name="keywords" content="palavras,separadas,por,virgula."/>
		<meta name="author" content="Marcelo"/>
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/>
		<link rel="stylesheet" type="text/css" href="fontawesome/css/all.min.css">
		<link href="css/style.css" rel="stylesheet" type="text/css">
	</head>

	<body>

	<header>

		<div class="container-1">

			<div class="logo">
				<img src="imagens/logo.jpg"/>
				<div class="logo-texto">
				<h1>RM</h1>
				<h2>VEÍCULOS<br/><span>
				ESPECIAIS</span></h2>
				</div><!--logo-texto-->
			</div><!--logo-->

			<nav class="desktop">
				<ul>
					<li><a href="index">Home</a></li>
					<li><a href="vendas">Venda</a></li>
					<li><a href="">Galeria</a></li>
					<li><a href="">Eventos</a></li>
					<li><a href="sobre">Sobre Nós</a></li>
					<li><a goto="contato" href="">Contato</a></li>
				</ul>
			</nav><!--desktop-->

			<nav class="mobile">
				<ul>
					<li><a href="index">Home</a></li>
					<li><a href="vendas">Venda</a></li>
					<li><a href="">Galeria</a></li>
					<li><a href="">Eventos</a></li>
					<li><a href="sobre">Sobre Nós</a></li>
					<li><a goto="contato" href="">Contato</a></li>
				</ul>
			</nav><!--mobile-->

		</div><!--container-1-->
		
	</header>

<?php
	if(isset($_GET['url'])){
		if(file_exists($_GET['url']).'.html'){
			include($_GET['url'].'.html');
		}else{
			include('404.html');
		}
	}else{
		include('index.html');
	}
?>

	<footer>
		<div class="container-4">

			<nav>
				<ul>
					<li><a href="index">Home</a></li>
					<li><a href="vendas">Venda</a></li>
					<li><a href="">Galeria</a></li>
					<li><a href="">Eventos</a></li>
					<li><a href="sobre">Sobre Nós</a></li>
					<li><a goto="contato" href="">Contato</a></li>
				</ul>
			</nav>
			<p>Todos os Direitos Reservados</p>

<div class="clear"></div><!--clear-->

		</div><!--container-4-->
	</footer>

	<script src="js/jquery.js"></script>
	<script src="js/functions.js"></script>

	</body>

</html>


