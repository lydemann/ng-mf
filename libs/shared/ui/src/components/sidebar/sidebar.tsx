import { Component, h, Prop, State, Listen } from '@stencil/core';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: SidebarItem[];
  isActive?: boolean;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

@Component({
  tag: 'shared-sidebar',
  styleUrl: 'sidebar.scss',
  shadow: true,
})
export class Sidebar {
  @Prop() sections: SidebarSection[] = [];
  @Prop() collapsed = false;
  @State() expandedItems: Set<string> = new Set();

  @Listen('click', { target: 'document' })
  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('shared-sidebar')) {
      return;
    }
  }

  toggleItem(itemId: string) {
    const newExpanded = new Set(this.expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    this.expandedItems = newExpanded;
  }

  renderIcon(iconName: string) {
    const iconMap = {
      'house': 'house',
      'chat': 'chat-circle',
      'document': 'file-text',
      'arrow-right': 'caret-right',
      'arrow-left': 'caret-left',
      'user': 'user',
      'dashboard': 'squares-four',
      'settings': 'gear-six',
      'analytics': 'chart-line',
      'users': 'users',
      'products': 'package',
      'orders': 'shopping-cart',
      'reports': 'chart-bar',
      'calendar': 'calendar',
      'notifications': 'bell',
      'search': 'magnifying-glass',
      'logout': 'sign-out',
      'profile': 'user-circle',
      'help': 'question',
      'info': 'info',
      'printer': 'printer',
      'folder': 'folder',
      'broadcast': 'broadcast',
      'lightning': 'lightning',
      'user-circle': 'user-circle',
    };
    
    const phosphorIconName = iconMap[iconName] || 'file-text';
    return <ui-icon name={phosphorIconName} size="medium" color="neutral"></ui-icon>;
  }

  renderItem(item: SidebarItem) {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = this.expandedItems.has(item.id);
    const isActive = item.isActive;

    return (
      <div class="relative">
        <div 
          class={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
            isActive 
              ? 'bg-sidebar-active text-white' 
              : 'hover:bg-sidebar-hover'
          } ${hasChildren ? 'justify-between' : ''}`}
          onClick={() => hasChildren ? this.toggleItem(item.id) : null}
        >
          {item.icon && (
            <span class={`mr-3 text-lg min-w-[1.5rem] ${this.collapsed ? 'mx-auto mr-0' : ''}`}>
              {this.renderIcon(item.icon)}
            </span>
          )}
          {!this.collapsed && (
            <span class="flex-1 text-sm font-medium">{item.label}</span>
          )}
          {hasChildren && !this.collapsed && (
            <span class={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
              {this.renderIcon('arrow-right')}
            </span>
          )}
        </div>
        {hasChildren && isExpanded && !this.collapsed && (
          <div class="ml-6 mt-1 space-y-1">
            {item.children.map(child => this.renderItem(child))}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <aside class={`bg-sidebar-bg text-sidebar-text min-h-screen flex flex-col transition-[width] duration-300 ease-in-out ${
        this.collapsed ? 'w-16' : 'w-64'
      }`}>
        <div class="flex-1 p-4">
          {this.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} class="mb-6">
              {section.title && !this.collapsed && (
                <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </h3>
              )}
              <div class="space-y-1">
                {section.items.map(item => this.renderItem(item))}
              </div>
            </div>
          ))}
        </div>
        <button 
          class="w-full p-3 border-t border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200"
          onClick={() => this.collapsed = !this.collapsed}
        >
          <span class={this.collapsed ? 'mx-auto' : ''}>
            {this.renderIcon('arrow-left')}
          </span>
        </button>
      </aside>
    );
  }
}
