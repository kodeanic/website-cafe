class Stock {
    render() {
        let htmlStocks = '';
        STOCKCATALOG.forEach(({ title, text }) => {
            htmlStocks += `
            <li>
                <fieldset>
                    <h4>${title}</h4>
                    <p></p>
                    <p>${text}</p>
                </fieldset>
            </li>
            `;
        });
        let html = `
        <ul class="stocks-container">
            ${htmlStocks}
        </ul>
        `;

        ROOT_STOCK.innerHTML = html;
    }
}
const stockPage = new Stock();
stockPage.render();