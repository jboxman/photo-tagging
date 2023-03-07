import React from 'react';

import '@patternfly/react-core/dist/styles/base.css';

import { TreeView } from '@patternfly/react-core';

export class CheckboxTreeView extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      {
        name: 'Application launcher',
        id: 'example3-AppLaunch',
        checkProps: { 'aria-label': 'app-launcher-check', checked: false },
        children: [
          {
            name: 'Application 1',
            id: 'example3-App1',
            checkProps: { checked: false },
            children: [
              {
                name: 'Settings',
                id: 'example3-App1Settings',
                checkProps: { checked: false },
              },
              {
                name: 'Current',
                id: 'example3-App1Current',
                checkProps: { checked: false },
              },
            ],
          },
          {
            name: 'Application 2',
            id: 'example3-App2',
            checkProps: { checked: false },
            children: [
              {
                name: 'Settings',
                id: 'example3-App2Settings',
                checkProps: { checked: false },
              },
              {
                name: 'Loader',
                id: 'example3-App2Loader',
                checkProps: { checked: false },
                children: [
                  {
                    name: 'Loading App 1',
                    id: 'example3-LoadApp1',
                    checkProps: { checked: false },
                  },
                  {
                    name: 'Loading App 2',
                    id: 'example3-LoadApp2',
                    checkProps: { checked: false },
                  },
                  {
                    name: 'Loading App 3',
                    id: 'example3-LoadApp3',
                    checkProps: { checked: false },
                  },
                ],
              },
            ],
          },
        ],
        defaultExpanded: true,
      },
      {
        name: 'Cost management',
        id: 'example3-Cost',
        checkProps: { 'aria-label': 'cost-check', checked: false },
        children: [
          {
            name: 'Application 3',
            id: 'example3-App3',
            checkProps: { 'aria-label': 'app-3-check', checked: false },
            children: [
              {
                name: 'Settings',
                id: 'example3-App3Settings',
                checkProps: {
                  'aria-label': 'app-3-settings-check',
                  checked: false,
                },
              },
              {
                name: 'Current',
                id: 'example3-App3Current',
                checkProps: {
                  'aria-label': 'app-3-current-check',
                  checked: false,
                },
              },
            ],
          },
        ],
      },
      {
        name: 'Sources',
        id: 'example3-Sources',
        checkProps: { 'aria-label': 'sources-check', checked: false },
        children: [
          {
            name: 'Application 4',
            id: 'example3-App4',
            checkProps: { 'aria-label': 'app-4-check', checked: false },
            children: [
              {
                name: 'Settings',
                id: 'example3-App4Settings',
                checkProps: {
                  'aria-label': 'app-4-settings-check',
                  checked: false,
                },
              },
            ],
          },
        ],
      },
      {
        name: 'Really really really long folder name that overflows the container it is in',
        id: 'example3-Long',
        checkProps: { 'aria-label': 'long-check', checked: false },
        children: [
          {
            name: 'Application 5',
            id: 'example3-App5',
            checkProps: { 'aria-label': 'app-5-check', checked: false },
          },
        ],
      },
    ];

    this.state = { checkedItems: [] };

    this.onCheck = (evt, treeViewItem) => {
      const checked = evt.target.checked;
      console.log(checked);

      const checkedItemTree = this.options
        .map((opt) => Object.assign({}, opt))
        .filter((item) => this.filterItems(item, treeViewItem));
      const flatCheckedItems = this.flattenTree(checkedItemTree);
      console.log('flat', flatCheckedItems);

      this.setState(
        (prevState) => ({
          checkedItems: checked
            ? prevState.checkedItems.concat(
                flatCheckedItems.filter(
                  (item) =>
                    !prevState.checkedItems.some((i) => i.id === item.id)
                )
              )
            : prevState.checkedItems.filter(
                (item) => !flatCheckedItems.some((i) => i.id === item.id)
              ),
        }),
        () => {
          console.log('Checked items: ', this.state.checkedItems);
        }
      );
    };

    // Helper functions
    const isChecked = (dataItem) =>
      this.state.checkedItems.some((item) => item.id === dataItem.id);
    const areAllDescendantsChecked = (dataItem) =>
      dataItem.children
        ? dataItem.children.every((child) => areAllDescendantsChecked(child))
        : isChecked(dataItem);
    const areSomeDescendantsChecked = (dataItem) =>
      dataItem.children
        ? dataItem.children.some((child) => areSomeDescendantsChecked(child))
        : isChecked(dataItem);

    this.flattenTree = (tree) => {
      var result = [];
      tree.forEach((item) => {
        result.push(item);
        if (item.children) {
          result = result.concat(this.flattenTree(item.children));
        }
      });
      return result;
    };

    this.mapTree = (item) => {
      const hasCheck = areAllDescendantsChecked(item);
      // Reset checked properties to be updated
      item.checkProps.checked = false;

      if (hasCheck) {
        item.checkProps.checked = true;
      } else {
        const hasPartialCheck = areSomeDescendantsChecked(item);
        if (hasPartialCheck) {
          item.checkProps.checked = null;
        }
      }

      if (item.children) {
        return {
          ...item,
          children: item.children.map((child) => this.mapTree(child)),
        };
      }
      return item;
    };

    this.filterItems = (item, checkedItem) => {
      if (item.id === checkedItem.id) {
        return true;
      }

      if (item.children) {
        return (
          (item.children = item.children
            .map((opt) => Object.assign({}, opt))
            .filter((child) => this.filterItems(child, checkedItem))).length > 0
        );
      }
    };
  }

  render() {
    const mapped = this.options.map((item) => this.mapTree(item));
    return (
      <TreeView
        data={mapped}
        onCheck={this.onCheck}
        onSelect={(e, item, parentItem) => {
          console.log(e);
        }}
        defaultAllExpanded
        hasCheck
        hasGuides
      />
    );
  }
}
