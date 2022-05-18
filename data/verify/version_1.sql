-- Verify cinevoraces:version_1 on pg

BEGIN;

SELECT "id","name" FROM "genre";
SELECT "id","name" FROM "language";
SELECT "id","name"  FROM "country";
SELECT "id","number","year" FROM "season";
SELECT "id","pseudo","mail","password","avatar_url","mail_sub","role" FROM "user";
SELECT "id", "french_title","original_title","poster_url","directors","release_date","runtime","casting","presentation",
        "is_published","publishing_date","user_id","season_id" FROM "movie";
SELECT "viewed","bookmarked","liked","rating","comment","user_id", "movie_id" FROM "review";
SELECT "movie_id","genre_id" FROM "movie_has_genre";
SELECT "movie_id","country_id" FROM "movie_has_country";
SELECT "movie_id","language_id" FROM "movie_has_language";
SELECT "id","season_number","episode","publishing_date","is_booked" FROM "proposition_slot";

ROLLBACK;
