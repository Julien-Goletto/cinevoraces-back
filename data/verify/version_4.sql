-- Verify cinevoraces:version_4 on pg

BEGIN;

SELECT * FROM new_movie('french_title', 'original_title', 'poster_url', array['directors'], '2020-05-22', 120, array['casting'], 'presentation', '2025-05-25', 2, 1);

ROLLBACK;
