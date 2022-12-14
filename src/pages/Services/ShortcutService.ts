import { ListItem } from '@/pages/BaseTypes';
import { Subject } from "rxjs";

class ShortcutService {
  search$: Subject<boolean> = new Subject<boolean>();

  arrowUp$: Subject<boolean> = new Subject<boolean>();
  arrowDown$: Subject<boolean> = new Subject<boolean>();

  enter$: Subject<boolean> = new Subject<boolean>();

  actionOver$: Subject<boolean> = new Subject<boolean>();

  iconChange$: Subject<ListItem> = new Subject<ListItem>();

  onGlobalKeydown(e: KeyboardEvent) {
    const { ctrlKey, key, metaKey } = e
    if (ctrlKey || metaKey) {
      if (key === 'f') {
        this.handleSearch(e)
      }
    }

    if (key === 'ArrowUp') {
      this.handleArrowUp(e)
    } else if (key === 'ArrowDown') {
      this.handleArrowDown(e)
    } else if (key === 'Enter') {
      this.handleEnter(e);
    }
  }

  private handleSearch(e: KeyboardEvent) {
    e.preventDefault();
    this.search$.next(true)
  }

  private handleArrowUp(e: KeyboardEvent) {
    e.preventDefault();
    this.arrowUp$.next(true)
  }

  private handleArrowDown(e: KeyboardEvent) {
    e.preventDefault();
    this.arrowDown$.next(true)
  }

  private handleEnter(e: KeyboardEvent) {
    e.preventDefault();
    this.enter$.next(true)
  }
}

export default new ShortcutService();