const fs = require('fs')
const crypto = require('crypto')

class userManager {
   constructor(path) {
      this.path = path
   }

   async createUser(user) {
      try {
         const cipher = crypto.createCipher('aes192', 'a password')
         let encrypted = cipher.update(user.password, 'utf8', 'hex')
         encrypted += cipher.final('hex')

         let credentials = {
            username: user.username,
            password: encrypted
         }

         await fs.promises.writeFile(this.path, JSON.stringify(credentials, null, 2), 'utf8')
         console.log('User guardado!')
      } catch (error) {
         console.error("Error al crear el User");
      }
   }

   async validateUser(user) {
      let userFound = await fs.promises.readFile(this.path, 'utf8')
      let userExists = JSON.parse(userFound)

      const decipher = crypto.createDecipher('aes192', 'a password')
      let encrypted = userExists.password
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')

      if (user.username === userExists.username && decrypted === user.password) {
         console.log('User logged!')
      } else {
         console.error('Error logging user.')
      }
      
   } catch(error) {
      console.error('Error al validar el User')
   }
}


let newUser = new userManager('./usuarios.json')
/* newUser.createUser({ username: 'hernanrojas', password: '123456789' }) */
newUser.validateUser({ username: 'hernanrojas', password: '123456789' })