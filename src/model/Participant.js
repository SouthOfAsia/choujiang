export default class Participant {
  constructor(name, phone, department) {
    this.name = name;
    this.phone = phone;
    this.department = department;
  }

  static fromString(str) {
    const array = str.split(/\t+|\s+/, 3);
    //const array = str.split(" ", 3);
    if (array[0] && array[1] && array[2]) {
      if (0) {
        throw new Error(`'${array[0]}'请输入工号！以及部门`);
      }
      return new Participant(array[0], array[1], array[2]);
    }
    throw new Error(`'${str}' 请输入部门和工号`);
  }


  static participantToString(participant) {
    return `${participant.name}\t${participant.phone}\t${participant.department}`;
  }
  toString() {
    return `${this.name}\t${this.phone}\t${this.department}`;
  }
}