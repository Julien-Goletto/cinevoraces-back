-- Revert cinevoraces:version_8 from pg

BEGIN;

DROP VIEW filters_options;

CREATE VIEW filters_options AS
	SELECT sl.seasons_list seasons_list, gl.genres_list genres_list, cl.countries_list countries_list,
			dl.min_max_dates min_max_dates
	FROM
		(SELECT array_agg(DISTINCT number) seasons_list FROM season) sl,
		(SELECT array_agg(DISTINCT name) genres_list FROM genre) gl,
		(SELECT array_agg(DISTINCT name) countries_list FROM country) cl,
		(SELECT array_agg(mind.min || ',' || maxd.max) min_max_dates
		FROM (SELECT MIN(release_date) FROM movie) mind, (SELECT MAX(release_date) FROM movie) maxd) dl;

COMMIT;
