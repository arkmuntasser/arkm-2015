'use strict';

class SVMenu {
  constructor (options) {
    this.showButtonEl = document.querySelector('[data-svmenu-open]');
    this.hideButtonEl = document.querySelector('[data-svmenu-close]');
    this.sideNavEl = document.querySelector('[data-svmenu]');
    this.sideNavContainerEl = document.querySelector('[data-svmenu-inner]');
    this.expanderEls = document.querySelectorAll('[data-svmenu-expand]');

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.update = this.update.bind(this);
    this.expandSubMenu = this.expandSubMenu.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.touchingSideNav = false;
    this.options = options;

    this.addEventListeners();
  }

  addEventListeners () {
    this.showButtonEl.addEventListener('click', this.showSideNav);
    this.hideButtonEl.addEventListener('click', this.hideSideNav);
    this.sideNavEl.addEventListener('click', this.hideSideNav);
    this.sideNavContainerEl.addEventListener('click', this.blockClicks);

    for (let i = 0; i < this.expanderEls.length; i++) {
      this.expanderEls[i].addEventListener('click', this.expandSubMenu);
    }

    this.sideNavEl.addEventListener('touchstart', this.onTouchStart);
    this.sideNavEl.addEventListener('touchmove', this.onTouchMove);
    this.sideNavEl.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchStart (evt) {
    if (!this.sideNavEl.classList.contains('svmenu-visible'))
      return;

    this.startX = evt.touches[0].pageX;
    this.currentX = this.startX;

    this.touchingSideNav = true;
    requestAnimationFrame(this.update);
  }

  onTouchMove (evt) {
    if (!this.touchingSideNav)
      return;

    this.currentX = evt.touches[0].pageX;
    let translateX = 0;
    if(this.options.position === 'right') {
      translateX = Math.max(0, this.currentX - this.startX);

      if(translateX > 0) {
        evt.preventDefault();
      }
    } else {
      translateX = Math.min(0, this.currentX - this.startX);

      if (translateX < 0) {
        evt.preventDefault();
      }
    }
  }

  onTouchEnd (evt) {
    if (!this.touchingSideNav)
      return;

    this.touchingSideNav = false;

    let translateX = 0;
    if(this.options.position === 'right') {
      translateX = Math.max(0, this.currentX - this.startX);
    } else {
      translateX = Math.min(0, this.currentX - this.startX);
    }

    this.sideNavContainerEl.style.transform = '';

    if(this.options.position === 'right') {
      if( translateX > 0) {
        this.hideSideNav();
      }
    } else {
      if (translateX < 0) {
        this.hideSideNav();
      }
    }
  }

  update () {
    if (!this.touchingSideNav)
      return;

    requestAnimationFrame(this.update);

    let translateX = 0;
    if(this.options.position === 'right') {
      translateX = Math.max(0, this.currentX - this.startX);
    } else {
      translateX = Math.min(0, this.currentX - this.startX);
    }
    this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`;
  }

  expandSubMenu (evt) {
    evt.target.parentNode.parentNode.classList.toggle('svmenu-open')
  }

  blockClicks (evt) {
    evt.stopPropagation();
  }

  onTransitionEnd (evt) {
    this.sideNavEl.classList.remove('svmenu-animatable');
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav () {
    this.sideNavEl.classList.add('svmenu-animatable');
    this.sideNavEl.classList.add('svmenu-visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }

  hideSideNav () {
    this.sideNavEl.classList.add('svmenu-animatable');
    this.sideNavEl.classList.remove('svmenu-visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }
}

new SVMenu({ position: 'left' });
