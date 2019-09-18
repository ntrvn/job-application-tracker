import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

const columns = [
  { title: 'Company', field: 'name' },
  { title: 'Status', field: 'status' },
  { title: 'Date', field: 'date', type:"date"}
]

const baseURL = 'http://localhost:8000';

class MyTable extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    axios.get(`${baseURL}/api/jobs`).then(res => {
      var data = res.data;
      data.forEach(el => {
        delete el['_id'];
      });
      this.setState({data: data});
    })
  }

  render() {
    return (
      <MaterialTable
        title="My Job Search"
        columns={columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 600);
            }),
        }}
      />
    );
  }
}

export default MyTable;