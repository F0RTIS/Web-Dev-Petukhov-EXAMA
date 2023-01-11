const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
};

let routesStorage = [];
let guidesStorage = [];

const loadRoutes = async () => {
  const json = await getData(
    'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=47be7261-e4ca-4697-bc48-5bc3d5ffb3da',
  );

  for (let index = 0; index < json.length; index++) {
    routesStorage.push(json[index]);
  }
};

const loadGuides = async () => {
  const json = await getData(
    'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/guides?api_key=47be7261-e4ca-4697-bc48-5bc3d5ffb3da',
  );

  for (let index = 0; index < json.length; index++) {
    guidesStorage.push(json[index]);
  }
};

const renderRowRoutes = (object) => {
  return `
      <tr>
        <td>${object.name}</td>
        <td>
          ${object.description}
        </td>
        <td>${object.mainObject}</td>
        <td><button class="route__button">Выбрать</button></td>
      </tr>`;
};

const renderRoutes = async () => {
  const routes = document.querySelector('.table__routes');
  await loadRoutes();
  let routesTable = `
    <thead>
      <tr>
        <th>Название</th>
        <th>Описание</th>
        <th>Основные объекты</th>
        <th></th>
      </tr>
    </thead>
    <tbody>`;

  for (let index = 0; index < routesStorage.length; index++) {
    routesTable += renderRowRoutes(routesStorage[index]);
  }

  routesTable += `</tbody>`;

  routes.innerHTML = routesTable;
};

// renderRoutes();

// ----------------------------------------------popup---------------------------------------//

const popup__guide = document.querySelector('.popup__guide');
const popup__bg = document.querySelector('.popup__bg');
const guide__buttons = document.querySelectorAll('.guide__button');
const close__popup = document.querySelector('.close-popup');

guide__buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    popup__guide.classList.toggle('active');
    popup__bg.classList.toggle('active');
  });
});

close__popup.addEventListener('click', (event) => {
  event.preventDefault();

  popup__guide.classList.toggle('active');
  popup__bg.classList.toggle('active');
});

//------------------------------------------------------pagination-------------------------------------------//

let current_page = 1;
let records_per_page = 5;

function prevPage(event) {
  event.preventDefault();
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
    ocument.getElementById('routes__table').scrollIntoView();
  }
}

function nextPage(event) {
  event.preventDefault();
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
    document.getElementById('routes__table').scrollIntoView();
  }
}

function changePage(page) {
  const btn_next = document.querySelector('.next__page_routes');
  const btn_prev = document.querySelector('.prev__page_routes');
  const listing_table = document.querySelector('.routes__table_list');
  const page_span = document.querySelector('.current__page_routes');

  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  listing_table.innerHTML = '';

  for (let i = (page - 1) * records_per_page; i < page * records_per_page; i++) {
    listing_table.innerHTML += renderRowRoutes(routesStorage[i]);
  }
  page_span.innerHTML = page;

  console.log(page);

  if (page == 1) {
    btn_prev.style.visibility = 'hidden';
  } else {
    btn_prev.style.visibility = 'visible';
  }

  if (page == numPages()) {
    btn_next.style.visibility = 'hidden';
  } else {
    btn_next.style.visibility = 'visible';
  }
}

const btn_next = document.querySelector('.next__page_routes');
const btn_prev = document.querySelector('.prev__page_routes');

btn_next.addEventListener('click', (event) => nextPage(event));
btn_prev.addEventListener('click', (event) => prevPage(event));

function numPages() {
  return Math.ceil(routesStorage.length / records_per_page);
}

window.onload = async function () {
  await loadRoutes();
  changePage(current_page);
};

const routes__buttons = document.querySelectorAll('.route__button');
console.log(routes__buttons);

routes__buttons.forEach((button) => {
  console.log(button);
  button.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.guides__header').scrollIntoView();
  });
});
