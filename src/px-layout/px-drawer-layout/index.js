import React from 'react';
import style from './style.scss';
import Drawer from '../../px-drawer';

/**
 * px-layout component
 */
export default class DrawerLayout extends React.Component {

  constructor(props){
    super(props);
    this.isAttached = false;

    console.log('DrawerLayout', this);
  }

  toggleClass(name, el){
    console.log('toggleClass', name);
  }
  notifyResize(name, el){
    console.log('notifyResize', name);
  }

  debounce(name, func){
    console.log('DrawerLayout.debounce', name);
    if(func){
      func.call(this);
    }

  }

  componentWillMount(){

    console.log('DrawerLayout', 'componentWillMount', this);
  }

  componentDidMount(){
    this.isAttached = true;


    //window.addEventListener('resize', this.handleResize).bind(this);
    this.$ = this.refs;
    console.log('DrawerLayout', 'componentDidMount', this);
    window.addEventListener('resize', (e) => {
      console.log(e);
      this.resetLayout().bind(this);
    }).bind(this)
    //this.resetLayout();
  }

  /**
   * Handle resetting the layout and either hiding or revealing the drawer.
   * @event px-layout-reset
   */
  resetLayout () {
    this.debounce('_resetLayout', () => {
      console.warn('_resetLayout', this);
      if (!this.isAttached) {
        console.warn('notAttached');
        //return;
      }

      const narrow = window.matchMedia(`(min-width: ${this.props.responsiveWidth})`).matches;
      var drawer = this.refs.drawer;
      var drawerWidth = this.refs.drawerContainer.offsetWidth
      var contentContainer = this.refs.contentContainer;
      const navbar = this.refs.navbar;

      if (narrow) {
        drawer.opened = drawer.persistent = false;
        drawer.type = 'temporary';
        //drawer.setAttribute('opened', true);
        contentContainer.classList.add('is-narrow');
        contentContainer.style.marginLeft = '';
        contentContainer.style.marginRight = '';
        if (navbar && navbar.fixed) {
          navbar.style.left = '';
        }
        console.log('narrow', narrow);
      } else {
        //drawer.setAttribute('opened', true);
        drawer.type = 'persistent';
        drawer.opened = drawer.persistent = true;
        //drawer.type = 'temporary';

        contentContainer.classList.remove('is-narrow');

        if (navbar && navbar.fixed) {
          navbar.style.left = drawerWidth + 'px';
        }

        if (drawer.align == 'right') {
          contentContainer.style.marginLeft = '';
          contentContainer.style.marginRight = drawerWidth + 'px';
        } else {
          console.log('moving drawer');
          contentContainer.style.marginLeft = (drawerWidth || 100) + 'px';
          contentContainer.style.marginRight = '';
        }
      }
      this.toggleClass('is-narrow', narrow);
      this.notifyResize();
    });
  }

  _handleDrawerToggle(){
    var drawer = this.refs.drawer;
    var drawerWidth = drawer.offsetWidth;
    var contentContainer = this.refs.contentContainer;
    console.log('_handleDrawerToggle');
    if(drawer && drawer.opened){
      if (drawer.align == 'right') {
        contentContainer.style.marginLeft = '';
        contentContainer.style.marginRight = drawerWidth + 'px';
      } else {
        contentContainer.style.marginLeft = drawerWidth + 'px';
        contentContainer.style.marginRight = '';
      }
    } else {
      contentContainer.style.marginLeft = '';
      contentContainer.style.marginRight = '';
    }
  }

  render() {
    const { drawerContent, navbarContent, children } = this.props;
    console.log('DrawerLayout.render', this.props)
    return (
      <div className='px-drawer-layout'>
        <div id="container" className="l-drawer-layout" ref='container'>
          <div id="drawerContainer" className="l-drawer-layout__drawer" ref='drawerContainer'>
            <Drawer ref='drawer'>{drawerContent}</Drawer>
          </div>
          <div id="contentContainer" className="l-drawer-layout__container " ref='contentContainer'>
            <nav id="navbarContent">{navbarContent}</nav>
            <div id="content">{children}</div>
          </div>
        </div>
        <style jsx >{style}</style>
      </div>
    );
  }
}

DrawerLayout.defaultProps = {
  forceNarrow: false,
  responsiveWidth: '768px',
  narrow: false
};