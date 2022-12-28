class Header {
    render() {
        let shop_btn = document.getElementById("shop_btn");
        shop_btn.textContent = "Корзина " + headerPage.getCost() + " руб.";
    }

    showElement(NEW_PAGE) {
        ACTIVE.style.display = 'none';
        ACTIVE = NEW_PAGE;
        if (ACTIVE == ROOT_SHOPPING)
            shoppingPage.render();
        if (ACTIVE == ROOT_FOOD)
            foodPage.render(null);
        ACTIVE.style.display = 'block';
    }
   
    getCost() {
        const foodStore = localStorageUtil.getFood();
        const countStore = localStorageUtil.getCount();
        let sum = 0;
        CATALOG.forEach(({ id, price }) => {
            if (foodStore.indexOf(id) !== -1) {
                sum = sum + price * countStore[foodStore.indexOf(id)];
            }
        });
        return sum;
    }

    change(shift, id) {
        let counter = document.getElementById(id);
        if (shift == "dec" && counter.value > 1)
            counter.value--;
        else if (shift == "inc")
            counter.value++;
    }
}
const headerPage = new Header();
headerPage.render();