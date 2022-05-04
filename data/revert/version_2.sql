-- Revert ludotheque:version_2 from pg

BEGIN;

DROP FUNCTION add_new_game;

COMMIT;
