import { $, type DomElement } from "@neptune3d/dom";

/**
 * An unstyled component for creating a simple key - value list
 * with a label and value in each item.
 */
export class DataList {
  constructor(items?: DataListItemDescription[]) {
    this.root = $("div").className("n-data-list");
    if (items) {
      this._handleItems(items);
    }
  }

  /**
   * Root element
   *
   * Classname: `n-data-list`.
   */
  readonly root: DomElement<"div">;

  protected _items: DataListItemDescription[] = [];

  protected _itemEls: DataListItem[] = [];

  /**
   * The currently active item description objects.
   */
  get items(): DataListItemDescription[] {
    return this._items;
  }

  protected _handleItems(items: DataListItemDescription[]): void {
    this._items = items;
    const diff = items.length - this._itemEls.length;

    // more items than elements create them
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        const el = new DataListItem();
        this.root.add(el.root);
        this._itemEls.push(el);
      }
    }
    // more elements than items, remove the extra elements
    else if (diff < 0) {
      for (let i = items.length; i < this._itemEls.length; i++) {
        this._itemEls[i].root.remove();
      }
      this._itemEls = this._itemEls.slice(0, items.length);
    }

    // update the elements for all the items
    for (let i = 0, len = items.length; i < len; i++) {
      const item = items[i];
      const el = this._itemEls[i];
      el.update(item);
    }
  }

  /**
   * Updates the list of items with the array of item description objects.
   *
   * Reuses existing item elements, creates new elements if needed or removes any redundant ones.
   *
   * @param items Array of item description objects
   */
  updateItems(items: DataListItemDescription[]): void {
    this._handleItems(items);
  }
}

/**
 * An unstyled component for creating a simple key - value list item.
 */
export class DataListItem {
  constructor() {
    this.root = $("div").className("n-data-list-item");
    this.label = $("div").className("n-data-list-item-label");
    this.value = $("div").className("n-data-list-item-value");
    this.root.add(this.label, this.value);
  }

  /**
   * Root element
   *
   * Classname: `n-data-list-item`.
   */
  readonly root: DomElement<"div">;
  /**
   * Label element
   *
   * Classname: `n-data-list-item-label`.
   */
  readonly label: DomElement<"div">;
  /**
   * Value element
   *
   * Classname: `n-data-list-value`.
   */
  readonly value: DomElement<"div">;

  /**
   * Updates the label and value text with an item description object.
   *
   * @param desc Item description with label and value fields.
   */
  update(desc: DataListItemDescription): void {
    this.label.text(desc.label);
    this.value.text(desc.value);
  }
}

export type DataListItemDescription = {
  label: string;
  value: string | number;
};
