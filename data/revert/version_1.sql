-- Revert cinevoraces:version_1 from pg

BEGIN;

-- ALTER SCHEMA "public" OWNER TO julien_goletto;
DROP TABLE IF EXISTS "movie_has_genre" ;
DROP TABLE IF EXISTS "movie_has_language" ;
DROP TABLE IF EXISTS "movie_has_country" ;
DROP TABLE IF EXISTS "review" ;
DROP TABLE IF EXISTS "movie" ;
DROP TABLE IF EXISTS "genre" ;
DROP TABLE IF EXISTS "language" ;
DROP TABLE IF EXISTS "country" ;
DROP TABLE IF EXISTS "season" ;
DROP TABLE IF EXISTS "user" ;

COMMIT;
