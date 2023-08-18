const photoInput = document.getElementById('photoInput')
const photoLabel = document.querySelector('.photo')

photoLabel.addEventListener('click', function () {
    photoInput.click()
})

photoInput.addEventListener('change', function () {
    const files = photoInput.files
    if (files.length > 0) {
        const fileName = files[0].name
        photoLabel.textContent = fileName
    }
})
