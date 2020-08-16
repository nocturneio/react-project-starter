import React, {Component} from 'react';

export default class FormButtonsInputComponent extends Component {

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
      <div className={"mt-10"}>
        <div className="field has-addons pt-10">
          <div className="control has-icons-left is-expanded">
            <input name={this.props.element} type="hidden" onChange={(text) => this.props.handleChange(text)} onBlur={(text) => this.props.handleBlur(text)} value={this.state.value}/>
          </div>
        </div>
        <div className="">
          <div className="is-flex is-fullwidth disable-dbl-tap-zoom" style={{flexDirection: 'row'}}>
            <a className={"button has-text-weight-bold disable-dbl-tap-zoom " + (this.state.value === 0 ? "is-primary" : "is-light")} style={{width: '50%'}} onClick={async () => {
                await this.setState({value: 0});
                this.props.handleChange(this.state.value);
            }}>{this.props.firstButton}</a>
            <a className={"button has-text-weight-bold disable-dbl-tap-zoom " + (this.state.value === 1 ? "is-primary" : "is-light")} style={{alignSelf: 'flex-end', width: '50%'}} onClick={async () => {
                await this.setState({value: 1});
                this.props.handleChange(this.state.value);
            }}>{this.props.secondButton}</a>
          </div>
        </div>
        {this.props.errors[this.props.element] && this.props.touched[this.props.element] &&
        <p className="help is-danger">{this.props.errors[this.props.element]}</p>}
      </div>
    )
  }
}
