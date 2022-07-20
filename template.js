module.exports.createFCTsx = (name) => [
  `import React, { FC } from 'react';`,
  '',
  `interface Props {`,
  `props: any }`,
  '',
  `const ${name}: FC<Props> = ({ props }) => {`,
  `  return (`,
  `    <>`,
  `      <div>${name} renders</div>`,
  `    </>`,
  `  );`,
  `};`,
  '',
  `export default ${name};`,
];

module.exports.createTestTsx = (name) => [
  `import React from 'react';`,
  `import { faker } from '@faker-js/faker';`,
  `import { act, create, ReactTestRenderer } from 'react-test-renderer';`,
  `import ${name} from './${name}';`,
  '',
  `faker.seed(1);`,
  '',
  `describe('<${name}/> component', () => {`,
  `test('renders component', () => {`,
  `let renderer: ReactTestRenderer;`,
  '',
  `act(() => {`,
  `renderer = create(<${name} />);`,
  `expect(renderer!.toJSON()).toMatchSnapshot('Initial');`,
  `});`,
  `});`,
];
