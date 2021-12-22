import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./template.css";

const propTypes = {
  nodeData: PropTypes.object.isRequired
};

const Template = ({ nodeData }) => {

  // const selectNode = () => {
  //   this.history.push("/auth/profile")
  // };
  // <div className="orgchart-item" onClick={selectNode} >
  
  return (
    
    <div className="orgchart-item">
      <Link to={`/auth/unit-positions/${nodeData.personalCode}`}>
        <div className="position-orgchart">
          {nodeData.title}
        </div>
        <div className="fullname-orgchart">
          {nodeData.name}
        </div>
      </Link>
    </div>
  );
};

Template.propTypes = propTypes;

export default Template;
