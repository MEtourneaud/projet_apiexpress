// Définition d'un tableau d'objets représentant des mangas
const mangas = [
  {
    title: "Gintama",
    author: "Sorachi Hideaki",
    synopsis:
      "Dans un Japon mi-médiéval, mi-futuriste, des extraterrestres, les Amanto débarquent sur Terre. Forts de leur supériorité technologique, ils vont imposer leur loi : tout samouraï devra se défaire de son sabre... C'en est donc fini de l'âme du guerrier samouraï ! C'est sans compter Gintoki Sakata ! Armé de son sabre d'entraînement, il se placera en dernier défenseur du Bushido, le code du samouraï et ne se défera pas de son humour cinglant lors de ses missions délirantes !",
    genre: " Action, Comédie, Historique",
    volumeNumber: "77",
    imageUrl: "http://localhost:3000/images/gintamaCover.jpg",
  },
  {
    title: "Vinland Saga",
    author: "Yukimura Makoto",
    synopsis:
      "Vinland Saga nous raconte l'histoire d'un jeune Viking, Thorfinn. Ce dernier fait partie de l'équipage d'un chef de guerre du nom d'Askeladd, qui est l'assassin du père de Thorfinn ! Enchainant les combats et les missions dangereuses, Thorfinn s'endurcit et gagne en maturité. Il a un objectif : venger son père de manière loyale...",
    genre: " Action, Aventure, Drame, Historique",
    volumeNumber: "27",
    imageUrl: "http://localhost:3000/images/vinlandSagaCover.jpg",
  },
  {
    title: "Haikyū!!",
    author: "Furudate Haruichi",
    synopsis:
      "Shôyô Hinata a un talent inné pour le volley-ball malgré sa petite taille. Mais après une défaite contre l'équipe du roi du terrain, Tobio Kageyama, son club de volley-ball au collège perd tous ses membres. Il décide de renouer avec le volley-ball à son entrée au lycée, car cette défaite lui a laissé un goût amer et son but ultime est de surpasser Tobio. Sauf qu'il se rend compte que celui-ci a rejoint le même lycée que lui, et qu'il doit par conséquent jouer dans son équipe ! Et pour redorer le blason de l'équipe de volley-ball du lycée Karasuno, considérée comme les champions déchus, il va falloir que Shôyô et Tobio se reconnaissent comme coéquipiers et non comme rivaux ! Ce qui risque d'être un peu compliqué...",
    genre: "Comédie, Drame, School Life, Sport",
    volumeNumber: "45",
    imageUrl: "http://localhost:3000/images/haikyuuCover.jpg",
  },
  {
    title: "Chainsaw Man",
    author: "Fujimoto Tatsuki",
    synopsis:
      "Pour rembourser ses dettes, Denji, jeune homme dans la dèche la plus totale, est exploité en tant que Devil Hunter avec son chien-démon-tronçonneuse, Pochita. Mais suite à une cruelle trahison, il voit enfin une possibilité de se tirer des bas-fonds où il croupit ! Devenu surpuissant après sa fusion avec Pochita, Denji est recruté par une organisation et part à la chasse aux démons...",
    genre: " Action, Aventure, Horreur, Mature, Surnaturel",
    volumeNumber: "14",
    imageUrl: "http://localhost:3000/images/chainsawManCover.jpg",
  },
  {
    title: "The Promised Neverland",
    author: "Shirai Kaiu",
    synopsis:
      "Emma et ses amis, tous orphelins, ont été placés dans un établissement spécialisé lorsqu'ils étaient tout jeune. Bien que leur liberté soit limitée et que les règles soient parfois un peu strictes, ils mènent une vie agréable tous ensemble et la femme qui s'occupe d'eux est généreuse. Cependant, une question anime Emma et tous les autres : pourquoi n'ont-ils pas le droit de sortir de l'orphelinat ?",
    genre: " Aventure, Drame, Horreur, Mystère, Surnaturel",
    volumeNumber: "20",
    imageUrl: "http://localhost:3000/images/yakusokuNoNeverlandCover.jpg",
  },
  {
    title: "One Piece",
    author: "Oda Eiichiro",
    synopsis:
      "Gloire, fortune et puissance, c'est ce que possédait Gold Roger, le tout puissant roi des pirates, avant de mourir sur l'échafaud. Mais ses dernières paroles ont éveillées bien des convoitises, et lança la fabuleuse ère de la piraterie, chacun voulant trouver le fabuleux trésor qu'il disait avoir laissé. Bien des années plus tard, Shanks, un redoutable pirate aux cheveux rouges, rencontre Luffy, un jeune garçon d'une dizaine d'années dans un petit port de pêche. Il veut devenir pirate et le rejoindre, mais Shanks lui répond qu'il est trop jeune. Plus tard, Luffy avalera accidentellement le fruit Gomu Gomu qui rendra son corps élastique, mais aussi maudit par les eaux. Incapable de nager, Luffy ne veut pourtant pas renoncer à son rêve. Pour le consoler lorsqu'il part, Shanks lui offre son chapeau. Luffy jure alors de le rejoindre un jour avec son propre équipage. A 17 ans, Luffy prend la mer dans une petite barque avec pour but de réunir un équipage de pirates, mais de pirates pas comme les autres, qui devront partager sa conception un peu étrange de la piraterie. L'aventure est lancée.",
    genre: "Action, Aventure, Comédie, Drame, Fantastique",
    volumeNumber: "106",
    imageUrl: "http://localhost:3000/images/onePieceCover.jpg",
  },
  {
    title: "Dorohedoro",
    author: "Q Hayashida",
    synopsis:
      "Caiman est un jeune homme dont le visage a été transformé en lézard suite à un sortilège. En compagnie de Nikaido sa jeune amie, il se lance à la poursuite du mage venu de l'autre coté qui lui a lancé ce sort afin de se venger. Mais les choses ne sont pas aussi simples car En, le chef des mages est bien décidé à en finir avec ce lézard qui massacre ses mages et qui n'est pas sensible à leur magie. Aussi il lance à ses trousses, des tueurs : Shin, Noi, Ebisu et Fujita...",
    genre: "Action, Comédie, Drame, Horreur, Psychologique, Surnaturel",
    volumeNumber: "23",
    imageUrl: "http://localhost:3000/images/dorohedoroCover.jpeg",
  },
  {
    title: "Steel Ball Run",
    author: "Araki Hirohiko",
    synopsis:
      "Steel Ball Run : une course de chevaux qui a lieu en 1890 aux États-Unis. Les participants doivent chevaucher de San Diego Beach à New York, ce qui représente une course de 6000 kilomètres sans pouvoir changer de monture ! A la clef, une récompense de 50 millions de dollars !Attirés par cette somme de nombreux individus viennent des 4 coins du mondes, avec chacun leurs propres motivations : jockey en quête de gloire, jeune indien voulant racheter sa terre natale sous le joug de l'envahisseur. Jayro Zeppeli, quant à lui, semble être là pour d'obscures raisons, armé de sphères d'acier, sa présence redonnera à Johnny Joestar la force de se lever de son fauteuil roulant et de faire un pas dans la vie d'adulte !",
    genre: "Action, Aventure, Drame, Fantastique, Historique, Mystère, Surnaturel, Tragique",
    volumeNumber: "24",
    imageUrl: "http://localhost:3000/images/steelBallRunCover.jpg",
  },
  {
    title: "Moi, quand je me réincarne en Slime",
    author: "Fuse",
    synopsis:
      "Satoru Minami, un simple homme de 37 ans, se réincarne en slime dans une grotte d'un monde fantastique après sa mort provoquée par un voleur en fuite. Alors qu'il tente de percer le secret derrière cette nouvelle vie, Satoru fait la connaissance de Veldra, le dragon de la tempête, une créature qui a perdu la capacité de se mouvoir depuis qu'une héroïne a scellé son corps à la roche de la caverne 300 ans auparavant. Malgré leur différence de force frappante, ils décident de devenir amis et à la requête du dragon, doivent se donner l'un l'autre un surnom : ainsi, Veldra se voit attribuer le nom de famille Tempest et devient donc Veldra Tempest, Satoru, lui se transforme en Limule Tempest. Cependant, est-il bien sage de s'allier à un dragon ?",
    genre: "Action,  Aventure, Comédie, Drame, Ecchi, Fantasy, Isekai",
    volumeNumber: "23",
    imageUrl: "http://localhost:3000/images/tenseiShitaraSlimeDattaKenCover.webp",
  },
  {
    title: "Dr. STONE",
    author: " Inagaki Riichiro",
    synopsis:
      "Un jour, une lumière éclaira la Terre, changeant tous les humains en pierre. Ainsi, l'humanité s'éteignit. Plusieurs millénaires plus tard, Taiju parvient à s'échapper de son enveloppe de pierre pour découvrir un monde dans lequel la nature a repris ses droits. Avec son ami Senku, ils décident de tout mettre en œuvres pour faire renaître l'humanité de ses cendres et survivre.",
    genre: "Action, Aventure, Drame, Fantastique, Science-fiction",
    volumeNumber: "26",
    imageUrl: "http://localhost:3000/images/drStoneCover.webp",
  },
  {
    title: "Fullmetal Alchemist",
    author: "Arakawa Hiromu",
    synopsis:
      "À Amestris, un immense pays, l'armée tient une place très importante puisque son dirigeant, King Bradley, est également le président du pays. Cette armée est soutenue par des alchimistes, les Alchimistes d'État dont le plus jeune, Edward Elric, a pour spécialité le métal. On le surnomme le Fullmetal Alchemist. Edward a tout juste 15 ans, et parcourt le pays en compagnie de son frère, Alphonse, à la recherche de la Pierre Philosophale. Il a pour but de rendre son corps à son frère, car Alphonse n'est qu'une âme rattaché à une armure par un sceau de sang. Étant plus jeunes, ils ont essayé de redonner vie à leur mère grâce à l'alchimie, mais la tentative fut un échec cuisant, et Alphonse perdit son corps. Edward garde lui aussi des séquelles de leur tentative, puisqu'il a le bras droit et la jambe gauche en métal. Mais la quête des deux frères risque de les mener vers une vérité plus terrible qu'ils ne l'imaginaient.",
    genre: "Action, Comédie, Drame, Mystère, Surnaturel",
    volumeNumber: "27",
    imageUrl: "http://localhost:3000/images/fullmetalAlchemistCover.jpg",
  },
  {
    title: "Berserk",
    author: " Miura Kentaro",
    synopsis:
      "Dans un monde médiéval et marqué par un passé difficile, erre un mercenaire solitaire nommé Guts, décidé à être seul maître de son destin. Autrefois contraint par un pari perdu à rejoindre les Faucons, une troupe de mercenaires dirigés par Griffith, Guts fut acteur de nombreux combats sanglants et témoin de sombres intrigues politiques. Mais il réalisa soudain que la fatalité n'existe pas et qu'il pouvait reprendre sa liberté s'il le désirait vraiment... Mais un mal le traque sans relâche.",
    genre: "Action, Fantastique, Horreur, Tragique",
    volumeNumber: "41",
    imageUrl: "http://localhost:3000/images/berserkCover.jpeg",
  },
]

// Exporte le tableau d'objets représentant des mangas fictifs pour le rendre accessible à d'autres parties de l'application
module.exports = mangas
