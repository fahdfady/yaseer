import Router from '../src/handlers/routing'; // replace with the actual path to the Router class

function testRouter() {
  const router = new Router();

  // Test the on method
  const callback = () => console.log('Test callback');
  router.on('/test', callback);
  if (router.routes['/test'] === callback) {
    console.log('on method test passed');
  } else {
    console.error('on method test failed');
  }

  // Test the navigateTo method
  const pushState = (state, title, path) => {
    console.log(`History updated to: ${path}`);
  };
  const originalPushState = history.pushState;
  history.pushState = pushState;
  router.navigateTo('/test');
  history.pushState = originalPushState;

  // Test the handlePopstate method
  const handleRoute = () => console.log('Handle route called');
  router.handleRoute = handleRoute;
  router.handlePopstate();

  // Add more tests as needed
}

testRouter();