export const buildPikomon = (array) => {
    let pikomonHTML = '';
    for (const pikomon of array) {
        pikomonHTML += `
        <div class ="piko-card">
            <img class="piko-img" src="${pikomon.imageUrl}">
            <p class="lives-text">❤️:${pikomon.lives}</p>
            <h2 class="piko-name">${pikomon.name}</h2>
            <p class="piko-category">${pikomon.category}</p>
            <div class="info-text">
                <p><span class="bold-underline">Ability<br></span>
                    &nbsp;${pikomon.abilities}
                </p>
                <p><span class="bold-underline">Weakness<br></span>
                &nbsp;${pikomon.weakness}
                </p>
            </div>
        </div>
    `
    }
    return pikomonHTML
}