// import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

// function Display(props){
//   const ObjItem = props.object.map((item) =>(
//     <div className='block' key={item.id}>
//       <h2>{item.title}</h2>
//       <p>{item.Description}</p>
//       <hr/>
//       <p className='date'>{item.date}</p>
//     </div>
//   ));
//   return (
//     <div className='row'>
//       {ObjItem}
//     </div>
//   );
// }

class App extends Component {

  constructor(props){
    super(props);
    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleArrowBtn = this.handleArrowBtn.bind(this);
    this.CreateTable = this.CreateTable.bind(this);
    this.FormSubmit = this.FormSubmit.bind(this);
    this.state = {
      // name : '',
      // NameeErr : '',
      // time: 60,
      // istoggleOn : false,
      counter : 0,
      firstName : '',
      lastName : '',
      age : null,
      description: '',
      DataArr:[],
      edit : true,
      ShowTable : false,
      Submit_btn : true
    }
  }
  handleChange(ev){
    let name = ev.target.name;
    let value = ev.target.value;

    this.setState({
      [name] : value
    })
    // console.log(this.state.firstName+' '+this.state.firstName + ' ' + this.state.description + ' '+ this.state.age);
  }

  handleArrowBtn(ev){
    let keyCode =ev.keyCode;
    if (keyCode === 40) { //Down Key Code
      this.setState({
        counter: this.state.counter - 1,
      })
    }else if(keyCode === 38){ //Up Key Code
      this.setState({
        counter: this.state.counter + 1,
      })
    }
  }

  FormSubmit(e){
    e.preventDefault();
    let DataArr1 = this.state.DataArr;
    DataArr1.push(
      {
        FName : this.state.firstName,
        LName : this.state.lastName,
        Desc: this.state.description,
        age : this.state.age,
      }
    );
    this.setState({
      ShowTable :true,
      DataArr : DataArr1,
      firstName : '',
      lastName : '',
      description : '',
      age : null
    })
  }

  DeleteData(i){
    let DataArr1 = this.state.DataArr;
    DataArr1.splice(i,1);
    this.setState({
      DataArr : DataArr1,
    })
  }

  EditData(i){
    // let DataArr1 = this.state.DataArr;
    this.setState({
      edit : !this.state.edit,
      Submit_btn : !this.state.Submit_btn,
      firstName : this.state.DataArr[i].FName,
      lastName : this.state.DataArr[i].LName,
      description : this.state.DataArr[i].Desc,
      age : this.state.DataArr[i].age,
    })
    if(this.state.edit === false ){
      this.setState({
        firstName : '',
        lastName : '',
        description : '',
        age : null
      })
    }
  }

  CreateTable(){
    let context = this;
    return this.state.DataArr.map(
      function(a,i){
        return (
          <tr key={'DataArr of Index ' + i} id='TRow-Data' className='table-row'>
            <td id='TD-Data' className='table-data'>{i+1}</td>
            <td id='TD-Data' className='table-data'>{context.state.DataArr[i].FName + ' ' + context.state.DataArr[i].LName}</td>
            <td id='TD-Data' className='table-data'>{context.state.DataArr[i].Desc}</td>
            <td id='TD-Data' className='table-data'>{context.state.DataArr[i].age}</td>
            <td id='TD-Data' className='table-data'>
              <button 
                id='Table_edit_btn'
                className = 'Table_edit_btn'
                onClick = {context.EditData.bind(context,i)}
                >
                {context.state.edit === true ? 'Edit' : 'Cancel'}
              </button>
              <button
                className = 'Table_Dlt_btn'
                id='Table_Dlt_btn'
                onClick = {context.DeleteData.bind(context,i)}
                >
                Delete
              </button>
            </td>
          </tr>
        );
      }
    )
  }
      
  render(){
    return (
      <div className="App">
        <div className='container'>
          <form>
            <div className='row'>
              <div className = 'col-25'>
                <label>Enter Your FirstName : </label>
              </div>
              <div className = 'col-75'>
                <input 
                  type='Text'
                  name = 'firstName'
                  value = {this.state.firstName}
                  placeholder = 'Enter Your FirstName.'
                  onChange = {this.handleChange}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-25'>
                <label>Enter Your LastName : </label>
              </div>
              <div className='col-75'>
              <input 
                type='Text'
                name = 'lastName'
                value = {this.state.lastName}
                placeholder = 'Enter Your LastName.'
                onChange = {this.handleChange}
              />
              </div>
            </div>
            <div className='row'>
              <div className ='col-25'>
                <label>Describe Your Self : </label>
              </div>
              <div className='col-75'>
                <textarea
                  rows= {5}
                  cols = {50}
                  placeholder = 'Description ' 
                  value = {this.state.description}
                  name = 'description'
                  onChange = {this.handleChange}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-25'>
                <label>Enter Age : </label>
              </div>
              <div className='col-75'>
                <input 
                  type='number'
                  name = 'age'
                  value = {this.state.age}
                  placeholder= 'Enter Age'
                  onKeyDown = {this.handleArrowBtn}
                  onChange = {this.handleChange}
                />
              </div>
            </div>
            <div className='row'>
              <button 
              className='Submit_btn'
              onClick = {this.FormSubmit}
              >
              {this.state.Submit_btn === true ? 'Submit' : 'Update'}
              </button>
            </div>
          </form>
        </div>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Your Name </th>
              <th>description</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.CreateTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;



        // {
        //   id: Number,
        //   title: "",
        //   Description : "" ,
        //   date: new Date().toLocaleTimeString(),
        // },
        // //My name is Jigar Modi.I am from surat.I pursued my BTech(IT) Degree from Charusat University.My Hobies Are To do Cycling, Drive a Car, Traveling.
        // {
        //   id:2,
        //   title: "Lorean Epsum",
        //   Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." ,
        //   date: new Date().toLocaleDateString(),
        // },
        // {
        //   id:3,
        //   title: "Lorean Epsum",
        //   Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." ,
        //   date: new Date().toLocaleDateString(),
        // },
      // ],

  // shouldComponentUpdate() {
  //   return false;
  // }
  
  // componentDidMount(){
  //   this.IntervalID = setInterval(() => 
  //     this.Tick(),
  //   1000);
  // }
    // Tick(){
  //   this.setState({
  //     time : this.state.time - 1,
  //   });
  //   if (this.state.time === 0 ) {
  //     this.setState({
  //       time : 60,
  //     });
  //   }
  // }

  // handleClick(){
  //   this.setState({
  //     istoggleOn : !this.state.istoggleOn,
  //   });
  //   if (this.state.istoggleOn === false ) {
  //     clearInterval(this.IntervalID);
  //   }
  //   else{
  //     this.IntervalID = setInterval(() => 
  //       this.Tick(),
  //     1000);  
  //   }
  // }