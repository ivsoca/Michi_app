const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/'
});

api.defaults.headers.common['X-API-KEY'] = 'live_k3U82QvJ9SwjMQ8MYuXpdl6yPTkDzZaMW2X3Ckli7rQW77mmdQrCZqgoXqaa6yrW'

const API_KEY = "live_k3U82QvJ9SwjMQ8MYuXpdl6yPTkDzZaMW2X3Ckli7rQW77mmdQrCZqgoXqaa6yrW";

const URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2`;
const URL_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const URL_FAVORITES_DELETE = (id) =>`https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;
const URL_UPLOAD = `https://api.thecatapi.com/v1/images/upload`;



const spanError = document.getElementById('error');

const btn = document.getElementById('btn');
// const saveBtn1 = document.getElementById('saveBtn1')

//Funcion para obtener las imagenes
async function loadRandomMichies(){
        const respuesta = await fetch(URL_RANDOM);
        const data =  await respuesta.json();
        console.log('Random')
        
        console.log(data)
        const img1 = document.getElementById('image1');
        const img2 = document.getElementById('image2');

        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')

        
        if(respuesta.status !== 200){
            spanError.innerHTML ="Hubo un error: " + respuesta.status;
        } else{
            img1.src = data[0].url;
            // img2.src = data[1].url;

            btn1.onclick = () =>saveFavouriteMichi(data[0].id);
            btn2.onclick = ()=>saveFavouriteMichi(data[1].id);

        }
    }

    //Funcion para obtener los favoritos
    async function loadFavouritesMichis(){
        const respuesta = await fetch(URL_FAVORITES, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'live_k3U82QvJ9SwjMQ8MYuXpdl6yPTkDzZaMW2X3Ckli7rQW77mmdQrCZqgoXqaa6yrW',
            },
        });
        const data = respuesta.status === 200 ? await respuesta.json() : await respuesta.text();
        // const data =  await respuesta.json();
        // console.log('Favoritos')
        console.log("Favoritos")
        console.log(data)
        console.log(respuesta.status)
       
         if(respuesta.status !== 200){
            spanError.innerHTML = "Hubo un error: " + respuesta.status + data.message;
        } else{
            const section = document.getElementById('favoritesMichis');
            section.innerHTML = "";
            const h2 = document.createElement('h2');
            // const h2Text = document.createTextNode('Michis favoritos');
            // h2.appendChild(h2Text);
            section.appendChild(h2);

            data.forEach(michi =>{
                const article = document.createElement('article');
                article.classList.add('imagen-con-boton-eliminar')
                const img = document.createElement('img');
                img.classList.add('imagenes_load')
                const btn = document.createElement('button');
                const btnText = document.createTextNode('Delete');
                btn.classList.add('botonDelete');

                img.src = michi.image.url
                btn.appendChild(btnText);
                btn.onclick = () => deleteFavouriteMichi(michi.id);
                article.appendChild(img);
                article.appendChild(btn);
                section.appendChild(article); 
            })
        }

    }

    async function saveFavouriteMichi(id){

        const {data, status} = await api.post('/favourites', {
            image_id: id,
        });
        // const respuesta = await fetch(URL_FAVORITES, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-API-KEY': 'live_k3U82QvJ9SwjMQ8MYuXpdl6yPTkDzZaMW2X3Ckli7rQW77mmdQrCZqgoXqaa6yrW',             
        //     },
        //     body: JSON.stringify({
        //         image_id: id
        //     }),
        // });
        // const data =  respuesta.status === 200 ? await respuesta.json() : await respuesta.text();

        console.log('Save')
        // console.log(respuesta)

        if(status !== 200){
            spanError.innerHTML = "Hubo un error: " + status + data.message;
        } else {
            console.log('michi guardado en favoritos')
            loadFavouritesMichis();
        }
    }

    async function  deleteFavouriteMichi(id){
        const respuesta = await fetch(URL_FAVORITES_DELETE(id), {
            method: 'DELETE',
            headers: {
                'X-API-KEY': 'live_k3U82QvJ9SwjMQ8MYuXpdl6yPTkDzZaMW2X3Ckli7rQW77mmdQrCZqgoXqaa6yrW',             
            },
        });
        const data =  respuesta.status === 200 ? await respuesta.json() : await respuesta.text();

        if(respuesta.status !== 200){
            spanError.innerHTML = "Hubo un error: " + respuesta.status + data.message;
        } else {
            console.log('michi eliminado en favoritos')
            loadFavouritesMichis();
        }
    }

    async function uploadMichiPhoto() {
        const form = document.getElementById('uploadingForm');
        const formData = new FormData(form);

        console.log(formData.get('file'))

        const res = await fetch(URL_UPLOAD, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'X-API-KEY': 'live_k3U82QvJ9SwjMQ8MYuXpdl6yPTkDzZaMW2X3Ckli7rQW77mmdQrCZqgoXqaa6yrW',
            },
            body: formData,
        })
        const data = await res.json();

        if(res.status !== 201) {
            spanError.innerHTML = "Hubo un error: " + res.status + data.message;  
        }else {
            console.log('Foto de michi subida')
            console.log({data})
            console.log(data.url)
            saveFavouriteMichi(data.id);
        }  
    }


    btn.addEventListener('click', loadRandomMichies);
    // saveBtn1.addEventListener('click', saveFavouriteMichi);

    loadRandomMichies();
    loadFavouritesMichis();
