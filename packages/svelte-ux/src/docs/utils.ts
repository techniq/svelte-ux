/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSONOutput } from 'typedoc';
import { TypeParser } from 'typedoc-json-parser';

export function getParameters(data: any, definition: string): string {
  const p = data.children?.find((c: any) => c.name === definition);
  let params = p.type?.declaration ? p.type?.declaration?.children : p.children;
  if (!params) {
    params = [p];
  }

  return params;
}

export function getParamData(param: any) {
  if (param.flags.isPrivate) return;

  const { description = '', blockTags = [] } = getComment(param) || {};

  return {
    name: `${param.name}${param.flags.isOptional ? '?' : ''}`,
    description: description ?? '—',
    defaultValue: blockTags.find((t) => t.name === 'defaultValue')?.text,
    type: getType(param),
  };
}

function getComment(node: any): ReturnType<typeof parseComment> | undefined {
  let comment;
  if (node.comment) {
    comment = node.comment;
  } else if (node?.signatures?.[0]?.comment) {
    comment = node.signatures[0].comment;
  } else if (node.type.type === 'reflection') {
    return getComment(node.type.declaration);
  }

  return comment ? parseComment(comment) : undefined;
}

function parseComment(comment: JSONOutput.Comment) {
  const { summary, blockTags = [], modifierTags = [] } = comment;

  return {
    description: summary.length
      ? summary
          .map((summary) =>
            summary.kind === 'inline-tag' ? `{${summary.tag} ${summary.text}}` : summary.text
          )
          .join('')
      : undefined,
    blockTags: blockTags.map((tag: any) => ({
      name: tag.name ?? tag.tag.replace(/@/, ''),
      text: tag.content
        .map((content: any) =>
          content.kind === 'inline-tag' ? `{${content.tag} ${content.text}}` : content.text
        )
        .join(''),
    })),
    modifierTags,
  };
}

function getType(node: any): string {
  const typeParser = TypeParser.generateFromTypeDoc(node.type);
  const typeString = typeParser.toString();

  if (typeString === 'Function') {
    return renderType(node);
  }

  return typeString;
}

// See: https://github.com/chialab/rna/tree/main/packages/rna-apidoc
function renderType(node: any): string {
  if (node.type === 'literal') {
    return typeof node.value === 'string' ? `"${node.value}"` : `${node.value}`;
  }
  if (node.type === 'intrinsic') {
    return node.name;
  }
  if (node.type === 'reflection') {
    return renderType(node.declaration);
  }
  if (node.type === 'query') {
    return renderType(node.queryType);
  }
  if (node.type === 'reference') {
    return node.name;
  }
  if (node.type === 'array') {
    const type = renderType(node.elementType);
    return `${
      type
        .replace(/(<([^>]+)>)/gi, '')
        .trim()
        .includes(' ')
        ? `(${type})`
        : type
    }[]`;
  }
  if (node.type === 'predicate') {
    return `${node.asserts ? 'assert ' : ''}${node.name} is ${renderType(node.targetType)}`;
  }
  if (node.type === 'intersection') {
    return node.types.map((type: any) => renderType(type)).join(' & ');
  }
  if (node.type === 'union') {
    return node.types.map((type: any) => renderType(type)).join(' | ');
  }
  if (node.type === 'tuple') {
    return `[${node.elements.map((type: any) => renderType(type)).join(', ')}]`;
  }
  if (typeof node.type === 'object') {
    return renderType(node.type);
  }
  if (node.indexSignature) {
    return renderType(node.indexSignature);
  }
  if (node.signatures) {
    return node.signatures.map((type: any) => renderSignature(type)).join('\n');
  }
  if (node.id) {
    return renderObject(node);
  }

  return '';
}

function renderSignature(node: JSONOutput.SignatureReflection, arrow = true): string {
  return `${node.kindString === 'Constructor signature' ? 'new ' : ''}${
    node.typeParameter ? renderTypeParams(node.typeParameter) : ''
  }(${node.parameters ? node.parameters.map((param) => renderParam(param)).join(', ') : ''})${
    arrow ? ' =>' : ':'
  } ${renderType(node)}`;
}

function renderParam(node: JSONOutput.ParameterReflection): string {
  return `${node.name}${node.flags.isOptional ? '?' : ''}: ${renderType(node.type)}`;
}

function renderTypeParams(nodes: JSONOutput.TypeParameterReflection[]): string {
  return `&lt;${nodes.map((type) => renderTypeParam(type)).join(', ')}&gt;`;
}

function renderTypeParam(node: JSONOutput.TypeParameterReflection): string {
  return `${node.name}${node.type ? ` extends ${renderType(node)}` : ''}`;
}

function renderObject(node: JSONOutput.ContainerReflection, level = 1, size = 2): string {
  return `{
${(node.children || [])
  .map(
    /**
     * @param {import('typedoc').JSONOutput.Reflection} child
     */
    (child) => {
      if (child.kindString === 'Property') {
        return renderProperty(child);
      }
      if (child.kindString === 'Method') {
        return renderMethod(child);
      }
      return renderNode(child);
    }
  )
  .map((line) => line.replace(/^/gm, ''.padStart(size * level, ' ')))
  .join(';\n')}
}`;
}

function renderProperty(node: JSONOutput.DeclarationReflection): string {
  return `${node.name}${node.flags.isOptional ? '?' : ''}: ${renderType(node.type)}`;
}

function renderMethod(node: JSONOutput.DeclarationReflection): string {
  if (!node.signatures) {
    return `${node.name}(): unknown`;
  }
  return node.signatures
    .map((signature) => `${node.name}${renderSignature(signature, false)}`)
    .join('\n');
}

function renderNode(node: JSONOutput.Reflection): string {
  switch (node.kindString) {
    case 'Class':
      return `renderClass(node)`;
    case 'Function':
      return `renderFunction(node)`;
    case 'Type alias':
      return `renderTypeAlias(node)`;
    case 'Variable':
      return `renderVariable(node)`;
  }
  return `<span>${renderKind(node)}${node.name}</span>`;
}

function renderKind(node: JSONOutput.Reflection) {
  if (!node.kindString) {
    return '';
  }
  return `<code>${node.kindString.replace(' alias', '')}</code> `;
}
