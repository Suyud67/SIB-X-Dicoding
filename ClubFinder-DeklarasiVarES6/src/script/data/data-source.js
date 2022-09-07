function DataSource(onSuccess, onFailed) {
  this.onSuccess = onSuccess;
  this.onFailed = onFailed;
}

DataSource.prototype.searchClub = function (keyword) {
  const filteredClubs = clubs.find((club) => {
    return club.name.toLowerCase() == keyword.toLowerCase();
  });

  if (filteredClubs) {
    this.onSuccess(filteredClubs);
  } else {
    this.onFailed(keyword + ' is not found');
  }
};
