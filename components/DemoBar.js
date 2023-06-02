import React from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
// import { post } from "./requests";

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props.variables)
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    this.submit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    ElementStore.subscribe((state) => this.onChange(state.data));
  }

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  onChange = (data) => {
    this.setState({
      data,
    });
  };

  onSubmit(data) {
    // console.log(data);
    // console.log(JSON.stringify(data))
    // console.log(this.props);

    const { postUrl } = this.props;
    // console.log("onSubmit", data);
    // Place code to post json data to server here
    // post(postUrl, data).then(() => {
    //   // window.location.href = "/form";
    // });
    return false;
  }

  // onSubmit(data) {
  //   const { postUrl, onPost } = this.props;
  //   onPost(data); // calls the onPost function and passes the form data as an argument
  //   post(postUrl, data).then(() => {
  //     // window.location.href = "/form";
  //   });
  //   return false;
  // }


  render() {
    let modalClass = "modal";
    if (this.state.previewVisible) {
      modalClass += " show d-block";
    }

    let shortModalClass = "modal short-modal";
    if (this.state.shortPreviewVisible) {
      shortModalClass += " show d-block";
    }

    let roModalClass = "modal ro-modal";
    if (this.state.roPreviewVisible) {
      roModalClass += " show d-block";
    }
    // console.log(this.state.data);

    return (
      <div className="row" style={{ margin: "10px" }}>
        <div className="col-lg-6 preview-title">
          <h4 className="">Generate Form Template</h4>
          <p>
            Choose and drag and drop the form elements from toolbox to create a
            form
          </p>
        </div>
        <div className="col-lg-6">
          <button
            className="btn btn-primary float-right"
            style={{ marginRight: "10px" }}
            onClick={this.showPreview.bind(this)}
          >
            Preview Form
          </button>
        </div>

        {/* <button
          className="btn btn-default float-right"
          style={{ marginRight: "10px" }}
          onClick={this.showShortPreview.bind(this)}
        >
          Alternate/Short Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: "10px" }}
          onClick={this.showRoPreview.bind(this)}
        >
          Read Only Form
        </button> */}

        {this.state.previewVisible && (
          <div className={modalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <ReactFormGenerator
                    download_path=""
                    // back_action="/"
                    // back_name="Back"
                    answer_data={{
                      "text_input_D1E26757-25B0-4BD5-8DB0-39B512EA9C96":"Kirana Store","text_input_3FEAD0BB-2F04-420E-B468-C846193E1D44":"Ravi",
                    }}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    onSubmit={this.submit}
                    variables={this.props.variables}
                    data={this.state.data}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.roPreviewVisible && (
          <div className={roModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <ReactFormGenerator
                    download_path=""
                    // back_action="/"
                    // back_name="Back"
                    answer_data={{}}
                    // action_name="Save"
                    // form_action="/"
                    // form_method="POST"
                    read_only={true}
                    variables={this.props.variables}
                    hide_actions={true}
                    data={this.state.data}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.shortPreviewVisible && (
          <div className={shortModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <ReactFormGenerator
                    download_path=""
                    back_action=""
                    answer_data={{}}
                    form_action="/"
                    form_method="POST"
                    data={this.state.data}
                    display_short={true}
                    variables={this.props.variables}
                    hide_actions={false}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

