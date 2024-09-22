import { Item } from '../src/item';
import { GildedTros } from '../src/gilded-tros';

function wrapper(items: Item[]) {
  const app: GildedTros = new GildedTros(items);
  app.updateQuality();
  return app;
}

describe('GildedTrosTest Normal Items', () => {
  it('should decrease the quality of an item by 1', () => {
    const items: Item[] = [new Item('Something', 10, 4)];
    const app = wrapper(items);
    expect(app.items[0].quality).toEqual(3);
  });

  it('should decrease the quality of an item by 2', () => {
    const items: Item[] = [new Item('Something', -1, 4)];
    const app = wrapper(items);
    expect(app.items[0].quality).toEqual(2);
  });

  it('should not have quality below 0', () => {
    const items: Item[] = [new Item('Something', -1, 1)];
    const app = wrapper(items);
    expect(app.items[0].quality).toEqual(0);
  });
});

describe('GildedTrosTest Special Items', () => {
  it('should update the quality of wine he older it gets', () => {
    const items: Item[] = [new Item('Good Wine', 10, 1)];
    const app = wrapper(items);
    expect(app.items[0].quality).toEqual(2);
  });

  it('should not increase the quality of wine above 50', () => {
    const items: Item[] = [new Item('Good Wine', 10, 50)];
    const app = wrapper(items);
    expect(app.items[0].quality).toEqual(50);
  });

  it('should update the quality of a Backstage pass by by 1', () => {
    const items: Item[] = [new Item('Backstage passes for HAXX', 11, 1)];
    const app = wrapper(items);

    expect(app.items[0].quality).toEqual(2);
  });

  it('should update the quality of a Backstage pass by by 2', () => {
    const items: Item[] = [new Item('Backstage passes for HAXX', 10, 1)];
    const app = wrapper(items);

    expect(app.items[0].quality).toEqual(3);
  });

  it('should update the quality of a Backstage pass by by 3', () => {
    const items: Item[] = [new Item('Backstage passes for HAXX', 2, 1)];
    const app = wrapper(items);

    expect(app.items[0].quality).toEqual(4);
  });

  it('should set the quality to 0 if the event has passed', () => {
    const items: Item[] = [new Item('Backstage passes for HAXX', -1, 1)];
    const app = wrapper(items);

    expect(app.items[0].quality).toEqual(0);
  })
});

describe('GildedTrosTest Smelly items', () => {
  it('should drop in quality twice as fast as normal items', () => {
    const items: Item[] = [new Item('Long Methods', 10, 3)];
    const app = wrapper(items);
    expect(app.items[0].quality).toEqual(1);
  });

  it('should not drop below 0', () => {
    const items: Item[] = [new Item('Long Methods', 10, 1)];
    const app = wrapper(items);
    expect(app.items[0].quality).toEqual(0);
  });
});

describe('GildedTrosTest Legendary items', () => {
  it(`should not change as Legendary items don't change `, () => {
    const items: Item[] = [new Item('B-DAWG Keychain', 10, 80)];
    const app = wrapper(items);
    expect(app.items[0].quality).toEqual(80);
    expect(app.items[0].sellIn).toEqual(10);
  });
});

