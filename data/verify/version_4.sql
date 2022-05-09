-- Verify cinevoraces:version_2 on pg

BEGIN;

SELECT * FROM "genre" WHERE "name"='Drame';
SELECT * FROM "language" WHERE "name"='Anglais';
SELECT * FROM "country" WHERE "name"='Irlande';
SELECT * FROM "season" WHERE "year"=2021;
SELECT * FROM "user" WHERE "pseudo"='Mat-Mat';
SELECT * FROM "movie" WHERE "french_title"='Stalker';
SELECT * FROM "review" WHERE "movie_id"=2;
SELECT * FROM "movie_has_genre" WHERE "movie_id"=1;
SELECT * FROM "movie_has_country" WHERE "country_id"=2;
SELECT * FROM "movie_has_language" WHERE "movie_id"=3;

ROLLBACK;
