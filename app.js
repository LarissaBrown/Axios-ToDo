console.log(axios)
// Part 1 - GET
// The user can see their current list of todos.
// Todos show up as soon as the page loads.
// If a todo item is complete, it should have a strikethrough line on it
// Images should be displayed as images if there are any

//GET user can see current list of todos. Todos show as soon as the page loads. Images displayed as images.


function getAllTodos(type){
    axios.get("https://api.vschool.io/larissabrown/todo")
    .then(response => createTodos(response.data,type))
    .catch(error => console.log(error))
    
}
getAllTodos()




function createTodos (todos, type) {
            if(type){
                document.getElementById('list').innerHTML = ''
                document.getElementById('title').value = ''
                document.getElementById('description').value = ''
                document.getElementById('imgUrl').value = ''
            }
            for(let i = 0; i < todos.length;i++) {

                const div = document.createElement('div')
                const h2 = document.createElement("h2")
                const h3 = document.createElement("h3")
                const hr = document.createElement("hr")
                const img = document.createElement("img")
                const input = document.createElement("input")
                const labelCheckbox = document.createElement("label")
                const deleteButton = document.createElement("button")
                const editButton = document.createElement("button")
                


                h2.textContent = todos[i].title
                h3.textContent = todos[i].description
                img.src = todos[i].imgUrl
                deleteButton.textContent = "Delete"
                input.type = "checkbox"
                labelCheckbox.textContent = "Check When Completed"
                labelCheckbox.style.fontFamily = "Helvetica"
                labelCheckbox.style.fontSize = "12px"
                img.style.width = "200px"
                deleteButton.style.borderRadius = "50%"
                deleteButton.style.height = "40px"
                deleteButton.style.backgroundColor = "pink"
                deleteButton.style.color = "red"
                

                if(todos[i].completed === true) {
                        
                    h2.style.textDecorationLine = "line-through"
                    h2.style.fontFamily = "Helvetica"
                    h2.style.color="red"
                    h3.style.textDecorationLine = "line-through"
                    h3.style.fontFamily = "Helvetica"
                    h3.style.color="red"
                    input.checked = true
                }else{
                    h2.style.textDecoration = "none"
                    h2.style.fontFamily = "Helvetica"
                    h2.style.color="rgb(120, 120, 194)"
                    h3.style.textDecoration = "none"
                    h3.style.fontFamily = "Helvetica"
                    h3.style.color = "rgb(120,120,194)"
                }
            
                deleteButton.addEventListener("click", () => deleteTodo(todos[i]._id))

                input.addEventListener('change', ()=>  putTodo(todos[i]))
                    

                div.appendChild(h2)
                div.appendChild(input)
                div.appendChild(labelCheckbox)
                div.appendChild(deleteButton)
                div.appendChild(h3)
                div.appendChild(img)
                div.appendChild(hr)
                document.getElementById('list').appendChild(div) 
                
              
            }  
       
}


// Part 2 - POST
//  The user can add new todos to their list. The new item should be posted to the todo API so a future reload of the page will still display that new todo item. Making the new todo appear without a refresh is extra credit, but you're encouraged to attempt it.
// A user should be able to geive the item a title.
// A user should be able to give the item a price.
// A user should be able to give the item a description.
// A user should be able to attach an imgUrl to the item
function postTodo() {
    const todoForm = document.todoform
            
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault()
        
        const newTodo = {
            title: todoForm.title.value ,
            description: todoForm.description.value,
            imgUrl: todoForm.imgUrl.value
        }
        axios.post("https://api.vschool.io/larissabrown/todo", newTodo)
            .then(response => getAllTodos('post'))
            .catch(error => console.log(error))
        
    })
}
postTodo()
// Part 3 - PUT Part 1
// Each todo will have a checkbox where it can be marked complete or incomplete
// Checking the checkbox should update the database 
// When the checkbox is checked completed will be true and the strikethrough will occur 
function putTodo(todo) {
     
        axios.put("https://api.vschool.io/larissabrown/todo/"+ todo._id, {completed: !todo.completed})
        .then(response => getAllTodos('put'))
        .catch(error => console.log(error))
        
}


// Part 4 - DELETE
// A user will be able to delete todos (this is different from marking a todo as "completed")
// Each todo should be rendered with a button marked "X" or "Delete" that when clicked, will delete the Todo

function deleteTodo(id) {
    
    axios.delete("https://api.vschool.io/larissabrown/todo/"+ id) 
        .then(response => getAllTodos('delete'))
        .catch(error => console.log(error))
}



// Part 5 - PUT Part 2 
// Each Todo will have an "edit" button.
// When clicked, the info will change to input boxes that are autofilled with the old Todo data
// A user can change the value of these inputs
// When the "edit" button is clicked, it will change to a "save" button.
// When "save" is clicked, the form will disapear, and the new values will be displayed.
// On save, the todo will be edited in the database
// Read through the "using id" section in the API documentation to learn how to delete items using the item's unique id.
