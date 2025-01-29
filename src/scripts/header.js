const menuButton = document.getElementById('menu')
menuButton.addEventListener('click', () => {
  const overlay = document.getElementById('overlay')
  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden')
  }
  else {
    overlay.classList.add('hidden')
  }
})
