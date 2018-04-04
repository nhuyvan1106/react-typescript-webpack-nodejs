import * as React from 'react';

import './AppComponent.styles.scss';

interface Props {
}
interface State {
}
export class App extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <main>
        Hello World
      </main>
    );
  }
}