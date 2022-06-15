-- Seeding de review exclusivement pour tests en local
-- Deploy cinevoraces:version_7 to pg

-- BEGIN;

-- INSERT INTO "review" ("user_id","movie_id","bookmarked","viewed","liked","rating","comment") VALUES
-- (2,110,true,false,false,null,null),
-- (2,107,'false','true','false',1,'Je n’ai jamais vu un film avec autant de plans différents qui se suivent, à s’en rendre malade, d’autant plus qu’une majorité fait moins de 3 sec, et lors des scènes d’actions ça s’enchaîne en pagaille. Ça en devient totalement incompréhensible, et ça épuise. Sinon niveau scénar, on est en plein série Z (les gens meurent de faim, et en parallèle, je n’ai jamais vu un plan avec autant de vaches), mais dans le fond, je trouve l’idée assez marrante, que l’Écosse soit isolée et que du coup plusieurs civilisations différentes apparaissent, ça aurait pu être sympa l’idée, avec chacune leur dogme, objectifs, etc. Évidement ça a été traité à l’arrache, avec une peuplade post-apo à la mad max (copié-collé) et l’autre en Moyen-âge avec les clichés qui vont avec. Les acteurs et actrices sont mauvais, le script aussi, et Bentley ont dû financer le film (pour le meilleur et surtout pour le pire), ce n’est pas possible autrement. En fait, ce film permet de se rendre compte ce qu’aurait donné un très mauvais MadMax Fury Road et donne envie de se le remâter (MadMax donc !).'),
-- (2,84,'false','true','false',2,'Si Doomsday avait été un jeu vidéo j''aurais sûrement adoré y jouer ! Les environnements sont beaux et variés et les phases de combat ont l''air stylées ! Bon, comme dans la plupart des jeux le scénario ne casse pas des briques, les acteurs jouent mal, les ennemis comme les coéquipiers sont un peu stupides et le gameplay de la phase en voiture est un peu raté, mais on a l''habitude... Le plus gros problème c''est que Neil Marshall n''a pas voulu me laisser la manette et qu''en plus il a pas arrêté d''appuyer toutes les deux secondes sur le bouton pour changer la caméra...');

-- COMMIT;
