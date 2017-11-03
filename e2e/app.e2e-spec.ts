import { TwoHOnlineStorePage } from './app.po';

describe('two-honline-store App', function() {
  let page: TwoHOnlineStorePage;

  beforeEach(() => {
    page = new TwoHOnlineStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
