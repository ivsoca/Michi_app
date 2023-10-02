// Cargar el contenido del otro archivo HTML
fetch('favoritos.html')
  .then(response => response.text())
  .then(data => {
    const section = document.getElementById('favoritesMichis');
  section.innerHTML = "";
  const h2 = document.createElement('h2');
  const h2Text = document.createTextNode('Michis favoritos');
  h2.appendChild(h2Text);
  section.appendChild(h2);

  data.forEach(michi => {
    const article = document.createElement('article');
    article.classList.add('imagen-con-boton2')
    const img = document.createElement('img');
    img.classList.add('imagenes_load')
    const btn = document.createElement('button');
    const btnText = document.createTextNode('Sacar al michi de favoritos');
    btn.classList.add('botonGuardado');

    img.src = michi.image.url
    btn.appendChild(btnText);
    btn.onclick = () => deleteFavouriteMichi(michi.id);
    article.appendChild(img);
    article.appendChild(btn);
    section.appendChild(article);
    }
  })
  .catch(error => {
    console.error('Error al cargar el archivo: ', error);
  });
