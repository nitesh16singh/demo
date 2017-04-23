import forever  from 'forever-monitor';
const child = new (forever.Monitor)('./server.js', {
      silent: false,
      max: 999999999,
      'killTree': true
  }
)

child.on('exit', () => {
  console.log('Server has exited after restarts');
});

child.on('restart',(forever)=> {
  // Send mail if required.
});


child.on('error',(err) => {
  console.log('err >>>' + err.stack);
});

child.start();

//forever start -c "node -r babel-register" ./server.js
