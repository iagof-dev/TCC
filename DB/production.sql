-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 15/09/2024 às 16:55
-- Versão do servidor: 10.3.39-MariaDB
-- Versão do PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tccapi`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `alunos`
--

CREATE TABLE `alunos` (
  `rm` int(6) NOT NULL,
  `nome` tinytext NOT NULL,
  `id_curso` int(11) NOT NULL,
  `telefone` char(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `alunos`
--

INSERT INTO `alunos` (`rm`, `nome`, `id_curso`, `telefone`) VALUES
(221001, 'João Silva', 1, '14991379469'),
(221002, 'Maria Santos', 2, '14996582430'),
(221003, 'Geraldo Guilherme Marcos Cavalcanti', 3, '14991798614'),
(221004, 'Ricardo Ruan Almeida', 2, '14991335012'),
(221005, 'Nicole Clarice Isabella Moura', 1, '14910052520'),
(221006, 'Zeca gado', 1, '11973470563');

-- --------------------------------------------------------

--
-- Estrutura para tabela `autores`
--

CREATE TABLE `autores` (
  `id` int(11) NOT NULL,
  `nome` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `autores`
--

INSERT INTO `autores` (`id`, `nome`) VALUES
(1, 'Carlos Drummond'),
(2, 'Clarice Lispector'),
(3, 'Jeff Kinney'),
(19, 'Fernando Pessoa'),
(21, 'Markus Suzak'),
(22, 'Jane Austen'),
(23, 'Sun Tzu'),
(24, 'Bernhard Schlink'),
(25, 'José Mauro de Vasconcelos'),
(26, 'Jane Hawking'),
(28, 'Machado de Assis'),
(29, 'Lenin'),
(30, 'Marx'),
(32, 'John Green'),
(33, 'paia'),
(34, 'Jean Jacque Exupery'),
(35, 'teste teste teste');

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacoes`
--

CREATE TABLE `avaliacoes` (
  `id` int(11) NOT NULL,
  `id_emprestimo` int(11) NOT NULL,
  `id_livro` int(11) NOT NULL,
  `rm_aluno` int(11) NOT NULL,
  `avaliacao` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `avaliacoes`
--

INSERT INTO `avaliacoes` (`id`, `id_emprestimo`, `id_livro`, `rm_aluno`, `avaliacao`) VALUES
(1, 1, 1, 221001, 3),
(2, 2, 51, 221001, 0),
(3, 3, 51, 221001, 4),
(4, 4, 49, 221001, 2),
(5, 5, 2, 221002, -1),
(6, 6, 1, 201001, -1),
(7, 7, 3, 201001, -1),
(8, 9, 4, 221001, -1),
(9, 10, 1, 221001, -1),
(10, 11, 4, 221001, -1),
(11, 12, 6, 221001, -1),
(12, 13, 4, 221001, -1),
(13, 14, 4, 221002, -1),
(14, 15, 4, 221002, -1),
(15, 1, 1, 221001, -1),
(16, 2, 2, 221005, -1),
(17, 3, 2, 221003, -1),
(18, 4, 1, 221001, -1),
(19, 5, 2, 221001, 2),
(20, 6, 3, 221001, 3),
(21, 7, 13, 221002, 1),
(22, 8, 6, 221003, -1),
(23, 9, 2, 221001, 4),
(24, 10, 29, 221004, -1),
(25, 11, 27, 221004, -1),
(26, 12, 13, 221006, -1),
(27, 13, 4, 221001, 2),
(28, 14, 2, 221004, -1),
(29, 15, 4, 221004, -1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `bibliotecarias`
--

CREATE TABLE `bibliotecarias` (
  `id` int(11) NOT NULL,
  `nome` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `bibliotecarias`
--

INSERT INTO `bibliotecarias` (`id`, `nome`) VALUES
(1, 'Ana Beatriz'),
(2, 'Laura Neves'),
(3, 'Marcia Nunes'),
(5, 'Laura Neves'),
(7, 'Rosângela');

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordenadores`
--

CREATE TABLE `coordenadores` (
  `id` int(11) NOT NULL,
  `nome` tinytext NOT NULL,
  `telefone` char(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `coordenadores`
--

INSERT INTO `coordenadores` (`id`, `nome`, `telefone`) VALUES
(1, 'Jalam', '14996778617');

-- --------------------------------------------------------

--
-- Estrutura para tabela `coordenador_cursos`
--

CREATE TABLE `coordenador_cursos` (
  `id` int(11) NOT NULL,
  `id_coordenador` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `coordenador_cursos`
--

INSERT INTO `coordenador_cursos` (`id`, `id_coordenador`, `id_curso`) VALUES
(1, 1, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `ano` int(11) NOT NULL,
  `curso` varchar(80) NOT NULL,
  `periodo` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `cursos`
--

INSERT INTO `cursos` (`id`, `ano`, `curso`, `periodo`) VALUES
(1, 2023, 'Desenvolvimento de Sistemas', 'Matutino'),
(2, 2023, 'Informatica', 'Vespertino'),
(3, 2023, 'Enfermagem', 'Noturno'),
(4, 2023, 'Mecatronica', 'Integral'),
(5, 2023, 'Eletronica', 'Matutino'),
(6, 2023, 'Administração', 'Vespertino'),
(7, 2023, 'Edificações', 'Noturno');

-- --------------------------------------------------------

--
-- Estrutura para tabela `c_logs`
--

CREATE TABLE `c_logs` (
  `id` int(11) NOT NULL,
  `autor` text NOT NULL,
  `acao` tinytext NOT NULL,
  `sujeito` int(11) NOT NULL,
  `tipo_sujeito` int(11) NOT NULL,
  `efetivado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `editoras`
--

CREATE TABLE `editoras` (
  `id` int(11) NOT NULL,
  `editora` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `editoras`
--

INSERT INTO `editoras` (`id`, `editora`) VALUES
(1, 'Companhia das Letras'),
(2, 'Intrínseca'),
(3, 'Record'),
(4, 'Rocco'),
(5, 'Cia. Editora Nacional'),
(6, 'Grupo Editorial Record'),
(7, 'Sextante'),
(8, 'HarperCollins Brasil'),
(9, 'Editora Objetiva'),
(10, 'Aleph'),
(11, 'Planeta'),
(12, 'Gente'),
(13, 'Editora Globo'),
(14, 'Editora Prumo'),
(15, 'Panda Books'),
(17, 'Partido Comunista'),
(18, 'eclessiae');

-- --------------------------------------------------------

--
-- Estrutura para tabela `emprestimos`
--

CREATE TABLE `emprestimos` (
  `id` int(11) NOT NULL,
  `rm` int(11) NOT NULL,
  `id_livro` int(11) NOT NULL,
  `data_aluguel` date NOT NULL,
  `id_status_emprestimo` int(2) NOT NULL,
  `prazo` int(11) NOT NULL,
  `renovacao` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `emprestimos`
--

INSERT INTO `emprestimos` (`id`, `rm`, `id_livro`, `data_aluguel`, `id_status_emprestimo`, `prazo`, `renovacao`) VALUES
(5, 221005, 2, '2024-03-04', 3, 14, 0),
(7, 221002, 13, '2024-02-12', 2, 21, 1),
(8, 221003, 6, '2006-10-23', 4, 14, 0),
(9, 221001, 2, '2024-09-02', 1, 14, 0),
(10, 221004, 29, '2024-09-14', 1, 21, 1),
(11, 221004, 27, '2024-09-14', 1, 14, 1),
(12, 221006, 13, '1999-02-15', 2, -1, 1),
(13, 221001, 4, '2024-09-14', 1, 14, 1),
(14, 221004, 2, '2024-09-14', 1, 14, 1),
(15, 221004, 4, '2024-09-14', 1, 21, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `estado_emprestimos`
--

CREATE TABLE `estado_emprestimos` (
  `id` int(11) NOT NULL,
  `estado` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `estado_emprestimos`
--

INSERT INTO `estado_emprestimos` (`id`, `estado`) VALUES
(1, 'pendente'),
(2, 'atrasado'),
(3, 'devolvido'),
(4, 'perdido');

-- --------------------------------------------------------

--
-- Estrutura para tabela `generos`
--

CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `genero` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `generos`
--

INSERT INTO `generos` (`id`, `genero`) VALUES
(1, 'Educação'),
(2, 'Tecnologia'),
(3, 'Ficção'),
(4, 'Ficção Científica'),
(5, 'Fantasia'),
(6, 'Romance'),
(7, 'Mistério'),
(8, 'Terror'),
(9, 'Biografia'),
(10, 'História'),
(11, 'Aventura'),
(12, 'Poesia'),
(13, 'Autoajuda'),
(14, 'Clássicos'),
(15, 'Drama'),
(16, 'Comédia'),
(17, 'Infantil'),
(18, 'Literatura Estrangeira'),
(19, 'Tecnologia'),
(20, 'Matemática'),
(21, 'Física'),
(22, 'Química'),
(23, 'Biologia'),
(24, 'Engenharia'),
(25, 'Ciência da Computação'),
(26, 'Medicina'),
(27, 'Direito'),
(28, 'Economia'),
(29, 'Administração'),
(30, 'Psicologia'),
(31, 'Sociologia'),
(32, 'Filosofia'),
(33, 'Educação'),
(34, 'Linguística'),
(35, 'Arquitetura'),
(36, 'Agronomia'),
(37, 'Enfermagem'),
(38, 'Nutrição'),
(39, 'Geografia'),
(40, 'História da Arte'),
(41, 'Ciências Políticas'),
(42, 'Literatura Científica'),
(43, 'Estatística');

-- --------------------------------------------------------

--
-- Estrutura para tabela `generos_livros`
--

CREATE TABLE `generos_livros` (
  `id` int(11) NOT NULL,
  `id_livro` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `generos_livros`
--

INSERT INTO `generos_livros` (`id`, `id_livro`, `id_genero`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 1, 2),
(5, 44, 2),
(6, 44, 1),
(7, 44, 99),
(8, 45, 99),
(9, 45, 1),
(10, 45, 99),
(11, 45, 1),
(12, 45, 1),
(13, 45, 99),
(14, 48, 1),
(15, 48, 99),
(16, 49, 99),
(17, 49, 1),
(18, 49, 1),
(19, 49, 99),
(20, 51, 1),
(21, 22, 2),
(22, 22, 2),
(23, 22, 2),
(24, 22, 2),
(25, 21, 3),
(26, 21, 2),
(27, 0, 2),
(28, 0, 2),
(29, 0, 99),
(30, 0, 99),
(31, 0, 2),
(32, 0, 99),
(33, 0, 1),
(34, 0, 99),
(35, 0, 1),
(36, 0, 1),
(37, 0, 99),
(38, 0, 1),
(39, 0, 99),
(40, 0, 99),
(41, 0, 1),
(42, 0, 1),
(43, 0, 2),
(44, 0, 1),
(45, 66, 99),
(46, 67, 99),
(47, 68, 99),
(48, 69, 99),
(49, 69, 1),
(50, 70, 99),
(51, 71, 1),
(52, 72, 1),
(53, 73, 1),
(54, 74, 1),
(55, 75, 99),
(56, 76, 99),
(57, 77, 2),
(58, 78, 2),
(59, 79, 1),
(60, 80, 1),
(61, 81, 1),
(62, 0, 1),
(63, 82, 1),
(64, 83, 99),
(65, 84, 1),
(66, 85, 99),
(67, 86, 99),
(68, 87, 99),
(69, 88, 11),
(70, 89, 11),
(71, 90, 11),
(72, 91, 11),
(73, 80, 11),
(74, 6, 11),
(75, 7, 8),
(76, 8, 11),
(77, 9, 11),
(78, 10, 9),
(79, 11, 1),
(80, 11, 9),
(81, 11, 41),
(82, 12, 11),
(83, 13, 10),
(84, 14, 11),
(85, 26, -1),
(86, 27, 10),
(87, 28, 9),
(88, 0, 5),
(89, 0, 3),
(90, 29, 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `livros`
--

CREATE TABLE `livros` (
  `id` int(11) NOT NULL,
  `codigo` varchar(8) NOT NULL,
  `titulo` tinytext NOT NULL,
  `id_autor` int(11) NOT NULL,
  `id_editora` int(11) NOT NULL,
  `capa` tinytext NOT NULL,
  `volumes` int(11) NOT NULL,
  `volumes_reservado` int(11) NOT NULL DEFAULT 0,
  `sinopse` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `livros`
--

INSERT INTO `livros` (`id`, `codigo`, `titulo`, `id_autor`, `id_editora`, `capa`, `volumes`, `volumes_reservado`, `sinopse`) VALUES
(2, 'WMN3231', 'Diario de um Banana', 1, 1, 'https://m.media-amazon.com/images/I/91VEsOcU2YL._AC_UF1000,1000_QL80_.jpg', 99999, 4, 'Diário de um Banana é uma série de livros de comédia escrita por Jeff Kinney. A trama acompanha a vida de Greg Heffley, um adolescente comum que navega pelos desafios da escola e da adolescência. Contada em formato de diário, a história é repleta de ilustrações engraçadas que retratam suas desventuras com sua família, amigos e colegas de escola. Greg tenta lidar com a pressão social de ser \"popular\", mas seus planos muitas vezes falham de maneira hilária, levando a situações embaraçosas e divertidas. Com um humor leve e cheio de ironia, o livro é uma leitura envolvente e divertida para todas as idades.'),
(4, 'ZMI7859', 'O Pequeno Príncipe', 20, 14, 'https://m.media-amazon.com/images/I/71LJ4k-k9hL._AC_UF1000,1000_QL80_.jpg', 99999, 7, 'O Pequeno Príncipe, escrito por Antoine de Saint-Exupéry, é uma fábula filosófica e poética que narra a jornada de um jovem príncipe que explora diferentes planetas, encontrando várias figuras enigmáticas e aprendendo lições profundas sobre a vida, o amor e a solidão. A história começa quando um piloto, perdido no deserto do Saara após um acidente de avião, encontra o pequeno príncipe, um menino vindo de outro planeta. Ao longo de suas conversas, o príncipe compartilha suas experiências de encontros com adultos excêntricos e estranhos seres, revelando a essência das relações humanas e a importância de ver o mundo com os olhos do coração. Encantador e comovente, o livro é uma celebração da inocência infantil e da busca por significado no mundo.'),
(5, 'SPN4672', 'A menina que roubava livros', 21, 14, 'https://m.media-amazon.com/images/I/61L+4OBhm-L._AC_UF1000,1000_QL80_.jpg', 99999, 0, 'A Menina que Roubava Livros, escrito por Markus Zusak, é um romance ambientado na Alemanha nazista durante a Segunda Guerra Mundial, narrado de forma única pela própria Morte. A história acompanha Liesel Meminger, uma jovem que, após perder o irmão e ser separada da mãe, é acolhida por uma família adotiva em uma pequena cidade alemã. Liesel desenvolve uma paixão intensa por livros, começando a roubá-los para saciar sua sede de conhecimento e escapar da dura realidade que a cerca. Enquanto a guerra avança, sua vida se entrelaça com a de seu novo amigo Rudy e com Max, um judeu escondido por sua família. O livro explora o poder das palavras, a resiliência do espírito humano e os horrores e sacrifícios da guerra, trazendo uma mistura tocante de tristeza e esperança.'),
(6, 'ZDW1712', 'Alguma Poesia', 1, 2, 'https://m.media-amazon.com/images/I/51qnQ4qMNuL._AC_UF1000,1000_QL80_.jpg', 70, 2, 'Em \"Alguma Poesia\", Carlos Drummond de Andrade nos convida a uma jornada poética pela alma humana. Com versos simples e profundos, o autor explora temas como amor, solidão, esperança e o cotidiano, retratando a beleza e a fragilidade da vida. Através de poemas como \"A Flor e a Náusea\" e \"Confidência\", Drummond nos convida à reflexão sobre a nossa existência e a busca por sentido em um mundo caótico.\r\n'),
(7, 'YOG5578', 'A Teoria de Tudo', 26, 2, 'https://m.media-amazon.com/images/I/91lvgoflLsL._AC_UF1000,1000_QL80_.jpg', 70, 0, 'Jane Hawking narra a história de seu casamento com Stephen Hawking, o renomado físico, desde o início da doença que o imobilizou até sua luta contra a esclerose lateral amiotrófica (ELA). Um relato emocionante sobre amor, ciência e a força do espírito humano. \r\n'),
(11, 'IUA9414', 'O Estado e a Revolução', 29, 17, 'https://edipro.com.br/wp-content/uploads/2024/05/CAPA_O-Estado-e-a-revolucao-1.png', 70, 0, 'Em \"O Estado e a Revolução\", Lenin analisa a natureza do Estado e sua relação com a revolução, defendendo a necessidade da ditadura do proletariado para alcançar o comunismo. Através de uma análise crítica do marxismo, Lenin expõe as ideias de Marx sobre a superação do Estado e a construção de uma sociedade sem classes. A obra é uma leitura fundamental para compreender a revolução russa e o pensamento político de Lenin. \r\n'),
(13, 'BEB3263', 'Imperialismo, Estágio Superior do Capitalismo', 29, 7, 'https://m.media-amazon.com/images/I/91DoLmeZItL._AC_UF1000,1000_QL80_.jpg', 7, 2, 'Em \"Imperialismo, Estágio Superior do Capitalismo\", Lenin analisa a fase monopolista do capitalismo, mostrando como a busca por novos mercados e matérias-primas impulsiona a expansão imperialista. Através da exploração colonial, as potências capitalistas acumulam capital e intensificam as contradições internas do sistema, preparando o terreno para a revolução socialista. \r\n'),
(21, 'SGU1365', 'O Teorema Katherine', 32, 2, 'https://m.media-amazon.com/images/I/51bQOFNcKyL._AC_UF1000,1000_QL80_.jpg', 70, 0, 'O Teorema Katherine, escrito por John Green, é uma comédia romântica que segue Colin Singleton, um jovem prodígio que tem uma peculiaridade: já namorou dezenove garotas chamadas Katherine, e todas elas terminaram com ele. Após o fim do último relacionamento, Colin, afogado em suas decepções amorosas, parte em uma viagem com seu melhor amigo, Hassan, em busca de uma solução para sua dor. Durante a jornada, ele decide criar um teorema matemático que prevê o fim dos relacionamentos, na esperança de entender por que sempre é rejeitado. Ao longo do caminho, Colin descobre mais sobre si mesmo, a imprevisibilidade do amor e a importância de aceitar que nem tudo pode ser resolvido com lógica. Com uma narrativa leve e cheia de humor, o livro explora temas como amizade, identidade e a busca por significado na vida.'),
(27, 'QRQ8569', 'O Principezinho', 34, 3, 'http://www.magazine-hd.com/apps/wp/wp-content/uploads/2015/12/principezinho-capa.jpg', 7, 1, 'O Pequeno Príncipe, um menino de outro planeta, cai na Terra e encontra um piloto no deserto. Através de conversas e reflexões, o piloto descobre o valor da amizade, do amor e da importância de olhar para o essencial. Uma jornada emocionante sobre a busca pelo sentido da vida.\r\n'),
(29, 'GPL3407', 'Dom Casmurro', 2, 1, 'https://m.media-amazon.com/images/I/81XpG2iKTlL._AC_UF1000,1000_QL80_.jpg', 1, 1, '\"Dom Casmurro\" é um romance de Machado de Assis, não de Clarice Lispector. A obra narra a história de Bento Santiago, um homem que se questiona sobre a fidelidade de sua esposa, Capitu, após a morte de seu amigo e rival, Escobar.  A trama se desenvolve em meio a  suspeitas, lembranças e reflexões sobre a natureza do amor, da culpa e da memória.\r\n');

-- --------------------------------------------------------

--
-- Estrutura para tabela `notificacoes`
--

CREATE TABLE `notificacoes` (
  `id` int(11) NOT NULL,
  `rm_aluno` int(11) NOT NULL,
  `id_emprestimo` int(11) NOT NULL,
  `data_envio` datetime NOT NULL,
  `iteracao` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipo_sujeito`
--

CREATE TABLE `tipo_sujeito` (
  `id` int(11) NOT NULL,
  `tipo` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `tipo_sujeito`
--

INSERT INTO `tipo_sujeito` (`id`, `tipo`) VALUES
(1, 'livro'),
(2, 'emprestimo'),
(3, 'autor'),
(4, 'generos');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `alunos`
--
ALTER TABLE `alunos`
  ADD PRIMARY KEY (`rm`);

--
-- Índices de tabela `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `avaliacoes`
--
ALTER TABLE `avaliacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `bibliotecarias`
--
ALTER TABLE `bibliotecarias`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `coordenadores`
--
ALTER TABLE `coordenadores`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `coordenador_cursos`
--
ALTER TABLE `coordenador_cursos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `c_logs`
--
ALTER TABLE `c_logs`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `editoras`
--
ALTER TABLE `editoras`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `emprestimos`
--
ALTER TABLE `emprestimos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `estado_emprestimos`
--
ALTER TABLE `estado_emprestimos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `generos_livros`
--
ALTER TABLE `generos_livros`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `livros`
--
ALTER TABLE `livros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Índices de tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tipo_sujeito`
--
ALTER TABLE `tipo_sujeito`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alunos`
--
ALTER TABLE `alunos`
  MODIFY `rm` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2210006;

--
-- AUTO_INCREMENT de tabela `autores`
--
ALTER TABLE `autores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `avaliacoes`
--
ALTER TABLE `avaliacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `bibliotecarias`
--
ALTER TABLE `bibliotecarias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `coordenadores`
--
ALTER TABLE `coordenadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `coordenador_cursos`
--
ALTER TABLE `coordenador_cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `c_logs`
--
ALTER TABLE `c_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `editoras`
--
ALTER TABLE `editoras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `emprestimos`
--
ALTER TABLE `emprestimos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `estado_emprestimos`
--
ALTER TABLE `estado_emprestimos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de tabela `generos_livros`
--
ALTER TABLE `generos_livros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de tabela `livros`
--
ALTER TABLE `livros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tipo_sujeito`
--
ALTER TABLE `tipo_sujeito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
