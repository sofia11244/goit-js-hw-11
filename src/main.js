import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery-item', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const spinner = document.getElementById('loading-spinner');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const query = document.getElementById('search-input').value.trim();
  
  if (!query) {
    iziToast.warning({
      title: 'Uyarı',
      message: 'Lütfen bir arama terimi girin!',
    });
    return;
  }

  try {
    // Spinner'ı göster
    spinner.style.display = 'block';

    const response = await fetch(`https://pixabay.com/api/?key=46164011-db8308970fd829f53e85acb75&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`);
    const data = await response.json();
      


    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Hata',
        message: 'Görsel bulunamadı. Lütfen tekrar deneyin!',
      });
      return;
    }

    // Eski sonuçları temizle
    gallery.innerHTML = '';

    // Yeni görselleri ekle ve her görsel için bilgileri göster
    data.hits.forEach(image => {
      const imgElement = document.createElement('a');
      imgElement.href = image.largeImageURL;
      imgElement.classList.add('gallery-item');
      imgElement.innerHTML = `
      <li id="gallery-items">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </li>
        <div class="gallery-items-info">
          <p class="gallery-items-info-alt"><strong>Likes  </strong>${image.likes} </p>
          <p class="gallery-items-info-alt"><strong>Comments </strong> ${image.comments} </p>
          <p class="gallery-items-info-alt"><strong>Views</strong>  ${image.views} </p>
          <p class="gallery-items-info-alt"><strong>Downloads </strong> ${image.downloads} </p>
      `;
      gallery.appendChild(imgElement);
    });

    // SimpleLightbox'u güncelle
    lightbox.refresh();
    
  } catch (error) {
    // Hata durumunda spinner'ı kapat
    spinner.style.display = 'none';

    iziToast.error({
      title: 'Hata',
      message: 'Bir sorun oluştu. Lütfen tekrar deneyin!',
    });
    console.error('Bir hata oluştu:', error);
  } finally {
    // Spinner'ı kapat
    spinner.style.display = 'none';
  }
});
