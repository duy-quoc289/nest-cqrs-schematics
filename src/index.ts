import { Rule, SchematicContext, Tree, apply, url, template, move, chain, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema.d';

export function cqrsModule(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const modulePath = `${options.path}/${options.name}`;
    const sourceTemplates = url('./files');
    const sourceParameterizedTemplates = apply(sourceTemplates, [
      template({ ...options, ...strings }),
      move(modulePath),
    ]);

    return chain([mergeWith(sourceParameterizedTemplates)])(tree, _context);
  };
}
