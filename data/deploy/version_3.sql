-- Deploy cinevoraces:version_3 to pg

BEGIN;

-- Compte de saisons, de films et de pays
CREATE VIEW global_metrics AS

	SELECT sc.ct "seasons_count",mc.ct "movies_count",cc.ct "countries_count"
	FROM
		(SELECT COUNT(*) ct FROM "season")sc,
		(SELECT COUNT (*) ct FROM "movie")mc,
		(SELECT COUNT (*) ct FROM "country")cc;

-- Aggrégation de toutes les intéractions de l'utilisateur : films proposés, commentaires publiés, films likés, films mis en bookmarks et films notés 
CREATE VIEW indiv_actions_metrics AS
	SELECT movie.user_id, COUNT(*) "proposed_movies_count",
			COALESCE(cc.comments_count,0) AS "comments_count",COALESCE(lc.likes_count,0) AS "likes_count",
			COALESCE(wc.watchlist_count,0) AS "watchlist_count",COALESCE(rc.ratings_count,0) AS "ratings_count"
	FROM "movie"
		FULL OUTER JOIN 
			(SELECT "user_id", COUNT(*) "comments_count"
				FROM "review" WHERE "comment" IS NOT NULL GROUP BY review.user_id) cc
		ON movie.user_id = cc.user_id
		FULL OUTER JOIN
			(SELECT "user_id", COUNT(*) "likes_count"
				FROM "review" WHERE "liked" = true GROUP BY review.user_id) lc
		ON movie.user_id = lc.user_id
		FULL OUTER JOIN
			(SELECT "user_id", COUNT(*) "watchlist_count" FROM "review"
				WHERE "bookmarked" = true GROUP BY review.user_id) wc
		ON movie.user_id = wc.user_id
		FULL OUTER JOIN
			(SELECT "user_id", COUNT(*) "ratings_count" FROM "review"
				WHERE "rating" IS NOT NULL GROUP BY review.user_id) rc
		ON movie.user_id = rc.user_id
	GROUP BY movie.user_id,cc.comments_count, lc.likes_count, wc.watchlist_count, rc.ratings_count;

COMMIT;
