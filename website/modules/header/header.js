function initHeader() {
      const $menu = document.getElementById("menu");
      const $overlay = document.getElementById("overlay");

      $menu.addEventListener('change', (e) => {
        if (e.target.checked) {
            $overlay.classList.remove("hidden");
        } else {
            $overlay.classList.add("hidden");
        }
      })

}

initHeader();