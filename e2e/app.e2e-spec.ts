import { Drawand.ChatPage } from './app.po';

describe('drawand.chat App', () => {
  let page: Drawand.ChatPage;

  beforeEach(() => {
    page = new Drawand.ChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
