import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { FeatherIconDirective } from '../../../core/feather-icon/feather-icon.directive';
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, HasAnyAuthorityDirective ,RouterLinkActive, NgScrollbar, FeatherIconDirective],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('sidebarToggler') sidebarToggler!: ElementRef;
  @ViewChild('sidebarMenu') sidebarMenu!: ElementRef;

  menuItems: MenuItem[] = MENU;
  private currentPath = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
        setTimeout(() => {
          this.activateCurrentMenu();
          this.closeMobileSidebar();
        }, 0);
      }
    });
  }

  ngOnInit(): void {
    this.setupResponsiveSidebar();
  }

  ngAfterViewInit(): void {
    this.activateCurrentMenu();
    this.cdr.detectChanges();
  }

  hasItems = (item: MenuItem): boolean => !!item.subItems?.length;

  toggleSidebar(e: Event): void {
    e.preventDefault();
    this.sidebarToggler.nativeElement.classList.toggle('active');

    if (window.matchMedia('(min-width: 992px)').matches) {
      this.document.body.classList.toggle('sidebar-folded');
    } else {
      this.document.body.classList.toggle('sidebar-open');
    }
  }

  operSidebarFolded(): void {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.add('open-sidebar-folded');
    }
  }

  closeSidebarFolded(): void {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.remove('open-sidebar-folded');
    }
  }

  toggleSubmenu(event: Event, item: MenuItem): void {
    event.preventDefault();
    event.stopPropagation();

    this.closeOtherMenus(item);
    item.expanded = !item.expanded;
    this.updateDOMClasses(event.currentTarget as HTMLElement, item);

    console.log(`Menu ${item.label} ${item.expanded ? 'ouvert' : 'fermé'}`);
  }

  private setupResponsiveSidebar(): void {
    const desktopMedium = window.matchMedia('(min-width:992px) and (max-width: 1199px)');
    desktopMedium.addEventListener('change', () => this.handleMediaQuery(desktopMedium));
    this.handleMediaQuery(desktopMedium);
  }

  private handleMediaQuery(mq: MediaQueryList): void {
    this.document.body.classList.toggle('sidebar-folded', mq.matches);
  }

  private closeMobileSidebar(): void {
    if (window.matchMedia('(max-width: 991px)').matches) {
      this.document.body.classList.remove('sidebar-open');
    }
  }

  private closeOtherMenus(currentItem: MenuItem): void {
    const parentItem = this.findParentItem(currentItem);
    const itemsToCheck = parentItem?.subItems || this.menuItems;

    itemsToCheck.forEach(item => {
      if (item !== currentItem && !item.isTitle) {
        this.closeMenuItem(item);
      }
    });
  }

  private findParentItem(targetItem: MenuItem): MenuItem | null {
    for (const item of this.menuItems) {
      if (item.subItems?.includes(targetItem)) return item;

      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.subItems?.includes(targetItem)) return subItem;
        }
      }
    }
    return null;
  }

  private closeMenuItem(item: MenuItem): void {
    item.expanded = false;
    item.subItems?.forEach(subItem => this.closeMenuItem(subItem));
  }

  private updateDOMClasses(element: HTMLElement, item: MenuItem): void {
    const parentLi = element.closest('li');
    const submenu = parentLi?.querySelector('.sub-menu') as HTMLElement;

    if (!submenu) return;

    const isExpanded = item.expanded;
    parentLi?.classList.toggle('mm-active', isExpanded);
    submenu.classList.toggle('mm-show', isExpanded);
    submenu.style.display = isExpanded ? 'block' : 'none';
    element.setAttribute('aria-expanded', String(isExpanded));
  }

  private activateCurrentMenu(): void {
    this.resetAllMenuStates();
    this.resetDOMStates();

    const activeItems = this.findActiveMenuItems();
    this.expandActiveItems(activeItems);
    this.updateDOMForActiveItems();
  }

  private resetAllMenuStates(): void {
    const resetItem = (item: MenuItem): void => {
      if (!item.isTitle) {
        item.expanded = false;
        item.subItems?.forEach(resetItem);
      }
    };

    this.menuItems.forEach(resetItem);
  }

  private resetDOMStates(): void {
    this.document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.remove('mm-active');

      const submenu = item.querySelector('.sub-menu') as HTMLElement;
      const navLink = item.querySelector('a.nav-link, a.side-nav-link-a-ref');

      if (submenu) {
        submenu.classList.remove('mm-show');
        submenu.style.display = 'none';
      }

      navLink?.setAttribute('aria-expanded', 'false');
    });
  }

  private findActiveMenuItems(): Set<MenuItem> {
    const activeItems = new Set<MenuItem>();

    const checkItem = (item: MenuItem, parents: MenuItem[] = []): void => {
      if (item.link === this.currentPath) {
        parents.forEach(parent => activeItems.add(parent));
        activeItems.add(item);
        return;
      }

      item.subItems?.forEach(subItem =>
        checkItem(subItem, [...parents, item])
      );
    };

    this.menuItems.forEach(item => checkItem(item));
    return activeItems;
  }

  private expandActiveItems(activeItems: Set<MenuItem>): void {
    activeItems.forEach(item => {
      if (this.hasItems(item)) {
        item.expanded = true;
      }
    });
  }

  private updateDOMForActiveItems(): void {
    setTimeout(() => {
      this.menuItems.forEach((item, index) => {
        if (item.expanded && this.hasItems(item)) {
          this.updateMenuDOM(item, index + 1);
        }
      });
    }, 0);
  }

  private updateMenuDOM(item: MenuItem, nthChild: number): void {
    const selector = `.sidebar-nav > li:nth-child(${this.calculateNthChild(item)}) > a`;
    const menuElement = this.document.querySelector(selector);
    const parentLi = menuElement?.closest('li');
    const submenu = parentLi?.querySelector('.sub-menu') as HTMLElement;

    if (parentLi && submenu) {
      parentLi.classList.add('mm-active');
      submenu.classList.add('mm-show');
      submenu.style.display = 'block';
      menuElement?.setAttribute('aria-expanded', 'true');

      this.updateSubMenuDOM(item.subItems || [], submenu);
    }
  }

  private updateSubMenuDOM(subItems: MenuItem[], parentSubmenu: HTMLElement): void {
    subItems.forEach(subItem => {
      if (subItem.expanded && this.hasItems(subItem)) {
        const subMenuElement = parentSubmenu.querySelector('a[href="javascript:void(0);"]');
        const subParentLi = subMenuElement?.closest('li');
        const subSubmenu = subParentLi?.querySelector('.sub-menu') as HTMLElement;

        if (subParentLi && subSubmenu) {
          subParentLi.classList.add('mm-active');
          subSubmenu.classList.add('mm-show');
          subSubmenu.style.display = 'block';
          subMenuElement?.setAttribute('aria-expanded', 'true');
        }
      }
    });
  }

  private calculateNthChild(targetItem: MenuItem): number {
    return this.menuItems.findIndex(item => item === targetItem) + 1;
  }

  isActive(item: MenuItem): boolean {
    if (!item.link) return false;
    const currentUrl = this.currentPath;

    if (currentUrl === item.link || currentUrl === item.link + '/') {
      return true;
    }

    if (currentUrl.startsWith(item.link + '/')) {
      return true;
    }
    if (item.subItems && item.subItems.length > 0) {
      return item.subItems.some(sub => this.isActive(sub));
    }

    return false;
  }

}