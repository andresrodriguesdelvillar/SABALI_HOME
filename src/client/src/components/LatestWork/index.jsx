import React, { Component } from "react";

import "./style.scss";

class LatestWork extends Component {
  state = {
    projects: [],
    active: 0
  };

  componentWillMount() {
    let dummyProjects = [];

    for (let i = 0; i < 10; i++) {
      const dummyProject = {
        name: "dummy",
        description: "this is the projects description",
        image_url: "",
        id: i
      };
      dummyProjects.push(dummyProject);
    }
    this.setState({
      projects: dummyProjects
    });
  }

  render() {
    console.log(this.state);

    return (
      <div className="latestWorkContainer">
        <div id="mainBody">
          <div className="image_container" style={{ height: "80%" }}>
            {this.state.projects.map(project => {
              return (
                <img
                  key={project.id}
                  src={bigScreen}
                  alt=""
                  className="project_image"
                />
              );
            })}
          </div>
        </div>
        <div id="projectLine">Projects</div>
      </div>
    );
  }
}

export default LatestWork;
