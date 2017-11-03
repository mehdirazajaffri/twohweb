import { WebsiteNamePipe } from './website-name.pipe';

describe('WebsiteNamePipe', () => {
  it('create an instance', () => {
    const pipe = new WebsiteNamePipe();
    expect(pipe).toBeTruthy();
  });
});
