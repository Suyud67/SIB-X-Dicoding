const main = function () {
  const searchElement = document.querySelector('#searchElement');
  const buttonSearchElement = document.querySelector('#searchButtonElement');
  const clubListElement = document.querySelector('#clubList');

  const onButtonSearchClicked = function () {
    const dataSource = new DataSource(renderResult, fallbackResult);
    dataSource.searchClub(searchElement.value);
  };

  const renderResult = function (result) {
    clubListElement.innerHTML = '';
    const { name, fanArt, description } = result;
    const clubName = name;
    const clubFanArt = fanArt;
    const clubDescription = description;

    const clubElement = document.createElement('div');
    clubElement.setAttribute('class', 'club');

    clubElement.innerHTML = '<img class="fan-art-club" src="' + clubFanArt + '" alt="Fan Art">\n' + '<div class="club-info">\n' + '<h2>' + clubName + '</h2>\n' + '<p>' + clubDescription + '</p>' + '</div>';
    clubListElement.appendChild(clubElement);
  };

  const fallbackResult = function (message) {
    clubListElement.innerHTML = '';
    clubListElement.innerHTML += '<h2 class="placeholder">' + message + '</h2>';
  };

  buttonSearchElement.addEventListener('click', onButtonSearchClicked);
};
