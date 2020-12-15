import React, {Component} from 'react';

import alarmClock from '../../img/alarm.png';

import './alarmclock.scss';

class AlarmClock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: '',
            time: '',
            alarmTime: ''
        };
    }

    componentDidMount(){
        this.clock = setInterval(
            () => this.setCurrentTime(),
            1000
        )
        this.interval = setInterval(
            () => this.checkAlarmClock(),
            1000)
    }

    componentWillUnmount(){
        clearInterval(this.clock);
        clearInterval(this.interval);
    }

    setCurrentTime(){
        this.setState({
            time: new Date().getTime(),
            currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
        });
    }

    setAlarmTime = (event) => {
        event.preventDefault();

        let newTime = this.state.time + (event.target.value*1000);

        if (event.target.value > 120) {
            newTime = this.state.time + (120*1000)
        }
        else if(event.target.value < 1) {
            newTime = ''
        }
        const newTimeSec = new Date(newTime).toLocaleTimeString('en-US', { hour12: false });

        this.setState({
            alarmTime: newTimeSec
        })
    }

    checkAlarmClock(){

        if(this.state.alarmTime === 'undefined' || !this.state.alarmTime) {
            this.alarmMessage = "Введите время";
        }

        else if(this.state.alarmTime === 'Invalid Date') {
            this.alarmMessage = "Вы указали неверное время";
        }

        else {
            this.alarmMessage = "Ваш будильник установлен на " + this.state.alarmTime;
            if(this.state.currentTime === this.state.alarmTime) {
                alert("Дзынь дзынь");
            }
        }
    }

    render() {
        return (
            <div className="alarmclock">
                <h1>Будильник</h1>

                <img src={alarmClock} alt=""/>

                <h2>{this.state.currentTime}</h2>

                <h2>{this.alarmMessage}</h2>

                <form>
                    <input type="number" onChange={this.setAlarmTime} min='1' max='120'/>
                </form>
            </div>
        );
    }
};

export default AlarmClock;
