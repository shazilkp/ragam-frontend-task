const buttons = document.querySelectorAll('.nav-button');
const cards = document.querySelectorAll('.card');

main();

async function main(){
    timeData = await getData();
}

async function getData(){
    const res = await fetch('data.json');
    const data = await res.json();
    return data;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Simulated data updates
        const view = button.textContent.toLowerCase();
        updateCards(view);
    });
});

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function updateCards(view) {
    // Example logic to update content based on the view
    cards.forEach(card => {
        
        const hours = card.querySelector('.hours');
        const lastWeek = card.querySelector('.last-week');
        const title = capitalizeFirstLetter(card.classList[1]);
        const la = timeData.find(item => item.title === title);

        if (view === 'daily') {
            //console.log(la.timeframes.daily.current);
            hours.textContent = la.timeframes.daily.current + 'hrs';
            lastWeek.textContent = `Yesterday - ${la.timeframes.daily.previous}hrs`;
        } else if (view === 'weekly') {
            hours.textContent = la.timeframes.weekly.current+ 'hrs';
            lastWeek.textContent = `Last Week - ${la.timeframes.weekly.previous}hrs`;
        } else {
            hours.textContent = la.timeframes.monthly.current + 'hrs';
            lastWeek.textContent = `Last Month - ${la.timeframes.monthly.previous}hrs`;
        }
    });
}
