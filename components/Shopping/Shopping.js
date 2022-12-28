let numberOfOrders = 0;
class Shopping {
    render() {
        const foodStore = localStorageUtil.getFood();
        const countStore = localStorageUtil.getCount();
        let htmlCatalog = `
            <tr>
                <td class="cart_name"><b>Блюдо</b></td>
                <td class="cart_other"><b>Цена</b></td>
                <td class="cart_other"><b>Количество</b></td>
                <td class="cart_other"></td>
            </tr>
        `;
        let sum = 0;
        CATALOG.forEach(({ id, name, price }) => {
            let cost = 0;
            if (foodStore.indexOf(id) !== -1) {
                cost = price * countStore[foodStore.indexOf(id)];
                htmlCatalog += `
                    <tr>
                        <td>${name}</td>
                        <td>${price} руб.</td>
                        <td>
                        <button type="button" onclick="localStorageUtil.putFood('${id}', '-1'); shoppingPage.render(); headerPage.render();" style="width: 20px;">-</button>
                        <input type="text" min="1" value="${countStore[foodStore.indexOf(id)]}" readonly id="cart_count${id}" style="width: 30px;">
                        <button type="button" onclick="localStorageUtil.putFood('${id}', '1'); shoppingPage.render(); headerPage.render();" style="width: 20px;">+</button>
                        </td>
                        <td>${cost} руб.</td>
                        <td><button class="cart_delete_btn" onclick="localStorageUtil.deleteFood(${id})">
                        Удалить
                        </button></td>
                    </tr>
                `;
                sum += cost;
            }
        });

        htmlCatalog += `
            <tr>
                <td><b>Итог:</b></td>
                <td></td>
                <td></td>
                <td>${sum} руб.</td>
            </tr>
        `;

        const html = `
            <div>
                <table>
                    ${htmlCatalog}
                </table>
            </div>
        `;
        document.getElementById("shopping_cart").innerHTML = html;
    }

    createOrder() {
        let number = document.getElementById('numb').value.trim();
        let addr = document.getElementById('addr').value.trim();
        let card;
        try {
            card = document.querySelector('input[name="pay"]:checked').value;
        }
        catch {
            card = null;
        }

        let phoneno = /^\+[7]{1}[- ]?[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2}$/;
        if (!number.match(phoneno))
            document.getElementById("numb").value = "НЕПРАВИЛЬНО НАБРАН НОМЕР";

        if (number.match(phoneno) && addr != "" && card != null)  {
            let order = [];
            order.push(number);
            order.push(addr);
            order.push(card);

            const foodStore = localStorageUtil.getFood();
            const countStore = localStorageUtil.getCount();

            CATALOG.forEach(({ id }) => {
                if (foodStore.indexOf(id) !== -1) {
                    order.push(id + ' - ' + countStore[foodStore.indexOf(id)]);
                }
            });

            localStorage.removeItem("food");
            localStorage.removeItem("count");
            localStorage.setItem("order" + numberOfOrders, JSON.stringify(order));
            numberOfOrders++;

            let radiobtn = document.getElementsByName("pay");
            radiobtn[0].checked = false;
            radiobtn[1].checked = false;
            document.getElementById("numb").value = "";
            document.getElementById("addr").value = "";

            shoppingPage.render();
            headerPage.render();
        }
    }
}

const shoppingPage = new Shopping();
shoppingPage.render();