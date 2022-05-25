// import 'expect-puppeteer'
const local = "http://192.168.0.103:4321/users"
const web = "https://api.raul-abreu.workers.dev/users"

describe('get users', () => {
  // beforeAll(async () => {
  //   await page.goto('http://google.com');
  // });

  test('from local', async () => {
    await page.goto(local);
    const tag = 'html'

    // await page.waitForSelector(tag)
    const element = await page.$(tag)
    const { users } = await page.evaluate(el => JSON.parse(el.textContent), element)

    expect(users[0]).toEqual({ id: 1, name: 'Raul' });
  });
});
