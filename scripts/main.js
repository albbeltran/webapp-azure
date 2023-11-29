import Create from './modules/Create.js';
import Update from './modules/Update.js';
import Delete from './modules/Delete.js';

if(document.querySelector('#create-form')) new Create();
if(document.querySelector('#update-btn')) new Update();
if(document.querySelector('#delete-btn')) new Delete();