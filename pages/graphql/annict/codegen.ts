import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/annict/schema.graphql',
  documents: ['graphql/annict/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    'graphql/annict/generated/': {
      preset: 'client',
      config: {
        defaultScalarType: 'unknown',
        useTypeImports: true,
        skipTypename: true,
        avoidOptionals: true,
        scalars: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          DateTime: 'string',
        },
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['yarn prettier --write graphql/annict/generated/'],
  },
}

export default config
