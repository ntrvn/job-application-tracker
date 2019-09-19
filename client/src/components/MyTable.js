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
        el['date'] = new Date(el['date']);
      });
      this.setState({ data: data });
    })
  }

  addJob = (newData) => {
    this.setState({data: [...this.state.data, newData]});
    axios.post(`${baseURL}/api/add_job`, newData, {
      headers: {
        "Content-Type" : "application/json"
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  editJob = (oldJob, newJob) => {
    const data = [...this.state.data];
    data[data.indexOf(oldJob)] = newJob;
    this.setState({ ...this.state, data });
    console.log(this.state.data);
    axios.post(`${baseURL}/api/update_job`, {
      "oldJob": oldJob,
      "newJob": newJob
    }, {
      headers: {
        "CoContent-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteJob = (job) => {
    const data = [...this.state.data];
    data.splice(data.indexOf(job), 1);
    this.setState({...this.state, data});
    axios.post(`${baseURL}/api/delete_job`, job, {
      headers: {
        "CoContent-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
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
                this.addJob(newData)
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                this.editJob(oldData, newData);
                resolve();
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                this.deleteJob(oldData);
                resolve();
              }, 600);
            }),
        }}
      />
    );
  }
}

export default MyTable;