import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TreeView } from '@patternfly/react-core';

import { denormalize } from '../../../store/helpers';

const TagTreeView = ({ data, activeItems = [], onSelect }) => {
  //const [activeItems, setActiveItems] = useState([]);

  const tree = denormalize(data || {});

  return (
    <>
      {!data ? null : (
        <TreeView
          data={tree}
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
