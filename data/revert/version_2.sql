-- Revert cinevoraces:version_4 from pg

BEGIN;

DROP FUNCTION IF EXISTS new_movie;
DROP FUNCTION IF EXISTS new_season;

COMMIT;
