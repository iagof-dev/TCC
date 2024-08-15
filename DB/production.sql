-- MySQL dump 10.19  Distrib 10.3.39-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: tccapi
-- ------------------------------------------------------
-- Server version	10.3.39-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alunos` (
  `rm` int(6) NOT NULL AUTO_INCREMENT,
  `nome` tinytext NOT NULL,
  `id_curso` int(11) NOT NULL,
  `telefone` char(11) NOT NULL,
  PRIMARY KEY (`rm`)
) ENGINE=InnoDB AUTO_INCREMENT=2210004 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (221001,'João Silva',1,'14991379469'),(221002,'Maria Santos',2,'23456789012'),(221003,'Carlos Pereira',3,'34567890123');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'Carlos Drummond'),(2,'Clarice Lispector'),(3,'Jeff Kinney'),(19,'Fernando Pessoa'),(20,'Jean Jacque Exupery'),(21,'Markus Suzak'),(22,'Jane Austen'),(23,'Sun Tzu');
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avaliacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_emprestimo` int(11) NOT NULL,
  `id_livro` int(11) NOT NULL,
  `rm_aluno` int(11) NOT NULL,
  `avaliacao` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (1,1,1,221001,2),(2,2,51,221001,3),(3,3,51,221001,1);
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bibliotecarias`
--

DROP TABLE IF EXISTS `bibliotecarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bibliotecarias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` tinytext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bibliotecarias`
--

LOCK TABLES `bibliotecarias` WRITE;
/*!40000 ALTER TABLE `bibliotecarias` DISABLE KEYS */;
INSERT INTO `bibliotecarias` VALUES (1,'Ana Beatriz'),(2,'Laura Neves'),(3,'Iago F.'),(5,'Laura Neves');
/*!40000 ALTER TABLE `bibliotecarias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_logs`
--

DROP TABLE IF EXISTS `c_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autor` text NOT NULL,
  `acao` tinytext NOT NULL,
  `sujeito` int(11) NOT NULL,
  `tipo_sujeito` int(11) NOT NULL,
  `efetivado` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_logs`
--

LOCK TABLES `c_logs` WRITE;
/*!40000 ALTER TABLE `c_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordenador_cursos`
--

DROP TABLE IF EXISTS `coordenador_cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coordenador_cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_coordenador` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordenador_cursos`
--

LOCK TABLES `coordenador_cursos` WRITE;
/*!40000 ALTER TABLE `coordenador_cursos` DISABLE KEYS */;
INSERT INTO `coordenador_cursos` VALUES (1,1,1),(2,1,2);
/*!40000 ALTER TABLE `coordenador_cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordenadores`
--

DROP TABLE IF EXISTS `coordenadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coordenadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` tinytext NOT NULL,
  `telefone` char(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordenadores`
--

LOCK TABLES `coordenadores` WRITE;
/*!40000 ALTER TABLE `coordenadores` DISABLE KEYS */;
INSERT INTO `coordenadores` VALUES (1,'Roberto Carlos','1122334455');
/*!40000 ALTER TABLE `coordenadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ano` int(11) NOT NULL,
  `curso` varchar(80) NOT NULL,
  `periodo` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,2023,'Desenvolvimento de Sistemas','Matutino'),(2,2023,'Informatica','Vespertino'),(3,2023,'Enfermagem','Noturno'),(4,2023,'Mecatronica','Integral'),(5,2023,'Eletronica','Matutino'),(6,2023,'Administração','Vespertino'),(7,2023,'Edificações','Noturno');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editoras`
--

DROP TABLE IF EXISTS `editoras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `editoras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `editora` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editoras`
--

LOCK TABLES `editoras` WRITE;
/*!40000 ALTER TABLE `editoras` DISABLE KEYS */;
INSERT INTO `editoras` VALUES (1,'Editora Alpha'),(2,'Editora Beta'),(3,'Editora Sigma'),(4,'Companhia da Letras');
/*!40000 ALTER TABLE `editoras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimos`
--

DROP TABLE IF EXISTS `emprestimos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emprestimos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rm` int(11) NOT NULL,
  `id_livro` int(11) NOT NULL,
  `data_aluguel` date NOT NULL,
  `id_status_emprestimo` int(2) NOT NULL,
  `prazo` int(11) NOT NULL,
  `renovacao` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimos`
--

LOCK TABLES `emprestimos` WRITE;
/*!40000 ALTER TABLE `emprestimos` DISABLE KEYS */;
INSERT INTO `emprestimos` VALUES (1,221001,1,'2024-08-08',2,14,1),(2,221001,51,'2024-08-08',3,14,1),(3,221001,51,'2024-08-08',1,21,1);
/*!40000 ALTER TABLE `emprestimos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_emprestimos`
--

DROP TABLE IF EXISTS `estado_emprestimos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_emprestimos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` tinytext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_emprestimos`
--

LOCK TABLES `estado_emprestimos` WRITE;
/*!40000 ALTER TABLE `estado_emprestimos` DISABLE KEYS */;
INSERT INTO `estado_emprestimos` VALUES (1,'pendente'),(2,'atrasado'),(3,'devolvido'),(4,'perdido');
/*!40000 ALTER TABLE `estado_emprestimos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `genero` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Educação'),(2,'Tecnologia'),(99,'Ficção');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos_livros`
--

DROP TABLE IF EXISTS `generos_livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generos_livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_livro` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos_livros`
--

LOCK TABLES `generos_livros` WRITE;
/*!40000 ALTER TABLE `generos_livros` DISABLE KEYS */;
INSERT INTO `generos_livros` VALUES (1,1,1),(2,2,2),(3,1,2),(5,44,2),(6,44,1),(7,44,99),(8,45,99),(9,45,1),(10,45,99),(11,45,1),(12,45,1),(13,45,99),(14,48,1),(15,48,99),(16,49,99),(17,49,1),(18,49,1),(19,49,99),(20,51,1),(21,51,99),(22,0,99),(23,0,2),(24,0,2),(25,0,99),(26,0,99),(27,0,2),(28,0,2),(29,0,99),(30,0,99),(31,0,2),(32,0,99),(33,0,1),(34,0,99),(35,0,1),(36,0,1),(37,0,99),(38,0,1),(39,0,99),(40,0,99),(41,0,1),(42,0,1),(43,0,2),(44,0,1),(45,66,99),(46,67,99),(47,68,99),(48,69,99),(49,69,1),(50,70,99),(51,71,1),(52,72,1),(53,73,1),(54,74,1),(55,75,99),(56,76,99),(57,77,2),(58,78,2),(59,79,1),(60,80,1),(61,81,1),(62,0,1),(63,82,1),(64,83,99),(65,84,1);
/*!40000 ALTER TABLE `generos_livros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livros`
--

DROP TABLE IF EXISTS `livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(8) NOT NULL,
  `titulo` tinytext NOT NULL,
  `id_autor` int(11) NOT NULL,
  `id_editora` int(11) NOT NULL,
  `capa` tinytext NOT NULL,
  `volumes` int(11) NOT NULL,
  `volumes_reservado` int(11) NOT NULL,
  `sinopse` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livros`
--

LOCK TABLES `livros` WRITE;
/*!40000 ALTER TABLE `livros` DISABLE KEYS */;
INSERT INTO `livros` VALUES (2,'L002','Programação Avançada em Linux',1,1,'https://cdn.dlojavirtual.com/static1/102704/sku/informatica-livro-programacao-avancada-em-linux-1707774500502.jpg',99999,5,'\"Programação Avançada em Linux\" é um guia abrangente e prático para desenvolvedores que desejam aprofundar seus conhecimentos no ambiente Linux. Escrito por Gleicon da Silva Moraes, um especialista renomado na área, este livro mergulha nos aspectos mais avançados da programação para Linux, oferecendo insights valiosos e técnicas essenciais para dominar a plataforma. Desde o entendimento detalhado do kernel até a implementação de sistemas distribuídos e técnicas avançadas de depuração, cada capítulo é projetado para desafiar e expandir o conhecimento do leitor, permitindo-lhes criar aplicativos robustos e eficientes para o ecossistema Linux. Com exemplos de código claros e exercícios práticos, este livro é tanto um recurso de referência essencial quanto um guia de aprendizado indispensável para qualquer desenvolvedor que deseje se destacar na programação avançada em Linux.'),(49,'WMN3231','Diario de um Banana',1,1,'https://m.media-amazon.com/images/I/91VEsOcU2YL._AC_UF1000,1000_QL80_.jpg',99999,1,'Houve um erro na resposta da API (openai-3.5-gpt-unfiltered)'),(51,'LNG8465','1984',1,1,'https://m.media-amazon.com/images/I/61HtBosDhwL._AC_UF1000,1000_QL80_.jpg',99999,3,'Houve um erro na resposta da API (openai-3.5-gpt-unfiltered)'),(69,'ZMI7859','O Pequeno Príncipe',20,14,'https://m.media-amazon.com/images/I/71LJ4k-k9hL._AC_UF1000,1000_QL80_.jpg',99999,0,'Houve um erro na resposta da API (openai-3.5-gpt-turbo)'),(75,'SPN4672','A menina que roubava livros',21,14,'https://m.media-amazon.com/images/I/61L+4OBhm-L._AC_UF1000,1000_QL80_.jpg',99999,0,''),(79,'FSM7767','machado',3,2,'https://m.media-amazon.com/images/I/614LvEt36dS._AC_UF350,350_QL80_.jpg',70,0,''),(80,'ZIV2005','machado',3,2,'https://m.media-amazon.com/images/I/614LvEt36dS._AC_UF350,350_QL80_.jpg',70,0,''),(81,'YVP5118','futebol',1,1,'undefined',8,0,'Na saga \"Coração de Campeão\", reclame pelos phens da vitória como Leonardo, um talentoso jogador cuja carreira sofre anseios e desafios após a promessa Ronaldo. Envolto em fúrgues entre o sucesso na Europa e as pressões do futebol nacional, ele enfrenta rivalidades traçoeiras, amores turbulentos e o peso das expectativas de uma nação futebolística. Com a ajuda de sua cautelosa namorada Isabella e ao lado dos companheiros inquebráveis Diego e Marcos, Leo relembra-se do verdadeiro significado do jogo - união, paixão e triunfo sobre adversidades. Uma história que celebra cada corrida sob os travesseiros até a conquista final.'),(82,'MXV1413','A Fé Explicada',2,3,'undefined',4,0,' baseada no livro \"A Fé Explicada\" de John Lennox, a sinopse seria:\r\n\r\nNo libro \"A Fé Explicada\", o filósofo cristão e matemático John Lennox desafia uma série de mitos científicos modernos que questionam a necessidade ou racionalidade da fé religiosa. Ao longo das páginas, ele discute a ciência versus superstição, argumentando que nem toda explicação natural exclui completamente o espaço para Deus como um fenômeno transcendente. Utilizando exemplos históricos e contemporâneos, incluzindo conversas imaginárias com figuras científicas famintes - like Charles Darwin e Richard Dawkins - Lennox defende que confiança na razão não preclui o exercício do entendimento místico ni fé batizada. O leitor é convidado a explorar se há argumentos convincentes para acreditar na existência de algo além do universo observável, sugerindo que verdadeira ciência e bem fundamentadas podem coexistir com crenças espirituais sustentadas (200 caracteres).'),(83,'IUL0284','Orgulho e Preconceito',22,1,'undefined',7,0,'\"Orgulho e Preconceito\", reimaginado em um cenário contemporâneo, segue Elizabeth Bennet, uma jovem independente e inteligente, nas suas interações com a rica e aristocrática família Darcy. As primeiras impressões equivocadas de ambos levam a mal-entendidos e preconceitos recíprocos. Através das emergentes amizades na pequena aldeia inglesa de Hunsford e os eventos sociais pulsantes de London Town, o leitor é embora em una narrativa que explora as complexidades da fé misópica tradicionalista versus novos ideais revolucionários do século XIX. Com personagens memoráveis como Mr. Darcy, Mr. Bingley, Lydia Bennet e Lady Catherine De Bourgh entre outros receioados dos temperamentos desencadeados pelas diferenças sociais e financeiras, \"Orgulho e Preconceito\" oferece uma cronologia envolvente que questiona prejudicios existentes enquanto conta uma história cambaleante de amor perseguido.\"'),(84,'XVB2404','A Arte da Guerra',23,1,'undefined',100,0,'Ótima escolha! \"A Arte da Guerra\" (!The Art of War!) de Sun Tzu é um clássico estratégico militar, escrito pelo filósofo chinês Sun Wu c. 500 a.C.. A sinopse dessa obra inclui princípios fundamentais e táticas para a conquista do sucesso em qualquer forma de confronto, seja militar ou na vida cotidiana. Ela aborda conceitos como o importância da inteligência sobre a força bruta, o valor da surpresa e da espionagem, além de estratégias para demoralizar o inimigo sem recorrer ao combate direto. Os capítulos trazem reflexões profundas over mensuráveis que podem ser aplicados tanto no campo de batalha quanto nos negócios modernos e situações pessoais complexas. Este livro é essencial para líderes políticos, militares e empresariais que buscam dominar as dinâmicas do poder e dos confrontos iminentes (200 caracteres).');
/*!40000 ALTER TABLE `livros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rm_aluno` int(11) NOT NULL,
  `id_emprestimo` int(11) NOT NULL,
  `data_envio` datetime NOT NULL,
  `iteracao` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacoes`
--

LOCK TABLES `notificacoes` WRITE;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_sujeito`
--

DROP TABLE IF EXISTS `tipo_sujeito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_sujeito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_sujeito`
--

LOCK TABLES `tipo_sujeito` WRITE;
/*!40000 ALTER TABLE `tipo_sujeito` DISABLE KEYS */;
INSERT INTO `tipo_sujeito` VALUES (1,'livro'),(2,'emprestimo'),(3,'autor'),(4,'generos');
/*!40000 ALTER TABLE `tipo_sujeito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tccapi'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-14 21:02:40
