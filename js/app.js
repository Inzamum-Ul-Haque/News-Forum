const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (news) => {
  const categoriesList = document.getElementById("categories-list");
  news.forEach((singleNews) => {
    console.log(singleNews);
    const li = document.createElement("li");
    li.innerText = singleNews.category_name;
    categoriesList.appendChild(li);
  });
};

loadCategories();
