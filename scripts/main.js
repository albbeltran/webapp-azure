import Create from './modules/Create.js';
import Update from './modules/Update.js';
import Delete from './modules/Delete.js';
import PATH from '../config/index.js';

if(document.querySelector('#create-form')) new Create(PATH);
if(document.querySelector('#update-btn')) new Update(PATH);
if(document.querySelector('#delete-btn')) new Delete(PATH);