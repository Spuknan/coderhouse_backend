const socket = io()

socket.on('Welcome', (data) => {
   console.log(data)
})

socket.on('messages-all', (data) => {
   render(data)
})

function render(data) {
   const html = data.map(elem => {
      return `
         <div>
            <div>
               <p><strong>${elem.author}:</strong></p>
            </div>
            <div>
               <p>${elem.text}</p>
            </div>
         </div>
      `
   }).join(' ')

   document.getElementById('caja').innerHTML = html
}

function addMessage () {
   const message = {
      author: document.getElementById('username').value,
      text: document.getElementById('text').value
   }
   socket.emit('new-message', message)

   console.log(message)
   return false
}