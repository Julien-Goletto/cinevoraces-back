-- Revert cinevoraces:version_6 from pg

BEGIN;

DROP INDEX country_idx;
DROP INDEX genre_idx;
DROP INDEX language_idx;
DROP INDEX movie_idx;
DROP INDEX movie_has_country_idx;
DROP INDEX movie_has_genre_idx;
DROP INDEX movie_has_language_idx;
DROP INDEX review_idx;
DROP INDEX season_idx;
DROP INDEX user_idx;

COMMIT;
