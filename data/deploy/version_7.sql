-- Deploy cinevoraces:version_7 to pg

BEGIN;

-- Nouveaux utilisateurs pour les tests
INSERT INTO "user" ("pseudo","mail","password") VALUES
('Joffrey d''Ortoli', 'mailbidon34' ,'$2b$10$fNwqHYQdB8z2TYljQTAU6OnL8BqtOH.wn8MIOzzpj2VwsE.Y9FmcS'),
('Benoît Safari', 'mailbidon35' ,'$2b$10$z6hd1aqv7aRAIX1Jvw8sIONcaMDtSV2M2UkDYJJEipQXANR9q5L4W'),
('nox', 'mailbidon36@net.fr' ,'$2a$10$pVvqSjJWiPa.hsGuAWbPNeX0A10Dtz4/PpGwAXQOWMuLZxIzQAD2m'),
('benoitSafari', 'mailbidon37@mail.net' ,'$2a$10$/BlUX4DDVkuC63TbC6JsyeTMQoduAcLr52WSBp/CTBYh2hOI6kiEG'),
('Mahh31', 'mailbidon38@mail.net' ,'$2a$10$YWs6cq02Gx/OHcuQL0xiqOYn8qc5g3EWyUAUDHhKmufu2iTC10zlS'),
('Jean Test', 'mailbidon36' ,'$2b$10$IK5jJO8ntnu.nbyGTHVG6uXYhuWDt0ZFfVSQmEQHkHbu0L5sl9/42');

-- Ajout des PP
UPDATE "user" SET avatar_url = 'https://images-ext-1.discordapp.net/external/GVEsPmcMp4X4PuWDDbw6VOfeHQS-994SugEXb3rG9_g/%3Fv%3D4/https/avatars.githubusercontent.com/u/72048119', role='admin' WHERE pseudo='nox';
UPDATE "user" SET avatar_url = 'https://media.discordapp.net/attachments/968514181785608232/979665534079615057/unknown.png', role='admin' WHERE pseudo='benoitSafari';
UPDATE "user" SET avatar_url = 'https://media.discordapp.net/attachments/968514181785608232/979649375414415380/Skeleton_black_white.jpg?width=336&height=686', role='admin' WHERE pseudo='benoitSafari';

-- Ajout de deux nouvelles propositions
SELECT new_movie('12 hommes en colère','12 Angry Men','https://image.tmdb.org/t/p/original/fFXrCl7nBFFaQU3IgTlinvk6vTi.jpg',array['Sidney Lumet'],'1957-04-10','95',array['Martin Balsam','John Fiedler','Lee J. Cobb','E.G. Marshall','Jack Klugman'],'12 hommes et beaucoup de colère. Mais zéro bagarre par contre. Même pas une tartine de pâté. C''est rude.','2022-06-06',34,3,array['Drame'],array['English'],array['United States of America']);
SELECT new_movie('Garfield, le film','Garfield','https://image.tmdb.org/t/p/original/ec8AM30BnLlCoRE1Aw5INo5ubOe.jpg',array['Peter Hewitt'],'2004-06-10','81',array['Bill Murray','Breckin Meyer','Jennifer Love Hewitt','Stephen Tobolowsky','Evan Arnold'],'Un film bien en dessous de ce que l''on pourrait imaginer. Je veux dire, Garfield quoi! C''est un gage de qualité! Mais la on nous fournis une bouse infecte bien loin de la vision original du manga. Tout d''abord, Garfield n''obtient ses pouvoirs qu''après le combat contre Zackary Ford, or là, dés le départ Garfield est over-pété et roule sur tout ses adversaire... Ensuite Vegeta qui est fan frites et cours dans tout New York a la recherche d''une bonne baraque frites serieux j''ai pas compris le délire, le but c''est de tourner tout les personnages en ridicule? Est-ce que les fans de gaming et culture Jap sont forcement des noeuds-noeuds? Selon Spielberg, il semblerait que oui...','2022-06-13',35,3,array['Animation','Comédie','Familial'],array['English'],array['United States of America']);

-- Ajout d'une review sur le film 108
INSERT INTO "review" ("user_id","movie_id","bookmarked","viewed","liked","rating","comment") VALUES
(36,110,true,false,false,null,null);
COMMIT;
