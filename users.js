async function GetUsers() { 
    let xhr1 = new XMLHttpRequest() 
    xhr1.open('GET', "https://jsonplaceholder.typicode.com/users") 
    xhr1.send() 
    let xhr2 = new XMLHttpRequest() 
    xhr2.open('GET', "https://jsonplaceholder.typicode.com/todos") 
    xhr2.send() 
 
    xhr1.onload = function () { 
        let user_response = JSON.parse(xhr1.response) 
        xhr2.onload = function () { 
            let todo_response = JSON.parse(xhr2.response) 
  
            if (Array.isArray(user_response) && user_response.length > 0 && Array.isArray(todo_response) && todo_response.length > 0) { 
                user_response.forEach((user,index) => { 
                    let userTodos = todo_response.filter(t => t.userId === user.id) 
                    userTodos.forEach((userTodo) => { 

                        let row = '<tr style="border-collapse: collapse;">'; 
                        row += '<td>' + userTodo.id + '</td>' 
                        row += '<td>' + user.name + '</td>' 
                        row += '<td>' + userTodo.title + '</td>' 
                        row += '<td><input type="checkbox" ' + (userTodo.completed ? 'checked' : '') + ' disabled title="Задача выполнена"></td>';
                        row += '</tr>'

                        $('table tbody').append(row)
                    }) 
                }) 
            } 
        } 
    } 
} 