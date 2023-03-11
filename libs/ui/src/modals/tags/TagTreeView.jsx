import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TreeView } from '@patternfly/react-core';

const TagTreeView = ({ data, activeItems = [], onSelect }) => {
  //const [activeItems, setActiveItems] = useState([]);

  return (
    <>
      {!data ? null : (
        <TreeView
          data={data}
          defaultAllExpanded
          hasGuides
          hasSelectableNodes
          activeItems={activeItems}
          onSelect={onSelect}
          className="smaller"
        />
      )}
    </>
  );
};
export default TagTreeView;
