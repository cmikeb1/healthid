import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import React from "react";

function TabContainer({children, dir}) {
  return (
      <React.Fragment>
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
          {children}
        </Typography>
      </React.Fragment>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

export default TabContainer;