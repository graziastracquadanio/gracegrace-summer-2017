import { GracegraceSummer2017Page } from './app.po';

describe('gracegrace-summer2017 App', () => {
  let page: GracegraceSummer2017Page;

  beforeEach(() => {
    page = new GracegraceSummer2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
