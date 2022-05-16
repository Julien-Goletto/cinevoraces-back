const APIError = require('../Errors/APIError');

/**
 * Générateur de middleware pour la validation des objets
 * et propriétés de requêtes
 * @param {string} prop - Nom de la propriété request à valider
 * @param {Joi.object} schema - Scehma de validation
 * @returns {Function} - Middleware de validation pour le corps de la requête,
 * Renvoie une erreur 400 en cas d'échec.
 */

module.exports = (prop, schema) => async (req, _, next) => {
  try {
    await schema.validateAsync(req[prop]);
    next();
  } catch (err) {
    next(new APIError(`${err}\n | 'The passed object doesn't fit with the required format.`, req.url, 400));
  }
};
