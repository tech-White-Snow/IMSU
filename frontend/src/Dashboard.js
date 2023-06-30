import React, { Component, useEffect } from 'react';

import { withRouter } from './utils';
import DataTable from './component/DataTable';
const axios = require('axios');

function Dashboard() {


  // useEffect() => {
  //   let token = localStorage.getItem('token');
  //   if (!token) {
  //     // this.props.history.push('/login');
  //     this.props.navigate("/login");
  //   } else {
  //     this.setState({ token: token }, () => {
  //       this.getProduct();
  //     });
  //   }
  // }

  return(
    <div>
      <DataTable />
    </div>
  )
  // getProduct = () => {
    
  //   this.setState({ loading: true });

  //   let data = '?';
  //   data = `${data}page=${this.state.page}`;
  //   if (this.state.search) {
  //     data = `${data}&search=${this.state.search}`;
  //   }
  //   axios.get(`http://localhost:2000/get-product${data}`, {
  //     headers: {
  //       'token': this.state.token
  //     }
  //   }).then((res) => {
  //     this.setState({ loading: false, products: res.data.products, pages: res.data.pages });
  //   }).catch((err) => {
  //     swal({
  //       text: err.response.data.errorMessage,
  //       icon: "error",
  //       type: "error"
  //     });
  //     this.setState({ loading: false, products: [], pages: 0 },()=>{});
  //   });
  // }

  // deleteProduct = (id) => {
  //   axios.post('http://localhost:2000/delete-product', {
  //     id: id
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'token': this.state.token
  //     }
  //   }).then((res) => {

  //     swal({
  //       text: res.data.title,
  //       icon: "success",
  //       type: "success"
  //     });

  //     this.setState({ page: 1 }, () => {
  //       this.pageChange(null, 1);
  //     });
  //   }).catch((err) => {
  //     swal({
  //       text: err.response.data.errorMessage,
  //       icon: "error",
  //       type: "error"
  //     });
  //   });
  // }

  // pageChange = (e, page) => {
  //   this.setState({ page: page }, () => {
  //     this.getProduct();
  //   });
  // }

  // logOut = () => {
  //   localStorage.setItem('token', null);
  //   // this.props.history.push('/');
  //   this.props.navigate("/");
  // }

  // onChange = (e) => {
  //   if (e.target.files && e.target.files[0] && e.target.files[0].name) {
  //     this.setState({ fileName: e.target.files[0].name }, () => { });
  //   }
  //   this.setState({ [e.target.name]: e.target.value }, () => { });
  //   if (e.target.name == 'search') {
  //     this.setState({ page: 1 }, () => {
  //       this.getProduct();
  //     });
  //   }
  // };


}

export default withRouter(Dashboard);
