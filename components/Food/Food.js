class Food {
    handleSetLocationStorage(id) {
        let count = document.getElementById("menu_count" + id).value;
        localStorageUtil.putFood(id, count);
        headerPage.render();
    }

    render(cat) {
        let htmlCatalog = '';
        CATALOG.forEach(({ id, name, price, img, category }) => {
            if (cat == category || cat == null) {
                htmlCatalog += `
                <li class="food-element">
                    <img class="food-element__img" src="${img}"/>
                    <span class="food-element__name">${name}</span>
                    <table>
                        <tr>
                            <td>
                            <span class="food-element__price">${price} руб.</span>
                            </td>
                            <td>
                                <button type="button" onclick="headerPage.change('dec', 'menu_count${id}')" style="width: 20px;">-</button>
                                <input type="text" min="1" value="1" readonly id="menu_count${id}" style="width: 30px;">
                                <button type="button" onclick="headerPage.change('inc', 'menu_count${id}')" style="width: 20px;">+</button>
                            </td>
                        </tr>
                    </table>
                    <button class="food-element__btn" onclick="foodPage.handleSetLocationStorage('${id}')">
                    В корзину
                    </button>
                </li>
            `;
            }
        });

        const html = `
            <ul class="food-container">
                ${htmlCatalog}
            </ul>
        `;

        document.getElementById("food_menu").innerHTML = html;
    }
}

const foodPage = new Food();
foodPage.render(null);