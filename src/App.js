import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import './App.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class App extends Component {
    state = {
        selectedStartDate: new Date('2019-02-10T21:11:54'),
        selectedEndDate: new Date('2019-02-13T21:11:54'),
        dates: [],
        dateConst: []

    };


    handleStartDateChange = date => {
        this.setState({selectedStartDate: date});
    };
    handleEndDateChange = date => {
        this.setState({selectedEndDate: date});
    };

    componentDidMount() {

        axios.get('http://devapi.mastbit.com/api/User/GetAllTransactions',
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaGl2MzM1OCIsImp0aSI6IjU3OTQzOGJhLTljNzItNDM3NC1iMmQwLWIyYWFmNzRmYjI0NyIsImlhdCI6MTU1MjI5MjgxMiwibmJmIjoxNTUyMjkyODEyLCJleHAiOjE1NTIzMDAwMTIsImlzcyI6Imh0dHA6Ly9hcGkubWFzdGJpdC5jb206MzYxMTUiLCJhdWQiOiJodHRwOi8vd3d3Lm1hc3RiaXQuY29tIn0.I8bVvq6NOpHbW-aZ46b_Tpj2Yq54ydW51gu8NBOe4xQ'
                }
            })
            .then(response => {
                this.setState({dates: response.data.value})
                this.setState({dateConst: response.data.value})

            })
            .catch((error) => {
                console.log(error.response)
            })
    }


    handleOnClick = () => {


        let dateStart = new Date(this.state.selectedStartDate).setHours(0, 0, 0, 0);
        let dateEnd = new Date(this.state.selectedEndDate).setHours(0, 0, 0, 0);

        let tempData = []

        for (let i = 0; i < this.state.dateConst.length; i++) {
            // console.log(new Date(this.state.dateConst[i].createdAt).setHours(0, 0, 0, 0))
            //console.log('start date', dateStart)
            if (new Date(this.state.dateConst[i].createdAt).setHours(0, 0, 0, 0) >= dateStart && new Date(this.state.dateConst[i].createdAt).setHours(0, 0, 0, 0) <= dateEnd) {
                tempData.push(this.state.dateConst[i])

            }
        }
        console.log(tempData)
        this.setState({dates: tempData})


    }


    render() {


        const {selectedStartDate} = this.state;
        const {selectedEndDate} = this.state;
        return (
            <Fragment>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <div>
                            <DatePicker
                                margin="normal"
                                label="Start Date"
                                value={selectedStartDate}
                                onChange={this.handleStartDateChange}
                            />
                        </div>
                        <div>
                            <DatePicker
                                margin="normal"
                                label="End Date"
                                value={selectedEndDate}
                                onChange={this.handleEndDateChange}
                            />
                        </div>
                        <div>
                            <input type='submit' className='btn btn-primary' onClick={this.handleOnClick}/>
                        </div>

                    </MuiPickersUtilsProvider>


                </div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.state.dates.map(date =>
                                <TableRow>
                                    <TableCell>
                                        <Moment format="DD/MM/YYYY">
                                            {date.createdAt}
                                        </Moment>
                                    </TableCell>
                                </TableRow>
                            )}


                        </TableBody>
                    </Table>
                </Paper>

                <div>


                </div>

            </Fragment>
        );
    }
}

export default App;
