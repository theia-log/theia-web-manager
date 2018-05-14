import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

import Wrapper from './Wrapper';

ReactDOM.render(<Wrapper />, document.getElementById('root'));
registerServiceWorker();
