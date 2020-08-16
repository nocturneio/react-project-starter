import React, {Component} from 'react';
import '../../../styles/plugins/slider.css';

export default class FormRangeInputComponent extends Component {

  state = {
    value: 0
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({value: this.props.values[this.props.element] !== undefined ? this.props.values[this.props.element] : this.props.min});
  }

  render() {
    return (
      <div className={"mt-10 " + (this.props.marginBottom ? "" : "mb-40")}>
        <label className="label">{this.props.label} <span className="tag"
                                                          style={{float: 'right'}}>{this.state.value} {this.props.isMore && this.props.max == this.state.value ? "+" : ""}</span></label>
        <div className="field has-addons pt-10">
          <div className="control has-icons-left is-expanded">
            <input name={this.props.element} type="hidden" onChange={(text) => this.props.handleChange(text)} onBlur={(text) => this.props.handleBlur(text)} value={this.state.value}/>
          </div>
        </div>
        <div className="">
          <div className="is-flex is-fullwidth" style={{flexDirection: 'row'}}>
            <a className="button is-light has-text-weight-bold" style={{width: '50%'}} onClick={async () => {
              if (this.state.value > this.props.min) {
                await this.setState({value: this.state.value - 1});
                this.props.handleChange(this.state.value);
                console.log(this.state.value);
              }
            }}>-</a>
            <a className="button is-primary has-text-weight-bold" style={{alignSelf: 'flex-end', width: '50%'}} onClick={async () => {
              if (this.state.value < this.props.max) {
                await this.setState({value: this.state.value + 1});
                this.props.handleChange(this.state.value);
                console.log(this.state.value);
              }
            }}>+</a>
          </div>
        </div>
        {this.props.errors[this.props.element] && this.props.touched[this.props.element] &&
        <p className="help is-danger">{this.props.errors[this.props.element]}</p>}
      </div>
    )
  }
}
