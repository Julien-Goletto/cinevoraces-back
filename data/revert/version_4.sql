-- Revert cinevoraces:version_2 from pg

BEGIN;

DELETE FROM "genre";
DELETE FROM "language";
DELETE FROM "country";
DELETE FROM "season";
DELETE FROM "user";
DELETE FROM "movie";
DELETE FROM "review";
DELETE FROM "movie_has_genre";
DELETE FROM "movie_has_country";
DELETE FROM "movie_has_language";

COMMIT;
