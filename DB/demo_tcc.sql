-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 98.81.237.69    Database: tcc
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `rm` int NOT NULL AUTO_INCREMENT,
  `nome` tinytext NOT NULL,
  `id_curso` int NOT NULL,
  `telefone` char(11) NOT NULL,
  PRIMARY KEY (`rm`)
) ENGINE=InnoDB AUTO_INCREMENT=221060 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (221001,'Cauã Portugal',3,'123456'),(221002,'Helena Cordeiro',2,'123456'),(221003,'Matheus Antonio',4,'123456'),(221004,'Julio Barroso',3,'123456'),(221006,'Sophia Santos',2,'123456'),(221059,'Iago Fragnan',1,'123456');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autores`
--

DROP TABLE IF EXISTS `autores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autores`
--

LOCK TABLES `autores` WRITE;
/*!40000 ALTER TABLE `autores` DISABLE KEYS */;
INSERT INTO `autores` VALUES (1,'Machado De Assis'),(2,'José de Alencar'),(3,'Miguel de Cervantes'),(4,'Antoine de Saint-Exupéry'),(5,'George Orwell'),(6,'Fernando Pessoa'),(7,' Igor Zhirkov'),(8,'Edward Allen'),(9,'Newton C. Braga'),(10,'Roberto Cunha Neto');
/*!40000 ALTER TABLE `autores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_emprestimo` int NOT NULL,
  `id_livro` int NOT NULL,
  `rm_aluno` int NOT NULL,
  `avaliacao` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (1,1,1,221001,3),(2,2,51,221001,0),(3,3,51,221001,4),(4,4,49,221001,2),(5,5,2,221002,-1),(6,6,1,201001,-1),(7,7,3,201001,-1),(8,9,4,221001,-1),(9,10,1,221001,-1),(10,11,4,221001,-1),(11,12,6,221001,-1),(12,13,4,221001,-1),(13,14,4,221002,-1),(14,15,4,221002,-1),(15,1,1,221001,-1),(16,2,2,221005,-1),(17,3,2,221003,-1),(18,4,1,221001,-1),(19,5,2,221001,2),(20,6,3,221001,3),(21,7,13,221002,1),(22,8,6,221003,-1),(23,9,2,221001,4),(24,10,29,221004,-1),(25,11,27,221004,-1),(26,12,13,221006,-1),(27,13,4,221001,2),(28,14,2,221004,-1),(29,15,4,221004,-1),(30,1,1,221001,-1),(31,2,2,221001,-1),(32,3,26,221001,-1),(33,4,24,221059,-1),(34,5,1,221002,-1),(35,6,3,221003,-1),(36,7,4,221004,-1),(37,8,27,221002,-1);
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bibliotecarias`
--

DROP TABLE IF EXISTS `bibliotecarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bibliotecarias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bibliotecarias`
--

LOCK TABLES `bibliotecarias` WRITE;
/*!40000 ALTER TABLE `bibliotecarias` DISABLE KEYS */;
INSERT INTO `bibliotecarias` VALUES (1,'Ana Beatriz'),(2,'Laura Neves'),(3,'Marcia Nunes'),(5,'Laura Neves'),(7,'Rosângela');
/*!40000 ALTER TABLE `bibliotecarias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_logs`
--

DROP TABLE IF EXISTS `c_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `c_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `autor` text NOT NULL,
  `acao` tinytext NOT NULL,
  `sujeito` int NOT NULL,
  `tipo_sujeito` int NOT NULL,
  `efetivado` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordenador_cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_coordenador` int NOT NULL,
  `id_curso` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordenadores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` tinytext NOT NULL,
  `telefone` char(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordenadores`
--

LOCK TABLES `coordenadores` WRITE;
/*!40000 ALTER TABLE `coordenadores` DISABLE KEYS */;
INSERT INTO `coordenadores` VALUES (1,'Jalam','14996778617');
/*!40000 ALTER TABLE `coordenadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ano` int NOT NULL,
  `curso` varchar(80) NOT NULL,
  `periodo` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,2022,'Desenvolvimento de Sistemas','Integral'),(2,2022,'Administração','Integral'),(3,2022,'Mecatronica','Integral'),(4,2022,'Edificações','Integral');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editoras`
--

DROP TABLE IF EXISTS `editoras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editoras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `editora` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editoras`
--

LOCK TABLES `editoras` WRITE;
/*!40000 ALTER TABLE `editoras` DISABLE KEYS */;
INSERT INTO `editoras` VALUES (1,'Companhia das Letras'),(2,'Intrínseca'),(3,'Record'),(4,'Rocco'),(5,'Cia. Editora Nacional'),(6,'Grupo Editorial Record'),(7,'Sextante'),(8,'HarperCollins Brasil'),(9,'Editora Objetiva'),(10,'Aleph'),(11,'Planeta'),(12,'Gente'),(13,'Editora Globo'),(14,'Editora Prumo'),(15,'Panda Books'),(17,'Partido Comunista'),(18,'eclessiae'),(19,'Martin Claret'),(20,'Penguin Classics'),(21,'Agir'),(22,'Outro');
/*!40000 ALTER TABLE `editoras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimos`
--

DROP TABLE IF EXISTS `emprestimos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rm` int NOT NULL,
  `id_livro` int NOT NULL,
  `data_aluguel` date NOT NULL,
  `id_status_emprestimo` int NOT NULL,
  `prazo` int NOT NULL,
  `renovacao` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimos`
--

LOCK TABLES `emprestimos` WRITE;
/*!40000 ALTER TABLE `emprestimos` DISABLE KEYS */;
INSERT INTO `emprestimos` VALUES (3,221001,26,'2022-02-10',2,21,1),(4,221059,24,'2024-11-16',1,21,1),(5,221002,1,'2024-09-05',1,14,1),(6,221003,3,'2024-10-13',4,21,1),(7,221004,4,'2024-05-23',3,14,1),(8,221002,27,'2024-10-16',3,14,1);
/*!40000 ALTER TABLE `emprestimos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_emprestimos`
--

DROP TABLE IF EXISTS `estado_emprestimos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_emprestimos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genero` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Educação'),(2,'Tecnologia'),(3,'Ficção'),(4,'Ficção Científica'),(5,'Fantasia'),(6,'Romance'),(7,'Mistério'),(8,'Terror'),(9,'Biografia'),(10,'História'),(11,'Aventura'),(12,'Poesia'),(13,'Autoajuda'),(14,'Clássicos'),(15,'Drama'),(16,'Comédia'),(17,'Infantil'),(18,'Literatura Estrangeira'),(19,'Tecnologia'),(20,'Matemática'),(21,'Física'),(22,'Química'),(23,'Biologia'),(24,'Engenharia'),(25,'Ciência da Computação'),(26,'Medicina'),(27,'Direito'),(28,'Economia'),(29,'Administração'),(30,'Psicologia'),(31,'Sociologia'),(32,'Filosofia'),(33,'Educação'),(34,'Linguística'),(35,'Arquitetura'),(36,'Agronomia'),(37,'Enfermagem'),(38,'Nutrição'),(39,'Geografia'),(40,'História da Arte'),(41,'Ciências Políticas'),(42,'Literatura Científica'),(43,'Estatística'),(46,'Edificações'),(47,'Mecatrônica'),(48,'Administração'),(49,'Desenvolvimento de Sistemas'),(50,'Enfermagem');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos_livros`
--

DROP TABLE IF EXISTS `generos_livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos_livros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_livro` int NOT NULL,
  `id_genero` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos_livros`
--

LOCK TABLES `generos_livros` WRITE;
/*!40000 ALTER TABLE `generos_livros` DISABLE KEYS */;
INSERT INTO `generos_livros` VALUES (1,1,2),(2,4,29),(3,6,29),(4,5,11),(5,2,23),(6,3,11),(7,14,13),(8,14,29),(9,20,9),(10,21,35),(11,22,9),(12,23,12),(13,24,2),(14,25,46),(15,26,47),(16,27,29);
/*!40000 ALTER TABLE `generos_livros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livros`
--

DROP TABLE IF EXISTS `livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(8) NOT NULL,
  `titulo` tinytext NOT NULL,
  `id_autor` int NOT NULL,
  `id_editora` int NOT NULL,
  `capa` tinytext NOT NULL,
  `volumes` int NOT NULL,
  `volumes_reservado` int NOT NULL DEFAULT '0',
  `sinopse` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livros`
--

LOCK TABLES `livros` WRITE;
/*!40000 ALTER TABLE `livros` DISABLE KEYS */;
INSERT INTO `livros` VALUES (1,'LZJ1088','Dom Casmurro',1,1,'https://m.media-amazon.com/images/I/61Z2bMhGicL._AC_UF1000,1000_QL80_.jpg',2,2,'Em Dom Casmurro, Bentinho narra sua vida, obcecado pela suspeita da traição de Capitu com Escobar.  A infância, o amor, o casamento e a crescente desconfiança corroem sua alma, culminando numa amarga certeza, ou talvez, numa dúvida eterna.\r\n'),(2,'XWM0467','Iracema',2,19,'https://m.media-amazon.com/images/I/71LCDi6E2oL.jpg',1,1,'No Ceará colonial, a índia Iracema, de beleza excepcional, se apaixona pelo branco Martim.  Deste amor nasce Moacir, o primeiro cearense.  A paixão, porém, enfrenta a fúria dos tabajaras e o conflito entre dois mundos.  Iracema, símbolo da natureza brasileira, sacrifica-se por seu amor.\r\n'),(3,'MVL9808','Dom Quixote',3,20,'https://m.media-amazon.com/images/I/51a+t6XaYZS._AC_UF1000,1000_QL80_.jpg',2,1,'Em La Mancha, vive Alonso Quixano, um hidalgo que, lendo romances de cavalaria, se autoproclama Dom Quixote.  Com seu escudeiro Sancho Pança, parte em busca de aventuras, confundindo moinhos com gigantes e ovelhas com exércitos, em hilariantes e trágicas jornadas que questionam a realidade e a fantasia.\r\n'),(4,'TIO1072','O Pequeno Príncipe',4,21,'https://m.media-amazon.com/images/I/71LJ4k-k9hL._AC_UF1000,1000_QL80_.jpg',1,1,'Um aviador, perdido no deserto do Saara, encontra um pequeno príncipe vindo de um asteroide.  Juntos, embarcam em uma jornada existencial, visitando outros planetas e encontrando personagens excêntricos.  O príncipe revela a essência da vida, do amor e da amizade, ensinando ao aviador a importância do que realmente importa.\r\n'),(5,'CFN2717','1984',5,1,'https://m.media-amazon.com/images/I/511vWdI8zKL._AC_UF1000,1000_QL80_.jpg',2,0,'Em Oceania, Winston Smith luta contra o Grande Irmão e o Partido, sonhando com liberdade e amor em um mundo de vigilância totalitária.  Julia, sua amante, compartilha seus riscos, mas a ameaça implacável da tortura e da  reeducação os espreita. A busca pela verdade se torna uma luta desesperada pela própria sobrevivência.\r\n'),(23,'FVA4248','Mensagem',6,10,'https://m.media-amazon.com/images/I/71t44Zn1gLL._AC_UF1000,1000_QL80_.jpg',7,0,''),(24,'SQE1365','Programação em Baixo Nível',7,22,'https://m.media-amazon.com/images/I/81K7ZVB9QvL._UF1000,1000_QL80_.jpg',2,1,'Igor Zhirkov desvenda os segredos da programação em baixo nível, explorando arquiteturas de computadores, linguagens assembly e gestão de memória.  Aprenda a otimizar o desempenho e a interagir diretamente com o hardware, dominando conceitos fundamentais para programadores experientes.  Um guia essencial para quem busca um controle absoluto sobre o software.\r\n'),(25,'QYF8056','Fundamentos da Engenharia de Edificações',8,22,'https://m.media-amazon.com/images/I/91RI3tQkHkL._UF1000,1000_QL80_.jpg',2,0,'Edward Allen desvenda os fundamentos da Engenharia de Edificações, guiando o leitor pelos princípios de projeto, construção e gestão de obras.  Abrange desde materiais e estruturas até orçamento e sustentabilidade, preparando o futuro engenheiro para os desafios da profissão.  Um guia essencial e completo para iniciantes.\r\n'),(26,'BVU7951',' Manual de Mecatrônica',9,22,'https://m.media-amazon.com/images/I/61On5qCi4hL._AC_UF1000,1000_QL80_.jpg',2,1,'Newton C. Braga, mestre da eletrônica, descomplica a mecatrônica neste manual prático.  Aprenda sobre projetos, robótica, automação e muito mais, com explicações claras e ilustrações didáticas, ideal para iniciantes e entusiastas. Domine a união perfeita entre mecânica e eletrônica!\r\n'),(27,'OWD1811','Administração: da teoria à prática para o sucesso',10,22,'http://prodimage.images-bn.com/pimages/9786555367140_p0_v1_s1200x630.jpg',3,1,'Roberto Cunha Neto desvenda a administração, da teoria à prática.  Aprenda conceitos essenciais e veja como aplicá-los no dia a dia para alcançar o sucesso profissional e empresarial, com exemplos práticos e  cases de sucesso.  Domine as ferramentas e estratégias para  gerenciar equipes e projetos com excelência.\r\n');
/*!40000 ALTER TABLE `livros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rm_aluno` int NOT NULL,
  `id_emprestimo` int NOT NULL,
  `data_envio` datetime NOT NULL,
  `iteracao` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_sujeito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
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
-- Dumping events for database 'tcc'
--

--
-- Dumping routines for database 'tcc'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-16 23:06:05
