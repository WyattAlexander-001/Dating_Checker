function calculateScore() {
    const checkboxes = document.querySelectorAll('.yes-no');
    let score = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            score += parseInt(checkbox.getAttribute('data-point'));
        }
    });

    document.getElementById('result').innerText = `Your score is: ${score}`;
}
