import { Item } from './item';

export class GildedTros {

  constructor(public items: Array<Item>) {
  }

  private readonly specialItems = ['Good Wine', 'Backstage passes for Re:Factor', 'Backstage passes for HAXX'];
  private readonly legendaryItems = ['B-DAWG Keychain'];
  private readonly smellyItems = ['Duplicate Code', 'Long Methods', 'Ugly Variable Names']

  public updateQuality(): void {
    this.items.forEach((item) => {
      if (this.specialItems.includes(item.name)) {
        this.updateSpecialItem(item);
      } else if (this.legendaryItems.includes(item.name)) {
        this.updateLegendaryItem(item);
      } else if (this.smellyItems.includes(item.name)) {
        this.updateSmellyItem(item);
      } else {
        this.updateNormalItem(item);
      }
    });
  }

  public updateSpecialItem(item: Item) {
    // Wine should increase in quality
    if (item.name === 'Good Wine') {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }

    // For backstage passes
    if (item.name.indexOf('Backstage passes') !== -1) {
      if (item.sellIn <= 10 && item.sellIn > 5) {
        item.quality = item.quality + 2;
      } else if (item.sellIn <= 5 && item.sellIn > 0) {
        item.quality = item.quality + 3;
      }
      else if (item.sellIn < 0) {
        item.quality = 0;
      } else {
        item.quality = item.quality + 1;
      }
    }

    item.sellIn = item.sellIn - 1;
    return item;
  }

  public updateSmellyItem(item: Item) {
    const isDegraded = item.sellIn < 0;
    const qualityDegrader = 2;
    const minimumQuality = isDegraded ? 4 : 2;

    if (item.quality > minimumQuality) {
      item.quality = isDegraded ? item.quality - qualityDegrader * 2 : item.quality - qualityDegrader;
    } else {
      item.quality = 0;
    }

    item.sellIn = item.sellIn - 1;
    return item;
  }

  public updateLegendaryItem(item: Item) {
    return item;
  }

  public updateNormalItem(item: Item) {
    const isDegraded = item.sellIn < 0;
    const qualityDegrader = 1;
    const minimumQuality = isDegraded ? 2 : 1;

    if (item.quality > minimumQuality) {
      item.quality = isDegraded ? item.quality - qualityDegrader * 2 : item.quality - qualityDegrader;
    } else {
      item.quality = 0;
    }

    item.sellIn = item.sellIn - 1;
    return item;
  }
}

