import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import style from './MainDisplay.module.css'

import { filterByLastWeek, filterByLastMonth, filterByLastYear } from './helper';



const MainDisplay = () => {
    const [countryData, setCountryData] = useState([]);
    const [pastData, setPastData] = useState([]);
    const [pastDataSelected, setPastDataSelected] = useState(false);

    const [customDate, setCustomDate] = useState({
        "fromDate": "",
        "toDate": ""
    });




    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const { data } = await axios(`https://filterpage.herokuapp.com/`);
        setCountryData([...data["england-and-wales"].events, ...data["northern-ireland"].events, ...data["scotland"].events]);

    };

    const getDate = (e) => {
        const name = e.target.name;

        setCustomDate(prevDate => {
            return {
                ...prevDate,
                [name]: e.target.value
            }
        })


    }
    const getCustomRangeData = (e) => {
        e.preventDefault();
        if (customDate.fromDate !== '' && customDate.toDate !== '') {
            console.log(customDate)
            setPastDataSelected(true);
            const { fromDate, toDate } = customDate;
            setPastData(() => {
                return countryData.filter(country => {
                    return new Date(country.date.split("-").join(",")) > new Date(fromDate) && new Date(new Date(country.date.split("-").join(","))) < new Date(toDate);
                })
            });

        }
        setCustomDate({
            "fromDate": "",
            "toDate": ""
        })
    }

    const selectionHandler = (e) => {



        if (e.target.value === 'All') {
            getData();
            setPastDataSelected(false);
        }

        if (e.target.value === 'Last Week') {
            setPastDataSelected(true);
            const [startWeekDate, endWeekDate] = filterByLastWeek();
            setPastData(() => {
                return countryData.filter(country => {
                    return new Date(country.date.split("-").join(",")) > new Date(startWeekDate) && new Date(new Date(country.date.split("-").join(","))) < new Date(endWeekDate);
                })
            });

        }

        if (e.target.value === 'Last Year') {
            setPastDataSelected(true);
            const [startYearDate, endYearDate] = filterByLastYear();
            setPastData(() => {
                return countryData.filter(country => {

                    return new Date(country.date.split("-").join(",")) > new Date(startYearDate) && new Date(new Date(country.date.split("-").join(","))) < new Date(endYearDate);
                })
            });


        }

        if (e.target.value === 'Last Month') {
            setPastDataSelected(true);
            const [startMonthDate, endMonthDate] = filterByLastMonth();
            setPastData(() => {
                return countryData.filter(country => {
                    return new Date(country.date.split("-").join(",")) > new Date(startMonthDate) && new Date(new Date(country.date.split("-").join(","))) < new Date(endMonthDate);
                })
            });

        }

    }

    return <div>
        <div className={style["date-range-picker-container"]}>
            <label htmlFor="pick-dates">Pick Dates</label>
            <select onChange={selectionHandler}>
                <option value="All">All</option>
                <option >Yesterday</option>
                <option >Last Week</option>
                <option >Last Month</option>
                <option >Last Year</option>
            </select>

            <form className={style["date-range-picker-container"]} onSubmit={getCustomRangeData}>
                <div>
                    <label>From Date</label>
                    <input name="fromDate" value={customDate.fromDate} onChange={getDate} type="date"></input>
                </div>
                <div>
                    <label>To Date</label>
                    <input name="toDate" value={customDate.toDate} onChange={getDate} type="date"></input>
                </div>
                <button>Get Data</button>
            </form>


        </div>
        <ul className={style.list}>
            {!pastDataSelected && countryData && countryData.length > 0 && countryData.map(country =>
                <div key={uuid()} className={style["list-container"]}>
                    <li  >
                        <p style={{ color: "#DA1212" }}>{country.title}</p>
                        <p style={{ color: "#06FF00" }}>{country.date}</p>
                        <p>{country.notes}</p>

                    </li>
                </div>)}
            {pastDataSelected && pastData && pastData.length > 0 && pastData.map(country =>
                <div key={uuid()} className={style["list-container"]}>
                    <li  >
                        <p style={{ color: "#DA1212" }}>{country.title}</p>
                        <p style={{ color: "#06FF00" }}>{country.date}</p>
                        <p>{country.notes}</p>
                        <p>{country.bunting}</p>
                    </li>
                </div>)}




        </ul>
    </div>;


}

export default MainDisplay;