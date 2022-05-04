-- -- Deploy ludotheque:version_2 to pg

BEGIN;

CREATE FUNCTION add_new_game(
  game_name TEXT,
  game_released_on TEXT,
  game_background_image TEXT,
  game_platforms TEXT[],
  game_genres TEXT[]) RETURNS void AS $$

DECLARE
	game_id INT;
	m TEXT;
	platform_id INT;
	n TEXT;
	genre_id INT;
  BEGIN
  	IF NOT EXISTS (SELECT * FROM game WHERE name=game_name) THEN
		INSERT INTO game(name,released_on,background_image)
    	SELECT game_name, game_released_on::TIMESTAMPTZ, game_background_image
		RETURNING id INTO game_id;
		RAISE NOTICE 'Game (%) has been saved into table game.', game_id;
		FOREACH m IN ARRAY game_platforms
			LOOP
				IF NOT EXISTS (SELECT * FROM platform WHERE name=m) THEN
				RAISE NOTICE 'Platform (%) is still not registered in base.', m;
				INSERT INTO platform (name) SELECT m
				RETURNING id INTO platform_id;
				RAISE NOTICE 'Platform (%) has been saved into platform table.', platform_id;
				ELSE
					SELECT id INTO platform_id FROM platform WHERE platform.name=m;
				END IF;
				INSERT INTO game_has_platform(game_id, platform_id)
				SELECT game_id, platform_id ;
				RAISE NOTICE
					'Link between game (%) and platform (%) has been saved into pivot table game_has_platform.', game_id, platform_id;
			END LOOP;
		
		FOREACH n IN ARRAY game_genres
			LOOP
				IF NOT EXISTS (SELECT * FROM genre WHERE name=n) THEN
				RAISE NOTICE 'Genre (%) is still not registered in base.', n;
				INSERT INTO genre (name) SELECT n
				RETURNING id INTO genre_id;
				RAISE NOTICE 'Genre (%) has been saved into platform table.', genre_id;
				ELSE
					SELECT id INTO genre_id FROM genre WHERE genre.name=n;
				END IF;
				INSERT INTO game_has_genre(game_id, genre_id)
				SELECT game_id, genre_id ;
				RAISE NOTICE
					'Link between game (%) and genre (%) has been saved into pivot table game_has_genre.', game_id, genre_id;
			END LOOP;
			
	ELSE
		RAISE EXCEPTION 'Game (%) already in base.', game_name;
	END IF;
	END
$$ LANGUAGE plpgsql;

COMMIT;
