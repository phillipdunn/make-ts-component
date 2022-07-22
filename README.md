# make-ts-component

npm script to generate react component folders similar to ng-generate and mkrc.

Generates a React component folder, currently specific to a Next.ts project at hirespace.com.

The script will search for a "components" folder in the project route and will then create the
following files inside:

1. index.ts
2. {your_component_name}.tsx
3. {your_component_name}.test.tsx

## Install

```bash
npm i make-ts-component
```

## Add Script

In your package.json file add the following line inside 'scripts':

```bash
"mktsc": "node ./node_modules/make-ts-component"
```

e.g.

```bash
"scripts" : {
"mktsc": "node ./node_modules/make-ts-component"
}
```

## Run script

In the command line enter the following using npm:

```bash
npm run mktsc <component-name>
```

## More detail

All the files are prepopulated with some standard boiler plate code and include some of the basic packages in a typical project examples below:

index.ts

```ts
import Component from "./Component";

export default Component;
```

ExampleComponent.tsx

```ts
import React, {FC} from "react";

interface Props {
  props: any 
}
  
const ExampleComponent: FC<Props>  = ({ props }) => {
  return (
    <>
      <div>ExampleComponent works</div>
    </>
  );
};

export default Component;
```

ExampleComponent.test.tsx

```ts
import React, {FC} from "react";
import { faker } from '@faker-js/faker';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import ExampleComponent from "./ExampleComponent";

faker.seed(1);

describe('ExampleComponent tests', () => {
  test('renders component', () => {
    let renderer: ReactTestRenderer;
    act(() => {
      renderer = create(<${name} />);
      expect(renderer!.toJSON()).toMatchSnapshot('Initial');
    });
  });
});
```

## Testing in this repo

Run script by entering:

```bash
npm test
```

This will generate a component called "ExampleComponent" in the "components" folder at the root of the project
