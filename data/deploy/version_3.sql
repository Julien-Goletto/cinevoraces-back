-- Deploy ludotheque:version_3 to pg

BEGIN;

-- Seeding game / platform / genre tables with their pivot tables
SELECT add_new_game('Metroid Dread','2021-10-08','https://media.rawg.io/media/games/c26/c262f8b54b46edc72594c4a9bb8ee13e.jpg',array['Nintendo Switch'],array['Platformer','Action','RPG']);
SELECT add_new_game('Hollow Knight','2017-02-23','https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg',array['PC','Xbox One','PlayStation 4','Nintendo Switch','macOS','Linux','PS Vita'],array['Platformer','Indie','Action']);
SELECT add_new_game('FEZ','2012-04-13','https://media.rawg.io/media/games/4cb/4cb855e8ef1578415a928e53c9f51867.png',array['PC','PlayStation 4','Nintendo Switch','iOS','macOS','Linux','Xbox 360','PlayStation 3','PS Vita'],array['Adventure','Action','Puzzle','Indie','Platformer']);
SELECT add_new_game('Undertale','2015-09-14','https://media.rawg.io/media/games/ffe/ffed87105b14f5beff72ff44a7793fd5.jpg',array['PC','PlayStation 4','Xbox One','Xbox Series S/X','Nintendo Switch','macOS','Linux','PS Vita'],array['Indie','RPG']);
SELECT add_new_game('Hades','2020-09-17','https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg',array['PC','PlayStation 5','Xbox One','PlayStation 4','Xbox Series S/X','Nintendo Switch'],array['Indie','Adventure','Action','RPG']);
SELECT add_new_game('Bayonetta','2009-06-23','https://media.rawg.io/media/games/a49/a4991c35602884e0b0af9c62afb10ff5.jpg',array['PC','Xbox One','Nintendo Switch','Xbox 360','PlayStation 3','Wii U'],array['Action']);
SELECT add_new_game('The Legend of Zelda: Breath of the Wild','2017-03-03','https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg',array['Nintendo Switch','Wii U'],array['Adventure','Action','RPG']);
SELECT add_new_game('Dark Souls: Remastered','2018-05-23','https://media.rawg.io/media/games/29c/29c6c21cc0c78cff6f45d23631cc82f4.jpg',array['PC','PlayStation 4','Xbox One','Nintendo Switch'],array['Action']);
SELECT add_new_game('Gris','2018-12-13','https://media.rawg.io/media/games/51c/51c430f1795c79b78f863a9f22dc422d.jpg',array['PC','PlayStation 4','Nintendo Switch','iOS','macOS'],array['Indie','Platformer','Adventure','Puzzle']);
SELECT add_new_game('Slay the Spire','2019-01-22','https://media.rawg.io/media/games/f52/f5206d55f918edf8ee07803101106fa6.jpg',array['PC','Xbox One','PlayStation 4','Nintendo Switch','iOS','Android','macOS','Linux'],array['Card','Strategy','Indie','RPG']);
SELECT add_new_game('Assassin''s Creed Odyssey','2018-10-05','https://media.rawg.io/media/games/c6b/c6bd26767c1053fef2b10bb852943559.jpg',array['PC','Xbox One','PlayStation 4','Nintendo Switch'],array['Action','RPG']);
SELECT add_new_game('Into the Breach','2018-02-26','https://media.rawg.io/media/games/800/800d07ca648a9778a8230f40088e0866.jpg',array['PC','Nintendo Switch','macOS'],array['Strategy','Indie','RPG']);
SELECT add_new_game('Invisible, Inc.','2015-05-12','https://media.rawg.io/media/games/849/849c187c0b5d4cd1ee3283148f7e4cdb.jpg',array['PC','PlayStation 4','Nintendo Switch','iOS','macOS','Linux'],array['Strategy','Adventure']);
SELECT add_new_game('OKAMI HD / 大神 絶景版','2017-12-12','https://media.rawg.io/media/games/a38/a3857b2445c70ac5dbe73b210a827ad8.jpg',array['PC','Xbox One','PlayStation 4','Nintendo Switch','PlayStation 3'],array['Adventure','Action']);
SELECT add_new_game('Dungeon of the Endless','2014-10-27','https://media.rawg.io/media/games/a0c/a0cb0ac048c75b41d2620d2e6cb6f983.jpg',array['PC','Xbox One','PlayStation 4','Nintendo Switch','iOS','macOS'],array['Indie','Strategy','Adventure','RPG']);
SELECT add_new_game('Downwell','2015-10-14','https://media.rawg.io/media/screenshots/e9c/e9ce72a3e2c1ac344e8876d6bb0dcf50.jpeg',array['PC','PlayStation 4','Nintendo Switch','iOS','Android','PS Vita'],array['Adventure','Action','Casual','Arcade','Indie','Platformer']);
SELECT add_new_game('Streets of Rage 4','2020-04-30','https://media.rawg.io/media/games/e56/e56d74b0a1072662eea7c1a194363884.jpg',array['PC','Xbox One','PlayStation 4','Nintendo Switch'],array['Indie','Action','Fighting']);
SELECT add_new_game('Kirby and the Forgotten Land','2022-03-25','https://media.rawg.io/media/games/42a/42a71f0cbe23185f778c10462faa12d8.jpg',array['Nintendo Switch'],array['Action']);
SELECT add_new_game('TRIANGLE STRATEGY','2022-03-04','https://media.rawg.io/media/games/334/3340776fc9a78199838c7c1d8ec22bd5.jpg',array['Nintendo Switch'],array['Strategy','Adventure','RPG']);
SELECT add_new_game('Shin Megami Tensei V','2021-11-12','https://media.rawg.io/media/games/1b6/1b6673b646af55f834938bedebee2a0f.jpg',array['Nintendo Switch'],array['Adventure','Action','RPG']);

-- Seeding user TABLE

INSERT INTO "user" ("pseudo","password", "is_admin") VALUES
('Yves Signal','motdepasse', true),
('Neofelis','motdepasse', false);

COMMIT;
