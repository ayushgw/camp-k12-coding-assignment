import angular from 'angular';

import './ask.styles.css';
import AskController from './ask.controller';

export default angular.module('ask', [])
.controller('AskController', AskController)
.name;
