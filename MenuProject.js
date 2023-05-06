//Application that allows visitors to create various appointments at a beauty salon

// class that holds a name and type of appointment for each visitor to the salon
class User {
  constructor(name, time) {
    this.name = name;
    this.time = time;
  }
  describe() {
    return `Welcome to the salon, ${this.name}. Your appointment time is ${this.time}.`;
  }
}
// Class that holds the time of the appointment.
// Creates an empty array to hold the appointment info and push a user to it.
class Appointment {
  constructor(name, time) {
    this.name = name;
    this.time = time;
    this.users = [];
  }
  addUser(user) {
    if (user instanceof User) {
      this.users.push(user);
    } else {
      throw new Error(
        `You can only add an instance of a user. Argument is not a user: ${user}`
      );
    }
  }
  describe() {
    return `${this.name}, thanks for making an appointment. See you on ${this.time} for your ${this.type}`;
  }
}
//  creating a menu that has a start method to run it and initialize appts array. Variable for selected appoint - set to null.
class Menu {
  constructor() {
    this.appointments = [];
    this.selectedAppointment = null;
  }
  // selection holds user inputted choice of menu items, use switch to go through each option and do something with the
  // choice. If they type 1 they can create an appointment. If they select 2 they can view an ppointment. If they select
  // 3 they can delete an appointment. If they pick 4 they can display all appointments. If they dont pick one the code sets
  // the selection value to 0 and it will bring them outside of the loop. It will alert them that message once out.
  start() {
    let selection = this.startMenu();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createAppt();
          break;
        case "2":
          this.viewAppt();
          break;
        case "3":
          this.deleteAppt();
          break;
        case "4":
          this.displayAppt();
          break;
        default:
          selection = 0;
      }
      selection = this.startMenu();
    }
    alert("Thank you for using the salon appointment manager!");
  }
  startMenu() {
    return prompt(`
      0. Leave
      1. Create an appointment
      2. View all appointments
      3. Delete an appointment
      4. Display an appointment
    `);
  }

  showApptOptions(apptInfo) {
    return prompt(`
    0. Back
    1. Delete an appointment
    _______________________
    ${apptInfo}
    `);
  }
  // make an empty string for the appointments, go through each appointment, get their names and put on a new line
  // then alert the appointment
  viewAppt() {
    let apptString = "";
    for (let i = 0; i < this.appointments.length; i++) {
      apptString +=
        i +
        ") " +
        this.appointments[i].name +
        "  Time: " +
        this.appointments[i].time +
        "\n";
    }
    alert(apptString);
  }
  createAppt() {
    let name = prompt("What is your name?");
    let time = prompt("What time would you like your appointment to be?");
    this.appointments.push(new Appointment(name, time));
  }
  displayAppt() {
    let index = prompt(
      "Please enter the index of the appointment you wish to see."
    );
    if (index > -1 && index < this.appointments.length) {
      this.selectedAppt = this.appointments[index];
      let description =
        "Customer Name: " +
        this.selectedAppt.name +
        "  Time: " +
        this.selectedAppt.time +
        "\n";

      for (let i = 0; i < this.selectedAppt.users.length; i++) {
        description +=
          i +
          ")" +
          this.selectedAppt.users[i].name +
          "  -  " +
          this.selectedAppt.users[i].time +
          "\n";
      }
      let selection = this.showApptOptions(description);
      switch (selection) {
        case "1":
          this.deleteAppt();
      }
    }
  }
  deleteAppt() {
    let index = prompt(
      "Enter the index of the appointment you wish to delete."
    );
    if (index > -1 && index < this.appointments.length) {
      this.appointments.splice(index, 1);
    }
  }
}
let menu = new Menu();
menu.start();
