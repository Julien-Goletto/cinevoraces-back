-- Deploy cinevoraces:version_4 to pg

BEGIN;

CREATE OR REPLACE FUNCTION new_movie(
	title TEXT,
	original_title TEXT,
	poster_url TEXT,
	directors TEXT[],
	release_date DATE,
	runtime INT,
	casting TEXT[],
	presentation TEXT,
	publishing_date DATE,
	user_id INT,
	season_id INT,
  movie_genres TEXT[],
	movie_languages TEXT[],
	movie_countries TEXT[]
) RETURNS void AS $$

DECLARE
-- 	Variables annonymes
	movie_id INT;
	g TEXT;
	genre_id INT;
	l TEXT;
	language_id INT;
	c TEXT;
	country_id INT;

BEGIN
	IF NOT EXISTS (SELECT * FROM movie WHERE title=movie.french_title) THEN
		INSERT INTO movie("french_title", "original_title", "poster_url", "directors", "release_date", "runtime", "casting", "presentation", "publishing_date", "user_id", "season_id")
		VALUES (title, original_title, poster_url, directors, release_date, runtime, casting, presentation, publishing_date, user_id, season_id)
		RETURNING id INTO movie_id;
		FOREACH g IN ARRAY movie_genres
			LOOP
				IF NOT EXISTS (SELECT * FROM genre WHERE name=g) THEN
					INSERT INTO genre("name") SELECT g
					RETURNING id INTO genre_id;
				ELSE
					RAISE NOTICE 'Genre (%) déjà là', g;
					SELECT id INTO genre_id FROM genre WHERE genre.name=g;
				END IF;
				INSERT INTO movie_has_genre(movie_id, genre_id)
				SELECT movie_id, genre_id;
			END LOOP;
		FOREACH l IN ARRAY movie_languages
			LOOP
				IF NOT EXISTS (SELECT * FROM "language" WHERE name=l) THEN
					INSERT INTO "language"("name") SELECT l
					RETURNING id INTO language_id;
				ELSE
					RAISE NOTICE 'Langue (%) déjà là', l;
					SELECT id INTO language_id FROM language WHERE language.name=l;
				END IF;
				INSERT INTO movie_has_language(movie_id, language_id)
				SELECT movie_id, language_id;
			END LOOP;
		FOREACH c IN ARRAY movie_countries
			LOOP
				IF NOT EXISTS (SELECT * FROM country WHERE name=c) THEN
					INSERT INTO country("name") SELECT c
					RETURNING id INTO country_id;
				ELSE
					RAISE NOTICE 'Country (%) déjà là', c;
					SELECT id INTO country_id FROM country WHERE country.name=c;
				END IF;
				INSERT INTO movie_has_country(movie_id, country_id)
				SELECT movie_id, country_id;
			END LOOP;
	ELSE
		RAISE NOTICE 'Movie (%) déjà là', title;
	END IF;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION new_season(
season_to_add INT,
year_to_add INT,
first_episode DATE
) RETURNS void AS $$

DECLARE
-- 	Variables annonymes
    episode INT := 1;
    episode_date DATE;
BEGIN
    --On rajoute la saison dans la table correspondante
	IF NOT EXISTS (SELECT * FROM season WHERE season_to_add=season.number) THEN
		INSERT INTO "season"("number","year") VALUES
        (season_to_add,year_to_add);
		-- Remplissage de la table proposition_slot
        episode_date := first_episode;
        WHILE EXTRACT(YEAR FROM episode_date) < (year_to_add + 1)
        LOOP
            INSERT INTO "proposition_slot" ("season_number","episode","publishing_date") VALUES
            (season_to_add,episode,episode_date);
            -- On incrémente les pointeurs
            episode_date := episode_date + 7;
            episode := episode + 1;
		END LOOP;
	ELSE
		RAISE EXCEPTION 'Saison (%) déjà là', season_to_add;
	END IF;
END
$$LANGUAGE plpgsql;

COMMIT;
