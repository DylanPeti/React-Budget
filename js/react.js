
var Header = React.createClass({
  render: function() {
      return(
        <header className="nav">
          <div className="welcome-bar"></div>
         <div className="header">
         <h1>React Budget</h1>
         </div>
        </header>
      );
  }
})

var Title = React.createClass({
  render: function() {
    return (
      <h1 className="title">Overview</h1>
      );
  }
})

var Menu = React.createClass({
  getInitialState: function() {
    return {
      income: true,
      expense: false
    }
  },
   handleClick: function(name, name2, value, e) {
    e.preventDefault();
    var input = {};
    if(!value) {
      input[name] = !value;
      input[name2] = value;
      this.setState(input);
   }

  },
  render: function() {
    var income = this.state.income ? 'income' : '';
    var expense = this.state.expense ? 'expense' : '';

    return(
    <div>
     <div className="options">
          <a href="#" id={income} className="opt-btn" onClick={this.handleClick.bind(this, 'income', 'expense', this.state.income)}>Income</a>
          <a href="#" id={expense}  className="opt-btn expense" onClick={this.handleClick.bind(this, 'expense', 'income', this.state.expense)}> Expense</a>
      </div>
    </div>

      )
  }
})


var IncomeTableLables = React.createClass({
  render: function() {
    return (
      <div>
       <h3 className="subtitle">Income Items</h3>
      <table className="table-labels">
     
      <thead>
      <tr>
      <td>Type</td>
      <td>Reference</td>
      <td>Description</td>
      <td>Amount NZD</td>
      </tr>
      </thead>
      </table>
    </div>
      );
  }
})

var IncomeRow = React.createClass({
   render: function() {
      return (
        
          <div>
          <td key={this.props.item.id + 4}>{this.props.item.text}</td>
          <td key={this.props.item.id + 5}>{this.props.item.text}</td>

         </div>
        );
   }
});


var IncomeTable = React.createClass({
  

  render: function() {

     return(   
      <div>
      <IncomeTableLables />
      <table className="table"> 
          <tbody>

      {this.props.items.map((item, taskIndex) => 

      <tr key={taskIndex}>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.id}</td>
        <td>${item.amount}</td>
        <td onClick={this.props.deleteTask} value={taskIndex} >x</td>
       </tr>
      
      
           )}


          </tbody>
        </table>
      </div>
        );
   }
});

var Balance = React.createClass({

  render: function() {

     return (
      <div>
      <table className="table-labels">
  
      <thead>
      <tr>
         <td></td>
          <td></td>
         <td>Income: {this.props.balance}</td>
         <td>Expenses</td>
         <td>Total: {this.props.balance}</td>

      </tr>
      </thead>
      </table>
    </div>
      );
  }
})

var BudgetItems = React.createClass({
  getInitialState: function () {
     return{
      items:[], 
      text: '',
      type: 'income',
      description: '',
      amount: '',
      balance:[],
      cats:[]
    };
  },

  onChange: function(name, e) {
    var input = {};
    input[name] = e.target.value;
    if(name = amount) {
      var amount = document.getElementById("amount");
      amount.value = amount.value.replace(/[^0-9]/g, '');
    }
    this.setState(input)
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{
      title: this.state.text, 
      id: Date.now(),
      description: this.state.description,
      amount: this.state.amount,
      type: this.state.income
    }]);
  
   this.state.cats.push(parseInt(this.state.amount));
   var sum = this.state.cats.reduce((a, b) => a + b, 0);


    var nextText = '';
    var nextDescription = '';
    var nextAmount = '';
    this.setState({
      items:nextItems, 
      text: nextText,
      description: nextDescription,
      amount: nextAmount,
      balance: sum,
      type: this.state.income
    })
  },  

  deleteTask: function(e) {
     var taskIndex = parseInt(e.target.value, 10);
     this.setState(state => {
            state.items.splice(taskIndex, 1);
            return {items: state.items,};
        });

        
    },

  render: function() {
    return(
      <div className="item-wrap">
       <div className="item-name">
       <form onSubmit={this.handleSubmit}>
        <h3 className="subtitle">Add a New Item</h3>
        <Menu type={this.state.type} />
        <div className="form-group">
        <input placeholder="title" name="title" onChange={this.onChange.bind(this, 'text')} value={this.state.text} required/>
        <input className="description" placeholder="description" name="description" onChange={this.onChange.bind(this, 'description')} value={this.state.description} required/>
        <input type="number" id="amount" className="amount" placeholder="Amount" name="amount" onChange={this.onChange.bind(this, 'amount')} value={this.state.amount} step="any" required/>
        <button className="primary-btn">Add Item</button>
        </div>
       </form>
       </div>
        <IncomeTable items={this.state.items} deleteTask={this.deleteTask}/>
        <Balance balance={this.state.balance} />
      </div>
      
        );
  }
});


var App = React.createClass({
  render: function() {
    return(
    <div>
          <Header />
          <div className="container">
             <BudgetItems />
          </div>
        </div>
      );
  }
})




var Body = <App/>
ReactDOM.render(Body, document.getElementById("app"));



