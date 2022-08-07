-- Deploy cinevoraces:version_3 to pg

BEGIN;

-- Compte de saisons, de films et de pays
CREATE VIEW global_metrics AS

	SELECT sc.ct "seasons_count",mc.ct "movies_count",cc.ct "countries_count"
	FROM
		(SELECT COUNT (*) ct FROM "season")sc,
		(SELECT COUNT (*) ct FROM "movie" WHERE is_published = 'true')mc,
		(SELECT COUNT (*) ct FROM "country")cc;

-- Aggrégation de toutes les intéractions de l'utilisateur : films proposés, commentaires publiés, films likés, films mis en bookmarks et films notés 
CREATE VIEW indiv_actions_metrics AS
SELECT "user".id,
    COALESCE(pc.propositions_count, 0::bigint) AS propositions_count,
    COALESCE(cc.comments_count, 0::bigint) AS comments_count,
    COALESCE(lc.likes_count, 0::bigint) AS likes_count,
    COALESCE(wc.watchlist_count, 0::bigint) AS watchlist_count,
    COALESCE(rc.ratings_count, 0::bigint) AS ratings_count
   FROM "user"
     FULL JOIN ( SELECT movie.user_id,
            count(*) AS propositions_count
           FROM movie
          GROUP BY movie.user_id) pc ON "user".id = pc.user_id
     FULL JOIN ( SELECT review.user_id,
            count(*) AS comments_count
           FROM review
          WHERE review.comment IS NOT NULL
          GROUP BY review.user_id) cc ON "user".id = cc.user_id
     FULL JOIN ( SELECT review.user_id,
            count(*) AS likes_count
           FROM review
          WHERE review.liked = true
          GROUP BY review.user_id) lc ON "user".id = lc.user_id
     FULL JOIN ( SELECT review.user_id,
            count(*) AS watchlist_count
           FROM review
          WHERE review.bookmarked = true
          GROUP BY review.user_id) wc ON "user".id = wc.user_id
     FULL JOIN ( SELECT review.user_id,
            count(*) AS ratings_count
           FROM review
          WHERE review.rating IS NOT NULL
          GROUP BY review.user_id) rc ON "user".id = rc.user_id
  GROUP BY "user".id, cc.comments_count, lc.likes_count, wc.watchlist_count, rc.ratings_count, pc.propositions_count
  ORDER BY "user".id;

-- Récupère toutes les informations des tables secondaires pour préparer une liste d'objets films complets avec
-- Les métadonnées de l'objet film lui-même
-- Les informations de la saison
-- Les genres
-- Les pays
-- Les langues
-- Les metrics des films
-- /!\ Inclut également les propositions en attente
CREATE VIEW movies_infos AS
	SELECT movie.id,movie.french_title,movie.original_title,movie.poster_url,movie.directors,movie.release_date,
		movie.runtime, movie.casting,movie.presentation,movie.is_published,
		movie.publishing_date, movie.user_id as "user_id",
		-- Table user
		"user".pseudo AS user_pseudo,"user".avatar_url AS user_avatar_url,
		-- Table season
		season.number as season_number,
		-- Table genre, country & language
		array_agg(DISTINCT genre.name) AS genres,array_agg(DISTINCT country.name) AS countries,
		array_agg(DISTINCT language.name) AS languages,
		-- Watchlist counts
		COALESCE(wc.watchlist_count,0) AS "watchlist_count",
		-- Views counts
		COALESCE(vc.views_count,0) AS "views_count",
		-- Likes counts
		COALESCE(lc.likes_count,0) AS "likes_count",
		-- Ratings counts
		COALESCE(rc.ratings_count,0) AS "ratings_count",
		-- Average ratings
		ROUND(COALESCE(ar.avg_rating,0),0) AS "avg_rating"
		
	FROM movie
			-- Jointure table user
			JOIN "user" ON "user".id = movie.user_id
			-- Jointure table season
			JOIN season ON season.id = movie.season_id
			-- Jointures genres, countries et languages
			JOIN movie_has_genre ON movie.id = movie_has_genre.movie_id
			JOIN genre ON movie_has_genre.genre_id = genre.id
			JOIN movie_has_country ON movie.id = movie_has_country.movie_id
			JOIN country ON movie_has_country.country_id = country.id
			JOIN movie_has_language ON movie.id = movie_has_language.movie_id
			JOIN "language" ON movie_has_language.language_id = "language".id
			-- Jointure watchlist
			FULL OUTER JOIN
			(SELECT review.movie_id AS "movie_id", COUNT(*) "watchlist_count"
				FROM review where "bookmarked" = true GROUP BY movie_id) wc
			ON movie.id = wc.movie_id
			-- Jointure views
			FULL OUTER JOIN
			(SELECT review.movie_id AS "movie_id", COUNT(*) "views_count"
				FROM review where "viewed" = true GROUP BY movie_id) vc
			ON movie.id = vc.movie_id
			-- Jointure likes
			FULL OUTER JOIN
			(SELECT review.movie_id AS "movie_id", COUNT(*) "likes_count"
				FROM review where "liked" = true GROUP BY movie_id) lc
			ON movie.id = lc.movie_id
			-- Jointure ratings
			FULL OUTER JOIN
			(SELECT review.movie_id AS "movie_id", COUNT(*) "ratings_count"
				FROM "review" WHERE "rating" IS NOT NULL GROUP BY review.movie_id) rc
			ON movie.id = rc.movie_id
			-- Jointure ratings (average)
			FULL OUTER JOIN
			(SELECT review.movie_id AS "movie_id", AVG(rating) "avg_rating"
				FROM "review" WHERE "rating" IS NOT NULL GROUP BY review.movie_id) ar
			ON movie.id = ar.movie_id
			
	GROUP BY
		movie.id,movie.french_title,movie.original_title,movie.directors,movie.release_date,
		movie.runtime, movie.casting,movie.presentation, movie.is_published,
		movie.publishing_date, movie.user_id, movie.season_id,
		"user_id",user_pseudo,user_avatar_url,season_number,
		watchlist_count,views_count,likes_count,ratings_count,avg_rating
	ORDER BY movie.id DESC;

-- Liste des propositions en attente, avec french_title, poster_url, directors, release_date
CREATE VIEW pending_propositions AS
	SELECT id,french_title,poster_url,directors,release_date,"user_id","user_pseudo",publishing_date,genres, presentation
	FROM movies_infos
	WHERE is_published = false;

-- Liste des films de la saison en cours, avec id, french title, poster_url et season_number
CREATE VIEW last_season_movies AS
	SELECT *
	FROM movies_infos
	WHERE season_number = (SELECT MAX(season_number) FROM movies_infos);

-- Listes des options de filtres disponibles
CREATE VIEW filters_options AS
	SELECT sl.seasons_list seasons_list, gl.genres_list genres_list, cl.countries_list countries_list,
			dl.min_max_dates min_max_dates
	FROM
		(SELECT array_agg(DISTINCT number) seasons_list FROM season) sl,
		(SELECT array_agg(DISTINCT name) genres_list FROM genre) gl,
		(SELECT array_agg(DISTINCT name) countries_list FROM country) cl,
		(SELECT array_agg(mind.min || ',' || maxd.max) min_max_dates
		FROM (SELECT MIN(release_date) FROM movie) mind, (SELECT MAX(release_date) FROM movie) maxd) dl;

-- Liste des commentaires pour un film
CREATE VIEW movie_comments AS
 SELECT review.user_id,
    "user".pseudo AS user_pseudo,
    review.movie_id,
    review.rating,
    review.created_at,
    review.comment,
    "user".avatar_url
   FROM review
     JOIN "user" ON review.user_id = "user".id
  WHERE review.comment IS NOT NULL
  ORDER BY created_at DESC;

CREATE VIEW next_propositions AS
	SELECT * FROM
			(SELECT * FROM public.proposition_slot
			WHERE public.proposition_slot.publishing_date > now()
			ORDER BY id ASC
			LIMIT 10)p10
	WHERE is_booked = false;

COMMIT;
