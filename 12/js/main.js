/* eslint-disable no-console */
// import {posts} from './data.js';

// console.log(posts);

import {renderPosts} from './preview.js';
import './form.js';
import { request } from './network.js';
import { showErrorReceive } from './modal.js';

request(renderPosts, showErrorReceive, 'GET');

