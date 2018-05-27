import angular from 'angular';

import AuthService from './services/auth.service';
import DatabaseService from './services/database.service';

import './deps/fa-svg-with-js.css';
import './deps/fontawesome-all.min.js';

export default angular.module('Data', [])
.service('AuthService', AuthService)
.service('DatabaseService', DatabaseService)
.name;
