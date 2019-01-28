import React, { Component } from "react";

class latestWorkAdminForm extends Component {
  state = {
    name: false,
    image: {
      path: false,
      size: false,
      type: false
    }
  };

  onFileChange = e => {
    e.preventDefault();
    console.log(e.target.files);
    const reader = new FileReader();

    reader.onload = () => {
      var result = reader.result;
    };
    console.log(result);
    reader.readAsDataURL(e.target.files[0]);
    const tmppath = URL.createObjectURL(e.target.files[0]);
    const Path = tmppath.split(/:(.+)/)[1];

    console.log(Path);
    this.setState({
      image: {
        path: Path,
        data: result,
        size: e.target.files[0].size,
        type: e.target.files[0].type
      }
    });
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
    console.log(e.target.value);
  };

  onSubmitLatestWork = () => {
    const params = this.state;
    console.log(params);
  };

  render() {
    return (
      <div className="latestWorkAdminForm">
        <form noValidate>
          <div className="form-group">
            <label htmlFor="project_name">Project</label>
            <input
              type="text"
              className="form-control"
              placeholder="Project Name"
              name="project_name"
              onChange={this.onChange}
            />
            <small className="form-text text-muted">
              Please enter the Name of the Project the picture belongs to
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="picture">Thumbnail</label>
            <input
              onChange={this.onFileChange}
              type="file"
              name="picture"
              className="form-control"
            />
            <small className="form-text text-muted">
              Please upload a picture to be the new Thumbnail on the Homepage
            </small>
          </div>
          <button
            type="button"
            onClick={this.onSubmitLatestWork}
            className="btn btn-primary"
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default latestWorkAdminForm;
