-- Deploy cinevoraces:version_2 to pg

BEGIN;

INSERT INTO "genre" ("name") VALUES
('Drama'),('Music'),('Romance'),('Sci-Fi'),('Biography'),('History'),('Action'),('Crime');
INSERT INTO "language" ("name") VALUES
('Anglais'),('Français'),('Russe'),('Norvégien'),('Allemand'),('Danois'),('Suèdois'),('Corréen'),('Chinois');
INSERT INTO "country" ("name") VALUES
('Royaume-Uni'),('Union soviétique'),('Norvège'),('Suède'),('Danemark'),('Irlande'),('Corée du Sud');
INSERT INTO "season" ("number","year") VALUES
(1,2020),(2,2021),(3,2022);
INSERT INTO "user" ("pseudo","mail","password","avatar_url","role") VALUES
('Julien','Julien@test.fr','Dictateur','http://vacherchertonimage.com','admin'),('Thimothé','Thimote@test.fr','Lebest','http://vacherchertasecondeimage.com','user');
INSERT INTO "movie" ("french_title","original_title","poster_url","directors","release_date","runtime","casting","presentation","is_published","publishing_date","user_id","season_id") VALUES

('Les Chaussons Rouges','The Red Shoes','poster_url','{"Michael Powell","Emeric Pressburger"}','1948-09-06',125,'{"Moira Shearer","Marius Goring","Anton Walbrook","Robert Helpmann","Albert Bassermann"}',
'Je propose de regarder les chaussons rouges. Film de Powell et Pressburger (D''ailleurs vous pouvez vous jeter sur leurs autres films, Narcisse Noir, Le voyeur, ... Y''a rien à jeter). Pourquoi ? Parce qu''il est superbe. 
Que la scène du ballet, je ne m''en suis jamais vraiment remis. Voilà... J''espère que ça vous plaira autant qu''à moi !',true,'2020-03-27',2,1),

('Stalker', 'Stalker','poster_url', '{"Andrei Tarkovsky"}','1979-04-17',162, '{"Alisa Freyndlikh", "Alexandr Kaydanovskiy", "Anatoliy Solonitsyne", "Nikolay Grinko", "Natalya Abramova"}', 
'Un guide conduit deux hommes, l''un professeur et l''autre écrivain, à travers une zone connue comme la « chambre », afin d''exaucer tous leurs vœux.', true,'2021-12-06',1,2),

('The King''s Choice','Kongens Nei','poster_url','{"Michael Powell","Emeric Pressburger"}','2017-08-22',125,'{"Jesper Christensen","Anders Baasmo Christiansen","Karl Markovics","Tuva Novotny","Arthur Hakalahti"}',
'J''ai décidé de vous proposer un film qui me paraît intéressant et un minimum original (et d''une qualité honorable dans sa réalisation / acteurs) tout en explorant un fait essentiel de l''Histoire norvégienne 
(et indirectement de la WWII) avec le film : Kongens nei (Erik Poppe - 2016). Ultimatum en français. Je conseille fortement de le visionner en VO sous-titrée en français (ou autre), 
car le film est centré notamment sur le personnage du Roi Haakon VII d''origine danoise (élément essentiel pour comprendre certains aspects du propos historique) et l''acteur Jesper Christensen 
fait un très bon boulot pour parler justement le norvégien avec un certain accent danois.
Je ne veux pas détailler davantage pour laisser la découverte, en sachant que je proposerais à l''issus de la semaine de visionnage une petite analyse historique pour aller plus loin et mieux appréhender les faits explorés par le film.',
true,'2020-04-03',2,1),

('New World', 'Sinsegye','poster_url', '{"Park Hoon-jung"}', '2013-02-21', 135, '{"Lee Jung-jae", "Choi Min-sik", "Jung-min Hwang", "Park Sung-woong", "Song Ji-Hyo"}', 'Un flic infiltré dans une mafia devient l''ami du sous-boss. Dans un dilemme moral, 
il se trouve coincé entre son devoir de policier et ses sentiments.', false, '2022-05-27', 2, 3);
INSERT INTO "review" ("user_id","movie_id","bookmarked","viewed","liked","rating","comment") VALUES
(1,1,false,true,true,5,'Un grand merci à Wade pour cette proposition. C''est la deuxième fois que je le vois et, pour résumer, je l''ai trouvé encore plus puissant. Je vais essayer d''être pertinent et pas trop brouillon mais
 ce film m''a retourné donc je ne garantis pas la cohérence de cette "critique". L''avantage de revoir un film c''est qu''on évacue les grandes lignes du scénario et qu''on se focalise sur des détails passés inaperçus la première fois.
Le film est servi par deux très grands acteurs. Et il n''en fallait pas moins pour sublimer la grande force de Jeff Nichols : faire avancer l''intrigue et transmettre des émotions par des silences et des regards. 
Les silences de Curtis dans la première partie du film d''abord, un Curtis qui sent son monde s''effondrer sous ses pieds à cause d''une menace dont il ne sait si elle est intérieure ou s''il est le seul à vraiment la discerner.
C''est d''ailleurs une des forces du film : les visions se font de plus en plus angoissantes mais les explications rationnelles arrivent en écho (la maladie de se mère, la crise d''angoisse, l’irrationalité qui mènera au retard 
de traitement pour sa fille). Puis, dans la dernière demi-heure (grandiose), les silences et les regards se font, là aussi signifiants mais la famille y est associée. Lors du repas du Lion''s Club notamment où deux regards se répondent :
 celui de Curtis qui semble crier à sa fille qu''il a peur pour elle, qu''il est sûrement fou mais qu''il l''aime et qu''il sera toujours là et celui de Samantha qui comprend et qui l''assure de son soutien. Bref, cette scène m''a anéanti.
 Je considère Jeff Nichols comme un des plus grands : Shotgun Stories, Mud, Midnight Special sont de grands films. Mais j''ai une affection toute particulière pour celui-ci car les sujets sont nombreux et tous bien traités. 
 D''abord la parentalité. Ce n''est d''ailleurs sûrement pas un hasard si ce film m''a encore plus touché aujourd''hui.
Curtis a peur, peur de lui, peur pour sa famille, peur de ne pas être à la hauteur. Il doit agir et la sortie de l''abri lui donne une "réponse" à ses peurs : C''est normal de perdre pied. Curtis veut tout gérer pour sa famille
 mais c''est impossible et il se réfugie dans la peur et le repli sur soi symbolisé par ce bunker. Mais il doit agir, prendre conscience, avancer. Ok certains y verront de gros sabots mais pour moi c''est une superbe métaphore.
Le film traite aussi d''héritage, celui de la mère de Curtis notamment, du couple, confronté à la parentalité et au handicap, de la maladie et de la conscience d''être malade. J''ajouterai aussi le parallèle qui ne paraissait
   pas si évident lors du premier visionnage, celui de la catastrophe annoncée, du cataclysme minimisé (même si les visions de Curtis n''ont pas toutes trait à des perturbations climatiques). Enfin, ce film s''inscrit dans une
filmographie qui rend hommage à une certaine Amérique. Celle qu''on a caricaturé après l''élection de l''homme orange. Celle qui compte en son sein des communautés rurales et aimantes. 
Pour la petite anecdote, la dernière chanson du film (de la country évidemment) est interprétée par le frère de Jeff Nichols, Ben, et résume parfaitement ce qu''on vient de voir.
Merci encore...'),
(2,2,false,true,false,2,'C tro nul ce truc. c un film ca ? allai renbale la sauce et rentre ché toi et bisou'),
(1,3,true,true,true,4,'Un grand merci à Wade pour cette proposition. C''est la deuxième fois que je le vois et, pour résumer, je l''ai trouvé encore plus puissant. Je vais essayer d''être pertinent et pas trop brouillon mais
 ce film m''a retourné donc je ne garantis pas la cohérence de cette "critique". L''avantage de revoir un film c''est qu''on évacue les grandes lignes du scénario et qu''on se focalise sur des détails passés inaperçus la première fois.
Le film est servi par deux très grands acteurs. Et il n''en fallait pas moins pour sublimer la grande force de Jeff Nichols : faire avancer l''intrigue et transmettre des émotions par des silences et des regards. 
Les silences de Curtis dans la première partie du film d''abord, un Curtis qui sent son monde s''effondrer sous ses pieds à cause d''une menace dont il ne sait si elle est intérieure ou s''il est le seul à vraiment la discerner.
C''est d''ailleurs une des forces du film : les visions se font de plus en plus angoissantes mais les explications rationnelles arrivent en écho (la maladie de se mère, la crise d''angoisse, l’irrationalité qui mènera au retard 
de traitement pour sa fille). Puis, dans la dernière demi-heure (grandiose), les silences et les regards se font, là aussi signifiants mais la famille y est associée. Lors du repas du Lion''s Club notamment où deux regards se répondent :
 celui de Curtis qui semble crier à sa fille qu''il a peur pour elle, qu''il est sûrement fou mais qu''il l''aime et qu''il sera toujours là et celui de Samantha qui comprend et qui l''assure de son soutien. Bref, cette scène m''a anéanti.
 Je considère Jeff Nichols comme un des plus grands : Shotgun Stories, Mud, Midnight Special sont de grands films. Mais j''ai une affection toute particulière pour celui-ci car les sujets sont nombreux et tous bien traités. 
 D''abord la parentalité. Ce n''est d''ailleurs sûrement pas un hasard si ce film m''a encore plus touché aujourd''hui.
Curtis a peur, peur de lui, peur pour sa famille, peur de ne pas être à la hauteur. Il doit agir et la sortie de l''abri lui donne une "réponse" à ses peurs : C''est normal de perdre pied. Curtis veut tout gérer pour sa famille
 mais c''est impossible et il se réfugie dans la peur et le repli sur soi symbolisé par ce bunker. Mais il doit agir, prendre conscience, avancer. Ok certains y verront de gros sabots mais pour moi c''est une superbe métaphore.
Le film traite aussi d''héritage, celui de la mère de Curtis notamment, du couple, confronté à la parentalité et au handicap, de la maladie et de la conscience d''être malade. J''ajouterai aussi le parallèle qui ne paraissait
   pas si évident lors du premier visionnage, celui de la catastrophe annoncée, du cataclysme minimisé (même si les visions de Curtis n''ont pas toutes trait à des perturbations climatiques). Enfin, ce film s''inscrit dans une
filmographie qui rend hommage à une certaine Amérique. Celle qu''on a caricaturé après l''élection de l''homme orange. Celle qui compte en son sein des communautés rurales et aimantes. 
Pour la petite anecdote, la dernière chanson du film (de la country évidemment) est interprétée par le frère de Jeff Nichols, Ben, et résume parfaitement ce qu''on vient de voir.
Merci encore...'),
(1,4,false,true,true,5,'Le film commence fort, avec une belle baston reprenant les bruits typiques d’un Bud Spencer et Terence Hill, avec l’air de musique de la Cantina de Star Wars, hilarité totale pour ma part ! 
Par la suite, j’ai finalement trouvé la musique assez bonne, variée, rythmée et originale. Les chants et chorégraphie sympa (même si j’en ai passés certains vers la fin en accélérée). 
Les cascades improbables m’ont bien fait marrer, ainsi que le méchant, avec sa tête de vainqueur qui ne peut juste pas faire peur. 
Les courses poursuites en voitures ont un rendu des plus étranges… et le tout me semble presque d’être un film expérimental. 
Des fois, ça donne des bonnes surprises, et des fois, c’est totalement raté. J’ai particulièrement apprécié les plans sur la vie courante indienne, avant de revenir par un dézoom 
à une scène de course poursuite. 
Maintenant les gros hics : finalement le film ne parle pas vraiment de Kabaddi, et cela, ça me rend triste. C’est juste un prétexte pour donner le l’attrait au film. 
Autre chose, le scénario est vraiment old school et patriarcal au possible : un homme qui défie un gros méchant pour sauver une fille sans défense cucul la praline. 
C’est pourri. Bon, maintenant on est en Inde, ça reste pourri, mais je suis un peu plus tolérant que si ça avait été une production occidentale. 
Et 3h00 pour un tel scénario post-it, ce n’est juste pas possible ! On aurait très facilement pu retirer 1h30. En tout cas, pour l’instant, le meilleur film que j’ai vu de la S3 de cinévorace, 
merci Lukino pour cette reco exotique. Et aussi pour le jambon.'),
(2,3,true,false,false,null,null);

INSERT INTO "movie_has_genre" ("movie_id","genre_id") VALUES
(1,1),(1,2),(1,3),
(2,1),(2,4),
(3,5),(3,1),(3,6),
(4,7),(4,8),(4,1);
INSERT INTO "movie_has_country" ("movie_id","country_id") VALUES
(1, 1),
(2, 2),
(3, 3),(3, 4),(3, 5),(3, 6),
(4, 7);
INSERT INTO "movie_has_language" ("movie_id","language_id") VALUES
(1,1),(1,2),(1,3),
(2,3),
(3,4),(3,5),(3,6),(3,7),(3,1),
(4,8),(4,9);

COMMIT;