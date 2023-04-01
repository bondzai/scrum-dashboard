import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";

function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("https://script.google.com/macros/s/AKfycbxXkIYhmC4EpXON-wpmfKyOGtSeJyFdqiu4RrYJb7GYdF_DxZzxEyVWmbIwB0sSPFJa/exec?action=readData")
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    }, []);

    const rows = useMemo(() => {
        return data.map((item, index) => (
            <tr key={index}>
                <td>{moment(item.date).format("MMM Do YY")}</td>
                <td>{item.platform}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>{item.dev}</td>
                <td>{item.remark}</td>
            </tr>
        ));
    }, [data]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>PLATFORM</th>
                        <th>DESCRIPTION</th>
                        <th>STATUS</th>
                        <th>DEV</th>
                        <th>REMARK</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default Table;
