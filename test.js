const p = Promise.resolve();

async function foo() {
  return  p;
}

async function bar() {
  return await p;
}

foo().then(() => console.log('foo'));
bar().then(() => console.log('bar'));