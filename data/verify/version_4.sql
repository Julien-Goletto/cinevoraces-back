-- Verify cinevoraces:version_4 on pg

BEGIN;

SELECT * FROM new_movie('Coucou', 'Kikou', 'lol', array['directors'], '2022-05-10', 110, array['if', else], 'presentation', '2022-05-06', 2, 1);

ROLLBACK;
