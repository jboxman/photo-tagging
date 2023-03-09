import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TreeView } from '@patternfly/react-core';

const TagTreeView = () => {
  const [data, setData] = useState(null);
  const [activeItems, setActiveItems] = useState([]);

  useEffect(function () {
    (async () => {
      // https://dev.to/thatamymac/dynamic-imports-of-json-ipl
      const data = await import('../../fixtures/tag-tree.json').then(
        (module) => module.default
      );
      setData(data);
    })();
  }, []);

  return (
    <>
      {!data ? null : (
        <TreeView
          data={data}
          defaultAllExpanded
          hasGuides
          hasSelectableNodes
          activeItems={activeItems}
          onSelect={(e, item, parentItem) => {
            if (activeItems.includes(item)) setActiveItems([]);
            if (!activeItems.includes(item)) setActiveItems([item]);
          }}
          className="smaller"
        />
      )}
    </>
  );
};
export default TagTreeView;
