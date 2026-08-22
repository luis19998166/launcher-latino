import { news } from "../data/news.js";

/** Pinta las tarjetas de noticias dentro de `[data-bind="news-list"]`. */
export function renderNews(root = document) {
  const container = root.querySelector('[data-bind="news-list"]');
  if (!container) return;

  container.replaceChildren(
    ...news.map((item) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card__media"></div>
        <div class="card__body">
          <span class="card__tag"></span>
          <h3 class="card__title"></h3>
          <span class="card__date"></span>
        </div>
      `;
      // textContent en vez de interpolar: evita romper el layout si el texto
      // trae caracteres especiales, y no abre la puerta a inyeccion de HTML.
      card.querySelector(".card__tag").textContent = item.tag;
      card.querySelector(".card__title").textContent = item.title;
      card.querySelector(".card__date").textContent = item.date;
      return card;
    })
  );
}
