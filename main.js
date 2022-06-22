const init = () => {
  console.log("loading...");

  const app = document.getElementById("app"),
    myConsole = document.createElement("div"),
    myContainer = document.createElement("div"),
    greeting = document.createElement("h1"),
    userRandom = document.createElement("div"),
    btnNext = document.createElement("div"),
    btnReset = document.createElement("div"),
    url = "https://randomuser.me/api/",
    time = 1000;

  document.body.classList.add("p-8", "h-screen");

  userRandom.classList.add(
    "flex",
    "py-4",
    "bg-white",
    "rounded-sm",
    "p-6",
    "mt-3",
    "ring-1",
    "ring-slate-900/5",
    "hover:drop-shadow-sm"
  );
  greeting.classList.add("greeting", "text-5xl");

  btnNext.innerHTML +=
    "<button type='button' class='w-full sm:w-auto py-3 px-6 mt-3 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer'>Continuar</button>";
  btnReset.innerHTML +=
    "<button type='button' class='w-full sm:w-auto py-3 px-6 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer'>Reiniciar</button>";

  $(btnNext).on("click", () => next());

  $(btnReset).on("click", () => {
    while (app.firstChild) app.removeChild(app.firstChild);
    document.body.classList.remove("bg-slate-200");
    console.clear();
    init();
  });

  $.ajax({
    url,
    dataType: "json",
    success: (data) => {
      let { picture, name, email } = data.results[0];
      userRandom.innerHTML = `<img class="h-10 w-10 rounded-full" src="${picture.thumbnail}" alt="" /><div class="ml-3 overflow-hidden"><p class="text-sm font-medium text-slate-900">${name.first} ${name.last}</p><p class="text-sm text-slate-500"><a class="hover:text-sky-500" href="mailto:${email}">${email}</a></p></div>`;
    },
    error: (xhr, status) => console.log("Ocurrió un problema", status),
    complete: (xhr, status) => console.log("Consulta realizada!!", status),
  });

  const msg1 = "Mostrar consola",
    msg2 = "Aplicar un fondo gris al body",
    msg3 = "Añadir un recuadro blanco en el centro de la pantalla",
    msg4 = 'Mostrar en grande y en el centro del recuadro la palabra "Hola"',
    msg5 = 'Cambiar la palabra de antes por "Hello"',
    msg6 = "Información de un usuario aleatorio",
    msg7 = "Mostrar botón Continuar",
    msg8 = 'Cambiar la palabra de antes por "Adiós"',
    msg9 = 'Cambiar la palabra de antes por "Bye"',
    msg10 = "Quitar la palabra y poner un botón que diga reiniciar.";

  app.classList.add("h-full");

  myConsole.setAttribute("id", "console");
  myConsole.classList.add(
    "bg-black",
    "text-white",
    "text-xs",
    "font-mono",
    "px-4",
    "py-2",
    "max-w-2xl",
    "absolute",
    "top-2",
    "left-2",
    "z-10"
  );

  myContainer.classList.add(
    "bg-white",
    "h-full",
    "rounded-md",
    "px-6",
    "ring-1",
    "ring-slate-900/5",
    "shadow-md",
    "flex",
    "flex-col",
    "justify-center",
    "items-center"
  );

  const myConsoleData = (msg) => {
    msg === msg1
      ? (myConsole.innerHTML = `<div>${msg}</div>`)
      : (myConsole.innerHTML += `<div>${msg}</div>`);
    console.log(msg);
  };

  const promise1 = (resolve, reject) => {
    setTimeout(() => {
      myConsoleData(msg1);
      app.append(myConsole);
      resolve();
    }, time);
  };
  const promise2 = (resolve, reject) => {
    setTimeout(() => {
      document.body.classList.add("bg-slate-200");
      myConsoleData(msg2);
      resolve();
    }, time * 2);
  };
  const promise3 = (resolve, reject) => {
    setTimeout(() => {
      app.append(myContainer);
      myConsoleData(msg3);
      resolve();
    }, time * 3);
  };
  const promise4 = (resolve, reject) => {
    setTimeout(() => {
      greeting.textContent = "Hola";
      myContainer.append(greeting);
      myConsoleData(msg4);
      resolve();
    }, time * 4);
  };
  const promise5 = (resolve, reject) => {
    setTimeout(() => {
      greeting.textContent = "Hello";
      myConsoleData(msg5);
      resolve();
    }, time * 5);
  };
  const promise6 = (resolve, reject) => {
    setTimeout(() => {
      myContainer.append(userRandom);
      myConsoleData(msg6);
      resolve();
    }, time * 6);
  };
  const promise7 = (resolve, reject) => {
    setTimeout(() => {
      myContainer.append(btnNext);
      myConsoleData(msg7);
      resolve();
    }, time * 7);
  };
  const promise8 = (resolve, reject) => {
    setTimeout(() => {
      myContainer.removeChild(userRandom);
      myContainer.removeChild(btnNext);
      greeting.textContent = "Adiós";
      myConsoleData(msg8);
      resolve();
    }, time * 1);
  };
  const promise9 = (resolve, reject) => {
    setTimeout(() => {
      greeting.textContent = "Bye";
      myConsoleData(msg9);
      resolve();
    }, time * 2);
  };
  const promise10 = (resolve, reject) => {
    setTimeout(() => {
      myContainer.removeChild(greeting);
      myContainer.append(btnReset);
      myConsoleData(msg10);
      resolve();
    }, time * 3);
  };

  Promise.all([
    new Promise(promise1),
    new Promise(promise2),
    new Promise(promise3),
    new Promise(promise4),
    new Promise(promise5),
    new Promise(promise6),
    new Promise(promise7),
  ])
    .then(() => console.log("Done!!! continue??"))
    .catch((reason) => {
      console.log(reason);
    });

  const next = () => {
    Promise.all([
      new Promise(promise8),
      new Promise(promise9),
      new Promise(promise10),
    ])
      .then(() => console.log("Done!!! again??"))
      .catch((reason) => {
        console.log(reason);
      });
  };
};

init();
