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
        selectedStartDate: new Date('2019-02-18T21:11:54'),
        selectedEndDate: new Date('2019-02-23T21:11:54'),
        dates: []

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
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaGl2MzM1OCIsImp0aSI6ImY0YjYzZjVlLTVlMWEtNGEzNC1iNWZmLTllODQwYWM0NGQ0NSIsImlhdCI6MTU1MjI3Njc1NiwibmJmIjoxNTUyMjc2NzU2LCJleHAiOjE1NTIyODM5NTYsImlzcyI6Imh0dHA6Ly9hcGkubWFzdGJpdC5jb206MzYxMTUiLCJhdWQiOiJodHRwOi8vd3d3Lm1hc3RiaXQuY29tIn0.7_fgCJyGTfHwJApMgUWKJJ605q55Y8l5ro51a2w2tTQ'
                }
            })
            .then(response => {
                this.setState({dates: response.data.value})
            })
            .catch((error) => {
                console.log(error.response)
            })
    }


    handleOnClick = () => {

        let dateStart = new Date(this.state.selectedStartDate);
        let dateEnd = new Date(this.state.selectedEndDate);

        let getDateArray = (start, end) => {
            let arr = new Array();
            let dt = new Date(start);
            while (dt <= end) {
                arr.push({createdAt: new Date(dt).toDateString()});
                dt.setDate(dt.getDate() + 1);
            }

            return arr;


        }
        let dateArr = getDateArray(dateStart, dateEnd);
        console.log(dateArr);

        this.setState({dates: dateArr})



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
                <Paper >
                    <Table >
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
