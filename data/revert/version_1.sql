-- Revert cinevoraces:version_1 from pg

BEGIN;

ALTER SCHEMA "public" OWNER TO julien_goletto;
DROP TABLE 
  "genre","language","country","season","user","movie","review",
  "movie_has_genre","movie_has_language","movie_has_country";

COMMIT;
