import React, { Component } from "react";
//import Form from './Components/Form';



class Table extends Component {
  constructor () {
    super()
    this.state = {
     students: [

        ]

    }
}

    render () {
      return (
        <form id="table">

         <div>
          <table   id='students' style={{width:'900px' ,color:'blue'}} >
             <thead>
                 <tr>

                 <th >#</th>
                 <th>Nombres</th>
                 <th scope="col">Apellidos</th>
                 <th scope="col">Grado</th>
                 </tr>
              </thead>

                <tbody>
                {

                 this.state.students.map((emp)=>
                     <tr key = {emp.id} >

                    <td><center>{emp.id}</center></td>
                    <td><center>{emp.name}</center></td>
                    <td>{emp.age}</td>
                    <td>{emp.email}</td>

              </tr>
          )}

                </tbody>
             </table>

             </div>

        </form>
    )
}
 }


export default Table;
