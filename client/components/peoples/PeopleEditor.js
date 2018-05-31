import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import Header from '../Header';

import { Peoples } from '../../../imports/collections/peoples';

class PeopleEditor extends Component {
  constructor(props) {
    super(props);

    const { people } = this.props;

    this.state = { people };
  }
  handleSubmit(e) {
    e.preventDefault();
    const { people } = this.state;
    this.props.meteorCall('peoples.update', people, (err, res) => {
      if (!err) {
        this.props.history.push("/");
      }
    });
  }
  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/");
  }
  handleFullNameChange(e) {
    const fullName = e.target.value;
    this.setState({
      people: { ...this.state.people, fullName }
    });
  }
  handleNoChange(e) {
    const no = e.target.value;
    this.setState({
      people: { ...this.state.people, no }
    });
  }
  handleAddressNoChange(e) {
    const addressNo = e.target.value;
    this.setState({
      people: { ...this.state.people, addressNo }
    });
  }
  handleAddressBanChange(e) {
    const addressBan = e.target.value;
    this.setState({
      people: { ...this.state.people, addressBan }
    });
  }
  handleAddressMooChange(e) {
    const addressMoo = e.target.value;
    this.setState({
      people: { ...this.state.people, addressMoo }
    });
  }
  handleAddressTambonChange(e) {
    const addressTambon = e.target.value;
    this.setState({
      people: { ...this.state.people, addressTambon }
    });
  }
  handleAddressAmphoeChange(e) {
    const addressAmphoe = e.target.value;
    this.setState({
      people: { ...this.state.people, addressAmphoe }
    });
  }
  handleAddressProvince(e) {
    const addressProvince = e.target.value;
    this.setState({
      people: { ...this.state.people, addressProvince }
    });
  }
  handleZipcodeChange(e) {
    const zipcode = e.target.value;
    this.setState({
      people: { ...this.state.people, zipcode }
    });
  }
  handlePhoneNumberChange(e) {
    const phoneNumber = e.target.value;
    this.setState({
      people: { ...this.state.people, phoneNumber }
    });
  }
  handleAmountChange(e) {
    const amount = e.target.value;
    this.setState({
      people: { ...this.state.people, amount }
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h2>ข้อมูลสมาชิก</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <div className="form-group">
                <button type="button" className="btn"
                  onClick={this.handleCancel.bind(this)}>ย้อนกลับ</button>
              </div>
              {/* <button type="button" className="btn btn-primary" style={{marginRight: 2}}>
                พิมพ์ใบสมัคร(กำลังทำ...)
              </button> */}
              {/* <button type="button" className="btn btn-primary" style={{marginRight: 2}}>
                พิมพ์ใบสัญญากู้(กำลังทำ...)
              </button> */}
            </div>
            <div className="form-group">
              <label>ลำดับที่ :</label>
              <input type="text" className="form-control" ref="no"
                value={this.state.people.no}
                onChange={this.handleNoChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label>ชื่อ - นามสกุล :</label>
              <input type="text" className="form-control" ref="fullName"
                value={this.state.people.fullName}
                onChange={this.handleFullNameChange.bind(this)} />
            </div>

            <div className="form-group">
              <label>บ้านเลขที่ :</label>
              <input type="text" className="form-control"
                value={this.state.people.addressNo}
                onChange={this.handleAddressNoChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>บ้าน :</label>
              <input type="text" className="form-control"
                value={this.state.people.addressBan}
                onChange={this.handleAddressBanChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>หมู่ :</label>
              <input type="text" className="form-control"
                value={this.state.people.addressMoo}
                onChange={this.handleAddressMooChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>ตำบล :</label>
              <input type="text" className="form-control"
                value={this.state.people.addressTambon}
                onChange={this.handleAddressTambonChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>อำเภอ :</label>
              <input type="text" className="form-control"
                value={this.state.people.addressAmphoe}
                onChange={this.handleAddressAmphoeChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>จังหวัด :</label>
              <input type="text" className="form-control"
                value={this.state.people.addressProvince}
                onChange={this.handleAddressProvince.bind(this)} />
            </div>
            <div className="form-group">
              <label>รหัสไปรษณีย์ :</label>
              <input type="text" className="form-control"
                value={this.state.people.zipcode}
                onChange={this.handleZipcodeChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>หมายเลขโทรศัพท์ :</label>
              <input type="text" className="form-control"
                value={this.state.people.phoneNumber}
                onChange={this.handlePhoneNumberChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>วงเงินกู้ :</label>
              <input type="number" className="form-control"
                value={this.state.people.amount}
                onChange={this.handleAmountChange.bind(this)} />
            </div>
            <div className="form-group">
              <label>สำเนาเพื่อมอบให้ผู้กู้ ผู้ค้ำ ธนาคาร จำนวน(ฉบับ):</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>ฌาปณกิจสงเคราะห์ของผู้กู้ :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>ตำบล :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>อำเภอ :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>จังหวัด :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>ผู้แทนกองทุนฯ :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>ผู้แทนกองทุนฯ :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>คู่สมรส :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>ผู้ค้ำ :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>ผู้ค้ำ :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>พยาน :</label>
              <input type="text" className="form-control"
                 />
            </div>
            <div className="form-group">
              <label>พยาน :</label>
              <input type="text" className="form-control"
                 />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">บันทึก</button>
            </div>
          </form>
        </div>

      </div>
    );
  }
};

PeopleEditor.propTypes = {
  people: PropTypes.object,
  meteorCall: PropTypes.func
}

export default withTracker((props) => {
  Meteor.subscribe('peoples');

  const _id = props.match.params._id;
  const people = Peoples.findOne(_id);

  return {
    people,
    meteorCall: Meteor.call
  }
})(PeopleEditor);
