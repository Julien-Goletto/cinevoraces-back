-- Verify ludotheque:version_1 on pg

BEGIN;

SELECT "name" from "genre";
SELECT "name" from "platform";
SELECT "pseudo","password" from "user";
SELECT "name","released_on","background_image" from "game";
SELECT "game_id","platform_id" from "game_has_platform";
SELECT "game_id","genre_id" from "game_has_genre";
SELECT "game_id","user_id","is_finished","is_prioritized","score" from "game_has_user";

ROLLBACK;
