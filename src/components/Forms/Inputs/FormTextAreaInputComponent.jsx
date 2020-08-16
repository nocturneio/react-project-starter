import React, {Component} from 'react';
import FormUtils from "../../../utils/FormUtils";

export default class FormTextAreaInputComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control">
          <textarea name={this.props.element} className={FormUtils.ifError(this.props.errors[this.props.element] && this.props.touched[this.props.element], "textarea input_form_custom")} placeholder={this.props.placeholder} rows={this.props.rows}  onChange={(text) => this.props.handleChange(text)} onBlur={(text) => this.props.handleBlur(text)} defaultValue={this.props.values[this.props.element]}></textarea>
        </div>
        {this.props.errors[this.props.element] && this.props.touched[this.props.element] && <p className="help is-danger">{this.props.errors[this.props.element]}</p>}
      </div>
    )
  }
}
