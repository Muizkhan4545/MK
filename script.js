// script for index (menu interactions), loader & reveal
document.addEventListener('DOMContentLoaded', function(){
  const loader = document.getElementById('loader');
  const site = document.getElementById('site');

  // ensure minimal loader time
  const minTime = 800;
  const start = Date.now();

  // preload hero images to avoid flicker
  const heroImgs = Array.from(document.querySelectorAll('.hero-img')).map(i => i.src);
  const preload = heroImgs.map(src => new Promise(res=>{
    const img = new Image(); img.onload = res; img.onerror = res; img.src = src;
  }));

  Promise.all(preload).then(()=>{
    const wait = Math.max(0, minTime - (Date.now() - start));
    setTimeout(()=> {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity .35s ease';
      setTimeout(()=> {
        loader.style.display = 'none';
        site.classList.remove('hidden');
        startReveal();
      }, 380);
    }, wait);
  });

  // Add click listeners to menu cards -> open product.html in new tab with URL params
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name || '';
      const price = card.dataset.price || '';
      const img = card.dataset.img || '';
      const url = 'product.html?name=' + encodeURIComponent(name) +
                  '&price=' + encodeURIComponent(price) +
                  '&img=' + encodeURIComponent(img);
      window.open(url, '_blank');
    });
  });

  // IntersectionObserver for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  // small hero reveal if needed
  function startReveal(){
    const heroTitle = document.querySelector('.hero-title');
    const heroSub = document.querySelector('.hero-sub');
    if(heroTitle){ heroTitle.style.opacity = '1'; heroTitle.style.transform = 'translateY(0)'; }
    if(heroSub){ heroSub.style.opacity = '1'; heroSub.style.transform = 'translateY(0)'; }
  }
});
