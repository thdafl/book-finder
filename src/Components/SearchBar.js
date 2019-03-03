import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import DirectionsIcon from "@material-ui/icons/ChevronRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onSubmit(this.state.value);
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { classes, loading } = this.props;
    const { value } = this.state;

    const ready = (
      <form
        onSubmit={this.onFormSubmit}
        style={{
          width: "30%",
          height: "50px"
        }}
      >
        <Paper
          elevation={1}
          style={{
            padding: "2px 4px",
            display: "flex",
            height: "50px",
            flexDirection: "row"
          }}
        >
          <Input
            classes={{
              input: classes.input
            }}
            fullWidth={true}
            type="text"
            value={value}
            onChange={this.onChange}
          />
          <Divider style={styles.divider} />
          <IconButton
            type="submit"
            style={{}}
            color="primary"
            aria-label="Directions"
          >
            <DirectionsIcon />
          </IconButton>
        </Paper>
      </form>
    );

    const loadIndicator = (
      <Paper elevation={1} classes={{ root: classes.load }}>
        <div>
          <CircularProgress color="secondary" />
        </div>
      </Paper>
    );

    return loading ? loadIndicator : ready;
  }
}

const styles = {
  input: {
    flex: 1,
    textAlign: "center"
  },
  divider: {
    width: 1,
    height: "100%"
  },
  load: {
    padding: "2px 4px",
    display: "flex",
    width: "30%",
    height: "50px",
    alignItems: "center",
    justifyContent: "center"
  }
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchBar);
