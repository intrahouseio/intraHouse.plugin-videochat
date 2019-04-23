const Plugin = require('./lib/plugin');


const plugin = new Plugin();

const STORE = {
  session: {},
};



function send_list() {
  const list = Object.keys(STORE.session);
  list.forEach(key => {
    plugin.transferdata(key, { method: 'users', params: { list } });
  });
}

function new_session(id) {
  console.log(`new session: ${id}`)
  STORE.session[id] = {};
  send_list();
}

function close_session(id) {
  console.log(`remove session: ${id}`)
  delete STORE.session[id];
  send_list();
}

function session(data) {
  plugin.transferdata(data.dst, data );
}

plugin.on('transferdata', ({ id, data }) => {
  switch (data.method) {
    case 'new_session':
      new_session(id);
      break;
    case 'close_session':
      close_session(id);
      break;
    case 'session':
      session(data.params);
      break;
    default:
      break;
  }
});

plugin.on('start', () => {
});
