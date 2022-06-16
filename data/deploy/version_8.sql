-- Deploy cinevoraces:version_8 to pg

BEGIN;

DROP VIEW filters_options;

CREATE VIEW filters_options AS
      SELECT 
      sl.seasons_list,
      gl.genres_list,
      cl.countries_list,
      rdl.min_max_dates,
      mr.max_runtime
      FROM 
      ( SELECT array_agg(DISTINCT array[season.number,season.year] ) AS seasons_list
            FROM season) sl,
      ( SELECT array_agg(DISTINCT genre.name) AS genres_list
            FROM genre) gl,
      ( SELECT array_agg(DISTINCT country.name) AS countries_list
            FROM country) cl,
      ( SELECT array [mind.min,maxd.max]  AS min_max_dates
            FROM ( SELECT EXTRACT(YEAR FROM min(movie.release_date)) AS min
                  FROM movie) mind,
            ( SELECT EXTRACT(YEAR FROM max(movie.release_date)) AS max
                  FROM movie) maxd) rdl,
      ( SELECT max(movie.runtime) AS max_runtime FROM movie) mr;

COMMIT;
