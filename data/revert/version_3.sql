-- Revert ludotheque:version_3 from pg

BEGIN;

DELETE FROM genre;
DELETE FROM platform;
DELETE FROM game;
DELETE FROM "user";
DELETE FROM game_has_genre;
DELETE FROM game_has_platform;

DELETE FROM game_has_user;

COMMIT;
