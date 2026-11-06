import { startRouter, navigate } from './router.js';
import { initBoard, showBoard } from './routes/board.js';
import { initPostForm, resetForm } from './routes/post-form.js';
import { renderSuccess } from './routes/post-success.js';
import { renderDetail } from './routes/listing-detail.js';

let lastPosted = null;

initBoard();
initPostForm({
  onPosted(item) {
    lastPosted = item;
    navigate('/post/success');
  }
});

startRouter([
  { path: '/', view: '#view-board', title: 'Lost & Found Board', enter: showBoard },
  { path: '/post', view: '#view-form', title: 'Post an item · Lost & Found', enter: resetForm },
  {
    path: '/post/success', view: '#view-success', title: 'Item posted · Lost & Found',
    enter() {
      if (!lastPosted) { navigate('/'); return false; }
      renderSuccess(lastPosted);
    }
  },
  { path: '/item/:id', view: '#view-detail', title: 'Listing · Lost & Found', enter: ({ id }) => renderDetail(id) }
]);
