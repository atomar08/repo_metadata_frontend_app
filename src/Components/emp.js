import React from 'react';

const emp = (props) => {
    return (
        <tr key={emp.id} >

            <td><center>{emp.id}</center></td>
            <td><center>{emp.name}</center></td>
            <td>{emp.age}</td>
            <td>{emp.email}</td>
        </tr>
    )
};

export default emp;
