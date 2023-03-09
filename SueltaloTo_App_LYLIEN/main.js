import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'



const worries = [
  "depresión",
  "ansiedad",
  "autoestima",
  "TCA",
  "sólo quiero hablar",
  "otro",
];

const onlineDoctors = [
  {
    name: "Aina Crespí",
    specialty: [worries[0], worries[3], worries[4], worries[5]],
  },
  {
    name: "Adil Ahmed",
    specialty: [worries[0], worries[2], worries[4], worries[5]],
  },
  {
    name: "Laura Castaño",
    specialty: [worries[0], worries[1], worries[4], worries[5]],
  },
];

const officeDoctors = [
  {
    name: "Mohamed Ahmed",
    specialty: [worries[0], worries[1], worries[4], worries[5]],
  },
  {
    name: "Lucía Bella",
    specialty: [worries[0], worries[3], worries[4], worries[5]],
  },
  {
    name: "Miguel de Cervantes",
    specialty: [worries[0], worries[2], worries[4], worries[5]],
  },
];

const availableWorries = worries.join(", ");

let foundDoctors = [];

const appointment = {
  name: "",
  doctor: "",
  mode: "",
  date: "",
  time: "",
};

const userData = {
  mail: "",
  password: "",
  motive: "",
};

let appointments = [];

const greet = () => {
  console.log("Bienvenido/a a SuéltaloTo");
  console.log("=========================");
  LogIn();
};

const LogIn = () => {
  let wantLogIn = confirm("¿Quiere iniciar sesión?");
  if (wantLogIn == false) {
    endOfProcess();
  } else {
    getUserMail();
  }
};



const getUserMail = () => {
  userData.mail = prompt("Introduzca su E-mail");
  if (userData.mail == "exit") {
    endOfProcess();
    return;
  }
  const isValidMail = validateUserMail(userData.mail);
  if (isValidMail) {
    getUserPassword();
  } else {
    console.log(
      "El E-Mail que ha introducido no es válido, inténtelo de nuevo."
    );
    getUserMail();
  }
};

const getUserPassword = () => {
  userData.password = prompt(
    "Introduzca su contraseña. 8 caracteres y un nº al menos"
  );
  if (userData.password == "exit") {
    endOfProcess();
    return;
  }
  const isValidPassword = validateUserPassword(userData.password);
  if (isValidPassword) {
    wantAppointment();
  } else {
    console.log("La contraseña es incorrecta, inténtelo de nuevo.");
    getUserPassword();
  }
};

const wantAppointment = () => {
  const wantNewAppointment = confirm(
    `Hola. ¿Desea concertar una cita?`
  );
  if (wantNewAppointment == false) {
    endOfProcess();
    return;
  } else {
    getUserName();
  }
};

const getUserName = () => {
  appointment.name = prompt("Introduzca su nombre");
  if (appointment.name == "exit") {
    endOfProcess();
    return;
  }
  const isValidName = validateUserName(appointment.name);
  if (isValidName) {
    onlineOrOffice();
  } else {
    console.log(
      "El nombre que ha introducido no es válido, inténtelo de nuevo."
    );
    getUserName();
  }
};

const onlineOrOffice = () => {
  appointment.mode = prompt("¿Prefiere tener una sesión online o presencial?");
  if (appointment.mode == "exit") {
    endOfProcess();
    return;
  } else if (appointment.mode == "online") {
    getUserWorry();
  } else if (appointment.mode == "presencial") {
    getUserWorry();
  } else {
    console.log(
      "No existe esta opción. Por favor, vuelva a introducir su preferencia."
    );
    onlineOrOffice();
  }
};

const getUserWorry = () => {
  userData.motive = prompt(
    `Indíquenos el motivo de su consulta. Por favor, elija una de estas opciones: ${availableWorries}.`
  );
  if (userData.motive == "exit") {
    endOfProcess();
    return;
  }
  const doesWorryExist = worries.includes(userData.motive);
  if (doesWorryExist) {
    availableDoctors();
  } else {
    console.log("No existe esta opción. Por favor, vuelva a intentarlo.");
    getUserWorry();
  }
};

const availableDoctors = () => {
  foundDoctors = []

  if (appointment.mode == "online") {
    for (const doctor of onlineDoctors) {
      for (const specialty of doctor.specialty) {
        if (specialty == userData.motive) {
          foundDoctors.push(doctor.name);
        }
      }
    }
  } else if (appointment.mode == "presencial") {
    for (const doctor of officeDoctors) {
      for (const specialty of doctor.specialty) {
        if (specialty == userData.motive) {
          foundDoctors.push(doctor.name);
        }
      }
    }
  }
  chooseDoctor();
};

const chooseDoctor = () => {
  appointment.doctor = prompt(
    `Estos son los mejores especialistas de SuéltaloTo: ${foundDoctors.join(
      ", "
    )}. Escoja a uno por favor.`
  );
  if (appointment.doctor == "exit") {
    endOfProcess();
    return;
  }
  const doesDoctorExist = foundDoctors.includes(appointment.doctor);
  if (doesDoctorExist) {
    chooseDate();
  } else {
    console.log("No existe esta persona. Por favor, vuelva a intentarlo.");
    chooseDoctor();
  }
};

const chooseDate = () => {
  appointment.date = prompt(
    `Indíquenos la fecha que desea para su sesión (DD/MM/AAAA).`
  );
  if (appointment.date == "exit") {
    endOfProcess();
    return;
  }
  const isValidDate = validateDate(appointment.date);
  if (isValidDate) {
    chooseTime();
  } else {
    console.log(
      "Ha habido un error con la fecha que nos solicita, compruebe que es el formato correcto e inténtelo de nuevo."
    );
    chooseDate();
  }
};

const chooseTime = () => {
  appointment.time = prompt(
    `¿A qué hora querría tener la sesión? (Ej.: 12:00)`
  );
  if (appointment.time == "exit") {
    endOfProcess();
    return;
  }
  const isValidTime = validateTime(appointment.time);
  if (isValidTime) {
    isAppointmentOk();
  } else {
    console.log(
      "Ha habido un error con la hora que nos solicita, compruebe que es el formato correcto e inténtelo de nuevo."
    );
    chooseTime();
  }
};

const isAppointmentOk = () => {
  console.log(`Está es su cita:
  Nombre: ${appointment.name}
  Doctor: ${appointment.doctor}
  Modelo de cita: ${appointment.mode}
  Fecha: ${appointment.date}
  Hora: ${appointment.time}`);
  const youLikeAppointment = confirm(`¿Está conforme con su cita?`);
  if (youLikeAppointment) {
    appointments.push({...appointment});
    userAppointments();
  } else {
    wantAppointment();
  }
};

const userAppointments = () => {
  console.log(appointments)
  for (let i = 0; i < appointments.length; i++) {
  console.log({...appointments[i]});}
  const askActions = confirm(`¿Necesita algo más?`);
  if (askActions) {
    moreActions();
  } else {
    endOfProcess();
    return;
  }
};
const moreActions = () => {
  const chooseAction = prompt(
    `Elija opción que desee indicándonos el nº correspondiente:
     ` + 1 
     + ` Solicitar una cita nueva, 
     ` + 2 
     + ` cancelar cita 
     ` + 3 
     + ` nada.`
  );
  if (chooseAction == 1) {
    wantAppointment()
  } else if (chooseAction == 2) {
    cancelAppointment()
  } else if (chooseAction == 3) {
    endOfProcess()
    return
  } else {
    console.log(`No le hemos entendido. Por favor, iténtelo de nuevo.`)
    moreActions()
  }
};

const cancelAppointment = () => {
  const askAppointmentNum = prompt(`¿Qué cita desea eliminar? Indíquenos el nº de la cita.`)
  if (askAppointmentNum == "exit") {
    endOfProcess()
    return
  }
  const notANumber = isNaN(askAppointmentNum)
  if (!notANumber) {
    const values = askAppointmentNum.split("")
    const optionNumber = +values[0]-1
    for (let i = 0; i == optionNumber; i++) {
      appointments.splice(i, 1);}
      userAppointments()
  } else {
    console.log(`No le hemos entendido. Por favor, inténtelo de nuevo`)
    cancelAppointment()
  }
};

const validateUserName = (stringIn) => {
  const isVoid = stringIn == ""; //tiene que ser false
  const isLengthOk = stringIn.length < 20; //tiene que ser true
  const hasNumber =
    stringIn.includes("0") ||
    stringIn.includes("1") ||
    stringIn.includes("2") ||
    stringIn.includes("3") ||
    stringIn.includes("4") ||
    stringIn.includes("5") ||
    stringIn.includes("6") ||
    stringIn.includes("7") ||
    stringIn.includes("8") ||
    stringIn.includes("9"); //un nombre no incluye nºs a menos que seas hij@ de elon musk, false
  const isNameValid = !isVoid && isLengthOk && !hasNumber;
  return isNameValid;
};

const validateUserMail = (stringIn) => {
  const dotIndex = stringIn.lastIndexOf("."); //última posición de "."
  const atIndex = stringIn.indexOf("@"); //en qué posición se encuentra @
  const lastAtIndex = stringIn.lastIndexOf("@"); //última posición de @

  const isDomainOk = stringIn.slice(dotIndex).length >= 2; //más de 2 caracteres tras el ".", tiene que ser true
  const hasAt = stringIn.includes("@"); //tiene @?, true
  const hasBlank = stringIn.includes(" "); //hay espacios en blanco, tiene que ser false
  const isAtBeforeLastDotWithDiffOf3 = dotIndex - atIndex > 3; // @ antes que "." y con más de 3 caracteres entre ellos, true
  const justOneAt = atIndex == lastAtIndex; // no hay más de 1 @, compara posición de @ con la última posición en la que lo encuentra, true
  const atIsNotFirst = atIndex > 1; //@ no puede ser el primer caracter, true

  const isMailValid =
    isDomainOk &&
    hasAt &&
    !hasBlank &&
    isAtBeforeLastDotWithDiffOf3 &&
    justOneAt &&
    atIsNotFirst;

  return isMailValid;
};

const validateUserPassword = (stringIn) => {
  const isVoid = stringIn == "";
  const isLengthOk = stringIn.length == 8;
  const hasNumber =
    stringIn.includes("0") ||
    stringIn.includes("1") ||
    stringIn.includes("2") ||
    stringIn.includes("3") ||
    stringIn.includes("4") ||
    stringIn.includes("5") ||
    stringIn.includes("6") ||
    stringIn.includes("7") ||
    stringIn.includes("8") ||
    stringIn.includes("9"); //debe tener un nº, true
  const isPasswordValid = !isVoid && isLengthOk && hasNumber;
  return isPasswordValid;
};

const validateDate = (stringIn) => {
  const values = stringIn.split("/");
  const isLengthOk = values.length == 3;
  const isDayWrong = +values[0] > 31;
  const isMonthWrong = +values[1] - 1 > 11;
  const userDate = new Date(+values[2], +values[1] - 1, +values[0]);
  const isInvalidDate = userDate == "Invalid Date";
  const dateToday = new Date();
  const isDateAfter = userDate.getTime() > dateToday.getTime();

  const isValid =
    isLengthOk && !isDayWrong && !isMonthWrong && !isInvalidDate && isDateAfter;
  return isValid;
};

const validateTime = (stringIn) => {
  const values = stringIn.split(":");
  const isLengthOk = values.length == 2;
  const isHourNan = isNaN(values[0]);
  const isHourLate = +values[0] <= 20;
  const isHourSoon = +values[0] >= 9;
  const isMinuteNan = isNaN(values[1]);
  const isMinutehOK = +values[1] <= 59;

  const isValid =
    isLengthOk &&
    !isHourNan &&
    !isMinuteNan &&
    isHourLate &&
    isMinutehOK &&
    isHourSoon;
  return isValid;
};

const endOfProcess = () => {
  let checkExit = confirm("¿Está seguro de que quiere salir?");
  if (checkExit == true) {
    console.log("Gracias por contar con nosotros, vuelva cuando nos necesite");
  } else {
    LogIn();
  }
};

greet();
