-- Revert cinevoraces:version_4 from pg

BEGIN;

DROP FUNCTION new_movie;

COMMIT;
