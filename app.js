angular.module('todosApp', []);
const app = angular.module('todosApp');

app.service('todoService', function() {
  this.todos = [
    { title: 'groceries',    completed: false },
    { title: 'wash the car', completed: true }
  ];
  this.add = function(todo) {
    this.todos.push(todo);
  };
});

app.component('todos', {
  template: `
<div>
  <h1>My TODOs</h1>
  <ul>
    <li ng-repeat="todo in $ctrl.todos">{{ todo.title }}
      <input type="checkbox" ng-checked="todo.completed" ng-model="todo.completed">
    </li>
  </ul>

  <h2>Enter a New Todo</h2>
  <label>Title:
  <input type="text" ng-model="$ctrl.newTodo.title"/>
  <button ng-disabled="$ctrl.newTodo.title.length === 0" ng-click="$ctrl.addTodo();">Create New Todo</button>
  <hr/>
  <h4>Let's Snoop on the data for debugging purposes:</h4>
  <pre>{{ $ctrl.todos | json }}
</div>`,
  controller: function($log, todoService) {
    $log.debug('todosCtrl is alive!');

    this.todos = todoService.todos;

    this.resetForm = function() {
      this.newTodo = {
        title: '',
        completed: false
      };
    };

    this.resetForm();

    this.addTodo = function() {
      let newTodo = angular.copy(this.newTodo);
      todoService.add(newTodo);
      this.resetForm();
    };
  }
});
