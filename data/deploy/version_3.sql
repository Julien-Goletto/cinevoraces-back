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

-- Récupère toutes les informations des tables secondaires pour préparer une liste d'objets films complets avec
-- Les métadonnées de l'objet film lui-même
-- Les informations de la saison
-- Les genres
-- Les pays
-- Les langues
-- /!\ Inclut également les propositions en attente
CREATE VIEW movies_infos AS
	SELECT movie.id,movie.french_title,movie.original_title,movie.poster_url,movie.directors,movie.release_date,
			movie.runtime, movie.casting,movie.presentation,movie.is_published,
			movie.publishing_date, movie.user_id as "user_id",
			"user".pseudo AS user_pseudo,"user".avatar_url AS user_avatar_url,
			season.number as season_number,
		array_agg(DISTINCT genre.name) AS genres,
		array_agg(DISTINCT country.name) AS countries,
		array_agg(DISTINCT language.name) AS languages
		FROM movie
		JOIN "user" ON "user".id = movie.user_id
		JOIN season ON season.id = movie.season_id
		JOIN movie_has_genre ON movie.id = movie_has_genre.movie_id
		JOIN genre ON movie_has_genre.genre_id = genre.id
		JOIN movie_has_country ON movie.id = movie_has_country.movie_id
		JOIN country ON movie_has_country.country_id = country.id
		JOIN movie_has_language ON movie.id = movie_has_language.movie_id
		JOIN "language" ON movie_has_language.language_id = "language".id
		GROUP BY movie.id,movie.french_title,movie.original_title,movie.directors,movie.release_date,
			movie.duration, movie.casting,movie.presentation, movie.is_published,
			movie.publishing_date, movie.user_id, movie.season_id,
			"user_id",user_pseudo,user_avatar_url,season_number;

-- Liste des propositions en attente, avec french_title, poster_url, directors, release_date
CREATE VIEW pending_propositions AS
	SELECT french_title,poster_url,directors,release_date,"user_id"
	FROM movies_infos
	WHERE is_published = false;

-- Liste des films de la saison en cours, avec id, french title, poster_url et season_number
CREATE VIEW last_season_movies AS
	SELECT id, french_title, poster_url, season_number
	FROM movies_infos
	GROUP BY id, french_title,poster_url,season_number
	HAVING season_number = (SELECT MAX(season_number) FROM movies_infos);

COMMIT;
