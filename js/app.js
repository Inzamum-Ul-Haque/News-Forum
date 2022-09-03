// toggle spinner
const toggleSpinner = (toggle) => {
  const spinnerDiv = document.getElementById("spinner-div");
  if (toggle) {
    spinnerDiv.classList.remove("d-none");
  } else {
    spinnerDiv.classList.add("d-none");
  }
};

// load default news category
const loadDefaultNews = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDefaultNews(data.data))
    .catch((error) => console.log(error));
};

const displayDefaultNews = (allNews) => {
  const itemsCounter = document.getElementById("items-counter");
  itemsCounter.innerText = `${allNews.length} items found in All News category`;

  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = ``;
  allNews.sort((a, b) => parseFloat(a.total_view) - parseFloat(b.total_view));
  allNews.forEach((singleNews) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");
    cardDiv.innerHTML = `
    <div class="row g-0 p-3 bg-light">
      <div class="col-md-4">
        <img src="${
          singleNews?.image_url
        }" class="h-100 img-fluid rounded-start ms-0" alt="" />
      </div>
      <div class="col-md-8">
        <div class="card-body ms-4">
          <h5 class="card-title fs-4">
            ${singleNews?.title}
          </h5>
          <p class="card-text text-muted">
            ${singleNews?.details.slice(0, 400) + "..."}
          </p>
          <div
            class="d-flex justify-content-between align-items-center"
          >
            <div class="d-flex">
              <img
                class="author-img img-fluid rounded-circle profile-img ms-0 me-2 h-100"
                src="${singleNews?.author.img}"
                alt=""
              />
              <div class="d-flex flex-column justify-content-center">
                <span><b>${
                  singleNews.author.name
                    ? singleNews.author.name
                    : "No author found"
                }</b></span>
                <span class="text-muted">${
                  singleNews.author?.published_date
                    ? singleNews.author?.published_date
                    : "No date available"
                }</span>
              </div>
            </div>
            <div>
              <i class="fa-solid fa-eye me-1"></i>
              <span>${
                singleNews.total_view ? singleNews.total_view : "0"
              }</span>
            </div>
            <div>
              <i class="fa-regular fa-star-half-stroke"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <div>
              <button onclick=showDetails('${
                singleNews._id
              }') class="btn-news-details bg-light" data-bs-toggle="modal"
              data-bs-target="#newsDetailsModal">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
    `;
    newsContainer.appendChild(cardDiv);
  });
};

// list of categories in the header section
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (news) => {
  const categoriesList = document.getElementById("categories-list");
  news.forEach((singleNews) => {
    const li = document.createElement("li");
    li.setAttribute(
      "onclick",
      `loadNewsInCards('${singleNews.category_id}', event)`
    );
    li.innerText = singleNews.category_name;
    categoriesList.appendChild(li);
  });
};

// displaying news in cards section
const loadNewsInCards = (id, event) => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsInCards(data.data, event.target.innerText))
    .catch((error) => console.log(error));
};

const displayNewsInCards = (allNews, text) => {
  //setting the items counter
  const itemsCounter = document.getElementById("items-counter");
  itemsCounter.innerText = `${allNews.length} items found in ${text} category`;

  //setting the cards section
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = ``;
  allNews.sort((a, b) => parseFloat(a.total_view) - parseFloat(b.total_view));
  allNews.forEach((singleNews) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");
    cardDiv.innerHTML = `
    <div class="row g-0 p-3 bg-light">
      <div class="col-md-4">
        <img src="${
          singleNews?.image_url
        }" class="h-100 img-fluid rounded-start ms-0" alt="" />
      </div>
      <div class="col-md-8">
        <div class="card-body ms-4">
          <h5 class="card-title fs-4">
            ${singleNews?.title}
          </h5>
          <p class="card-text text-muted">
            ${singleNews?.details.slice(0, 400) + "..."}
          </p>
          <div
            class="d-flex justify-content-between align-items-center"
          >
            <div class="d-flex">
              <img
                class="author-img img-fluid rounded-circle profile-img ms-0 me-2 h-100"
                src="${singleNews?.author.img}"
                alt=""
              />
              <div class="d-flex flex-column justify-content-center">
                <span><b>${
                  singleNews.author.name
                    ? singleNews.author.name
                    : "No author found"
                }</b></span>
                <span class="text-muted">${
                  singleNews.author?.published_date
                    ? singleNews.author?.published_date
                    : "No date available"
                }</span>
              </div>
            </div>
            <div>
              <i class="fa-solid fa-eye me-1"></i>
              <span>${
                singleNews.total_view ? singleNews.total_view : "0"
              }</span>
            </div>
            <div>
              <i class="fa-regular fa-star-half-stroke"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <div>
              <button onclick=showDetails('${
                singleNews._id
              }') class="btn-news-details bg-light" data-bs-toggle="modal"
              data-bs-target="#newsDetailsModal">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
    `;
    newsContainer.appendChild(cardDiv);
  });
  toggleSpinner(false);
};

// display details of news in modal
const showDetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModalDetails(data.data[0]))
    .catch((error) => console.log(error));
};

const displayModalDetails = (singleNewsDetails) => {
  const modalLabelTitle = document.getElementById("modal-label-title");
  const newsDetailsImg = document.getElementById("news-details-img");
  const newsDetailsDesc = document.getElementById("news-details-desc");
  const newsDetailsAuthor = document.getElementById("news-details-author");
  const newsDetailsDate = document.getElementById("news-details-date");

  modalLabelTitle.innerText = singleNewsDetails.title;
  newsDetailsImg.setAttribute("src", `${singleNewsDetails.image_url}`);
  newsDetailsDesc.innerText = singleNewsDetails.details;
  newsDetailsAuthor.innerText = singleNewsDetails.author.name
    ? singleNewsDetails.author.name
    : "Unknown";
  newsDetailsDate.innerText = singleNewsDetails.author.published_date;
};

loadCategories();
loadDefaultNews("08");
