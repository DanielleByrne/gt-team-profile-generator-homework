// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern extends Employee{
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
    getName() {
        console.log(this.name);
    }
    getId(){
        console.log(this.id);
    }
    getEmail(){
        console.log(this.email)
    }
    getRole(role){
       
    }
  }