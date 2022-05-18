-- Verify cinevoraces:version_4 on pg

BEGIN;

SELECT new_movie('Pour Sarah','For Sarah','toto',array['Damien Power'],'2022-02-25','135',array['Felix André Duval'],'Bonjour à tous, je m''appelle Joffrey et je ne connais pas la différence entre un film et une série. Déso.','2021-03-29',31,3,array['Thriller','Horror'],array['English'],array['United States of America']);

SELECT new_season(4,2023,'2023-01-02');
ROLLBACK;
