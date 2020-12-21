/**
 * This is the entry point for the type declarations module.
 * It starts with the Tableau Namespace which contains all the child namespaces and the enums.
 * Extension developers can access 'tableau' from the global namespace.
 *
 * Also, export all the required interfaces used in developing extensions
 */

import m = require('./ExternalContract/Namespaces/Tableau');
declare global {
  let tableau: typeof m;
}

export * from './ExtensionsApiExternalContract';
